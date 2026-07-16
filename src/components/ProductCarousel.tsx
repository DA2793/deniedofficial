"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const AUTOPLAY_MS = 3500;
const VISIBLE_WINDOW = 2; // cards rendered on each side of the active card

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualPlay, setManualPlay] = useState(true);
  const [hoverPause, setHoverPause] = useState(false);
  const [focusPause, setFocusPause] = useState(false);
  const [touchPause, setTouchPause] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const total = products.length;

  const isPlaying =
    manualPlay && !hoverPause && !focusPause && !touchPause && !tabHidden && !reducedMotion;

  // Detect viewport + reduced-motion preference.
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsMobile(mobileQuery.matches);
    setReducedMotion(motionQuery.matches);

    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mobileQuery.addEventListener("change", onMobileChange);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      mobileQuery.removeEventListener("change", onMobileChange);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  // Pause autoplay when the tab isn't visible.
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Autoplay loop (desktop only).
  useEffect(() => {
    if (isMobile || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isMobile, isPlaying, total]);

  const handleFocusCapture = () => setFocusPause(true);
  const handleBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setFocusPause(false);
    }
  };

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % total) + total) % total);
  }, [total]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + total) % total) - Math.floor(total / 2);
    const absPos = Math.abs(normalizedDiff);

    return {
      rotateY: normalizedDiff * 45,
      x: normalizedDiff * 240,
      z: -absPos * 150,
      scale: absPos === 0 ? 1 : 0.8 - absPos * 0.06,
      opacity: absPos > 2 ? 0 : 1 - absPos * 0.2,
      zIndex: total - absPos,
      absPos,
    };
  };

  if (isMobile === null) {
    return <section className="py-24 px-6 md:px-12 h-[420px]" aria-hidden="true" />;
  }

  return (
    <section
      className="py-24 px-6 md:px-12 overflow-hidden"
      aria-label="Product carousel"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            The Collection
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase">
            Explore
          </h2>
        </div>

        {isMobile ? (
          <MobileCarousel />
        ) : (
          <>
            {/* 3D Carousel */}
            <div
              ref={sceneRef}
              className="relative h-[520px] md:h-[600px] flex items-center justify-center"
              style={{ perspective: "1200px" }}
              onMouseEnter={() => setHoverPause(true)}
              onMouseLeave={() => setHoverPause(false)}
              onTouchStart={() => setTouchPause(true)}
              onTouchEnd={() => setTouchPause(false)}
              onFocusCapture={handleFocusCapture}
              onBlurCapture={handleBlurCapture}
            >
              {products.map((product, index) => {
                const style = getCardStyle(index);
                const isActive = index === activeIndex;
                if (style.absPos > VISIBLE_WINDOW) return null;

                const cardInner = (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.08] bg-black shadow-2xl shadow-black/50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 768px) 380px, 320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium mb-1">{product.name}</p>
                      <p className="text-gold text-xs">₹{product.price.toLocaleString()}</p>
                    </div>
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-gold/90 text-black text-[8px] uppercase tracking-brutal px-2 py-1 rounded-sm font-medium">
                        {product.badge}
                      </div>
                    )}
                  </div>
                );

                return (
                  <motion.div
                    key={product.id}
                    animate={{
                      rotateY: style.rotateY,
                      x: style.x,
                      z: style.z,
                      scale: style.scale,
                      opacity: style.opacity,
                    }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                    }
                    style={{ zIndex: style.zIndex, transformStyle: "preserve-3d" }}
                    className="absolute w-[320px] md:w-[380px] cursor-pointer"
                    aria-hidden={!isActive}
                    tabIndex={-1}
                  >
                    {isActive ? (
                      <Link
                        href={`/product/${product.id}`}
                        aria-label={`View ${product.name}, ₹${product.price.toLocaleString()}`}
                      >
                        {cardInner}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => goTo(index)}
                        aria-label={`Show ${product.name}`}
                        tabIndex={-1}
                        className="block w-full text-left"
                      >
                        {cardInner}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous product"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2" role="tablist" aria-label="Select product">
                {products.map((product, index) => (
                  <button
                    key={product.id}
                    role="tab"
                    onClick={() => goTo(index)}
                    aria-label={`Go to ${product.name}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "bg-gold w-6" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next product"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {!reducedMotion && (
                <button
                  onClick={() => setManualPlay((prev) => !prev)}
                  aria-pressed={isPlaying}
                  aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold transition-all"
                >
                  {isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" />
                      <rect x="14" y="5" width="4" height="14" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function MobileCarousel() {
  return (
    <div
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide"
      role="list"
      aria-label="Products, swipe to browse"
    >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          role="listitem"
          className="snap-center shrink-0 w-[78vw] max-w-[320px]"
        >
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.08] bg-black shadow-2xl shadow-black/50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm font-medium mb-1">{product.name}</p>
              <p className="text-gold text-xs">₹{product.price.toLocaleString()}</p>
            </div>
            {product.badge && (
              <div className="absolute top-3 left-3 bg-gold/90 text-black text-[8px] uppercase tracking-brutal px-2 py-1 rounded-sm font-medium">
                {product.badge}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
