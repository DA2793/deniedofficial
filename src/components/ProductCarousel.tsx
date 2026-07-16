"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const AUTOPLAY_MS = 4200; // Slightly slower for a luxury feel
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
      rotateY: normalizedDiff * 48,
      x: normalizedDiff * 260,
      z: -absPos * 160,
      scale: absPos === 0 ? 1.05 : 0.82 - absPos * 0.07,
      opacity: absPos > 2 ? 0 : 1 - absPos * 0.18,
      zIndex: total - absPos,
      absPos,
    };
  };

  if (isMobile === null) {
    return <section className="py-24 px-6 md:px-12 h-[620px]" aria-hidden="true" />;
  }

  return (
    <section
      className="py-24 px-6 md:px-12 overflow-hidden bg-black"
      aria-label="Product carousel"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            The Collection
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-white">
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
              className="relative h-[620px] flex items-center justify-center"
              style={{ perspective: "1400px" }}
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
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl shadow-black/90 group">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 768px) 420px, 340px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={isActive}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-white text-xl font-medium tracking-tight mb-1">
                        {product.name}
                      </p>
                      <p className="text-gold text-sm tracking-wider">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-6 left-6 bg-gold text-black text-[10px] uppercase tracking-brutal px-4 py-2 rounded-full font-medium shadow-lg">
                        {product.badge}
                      </div>
                    )}

                    {/* Gold glow ring on active card */}
                    {isActive && (
                      <div className="absolute inset-0 border border-gold/40 rounded-3xl pointer-events-none" />
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
                        : { duration: 0.9, ease: [0.23, 1.0, 0.32, 1.0] }
                    }
                    style={{ zIndex: style.zIndex, transformStyle: "preserve-3d" }}
                    className="absolute w-[340px] md:w-[420px] cursor-pointer"
                    aria-hidden={!isActive}
                    tabIndex={-1}
                  >
                    {isActive ? (
                      <Link
                        href={`/product/${product.id}`}
                        aria-label={`View ${product.name}, ₹${product.price.toLocaleString("en-IN")}`}
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
            <div className="flex items-center justify-center gap-8 mt-12">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous product"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-3" role="tablist" aria-label="Select product">
                {products.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    role="tab"
                    onClick={() => goTo(index)}
                    aria-label={`Go to ${product.name}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeIndex === index ? "bg-gold w-10" : "bg-white/20 w-5 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next product"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {!reducedMotion && (
                <button
                  type="button"
                  onClick={() => setManualPlay((prev) => !prev)}
                  aria-pressed={isPlaying}
                  aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all"
                >
                  {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" />
                      <rect x="14" y="5" width="4" height="14" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
      className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 scrollbar-hide"
      role="list"
      aria-label="Products, swipe to browse"
    >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          role="listitem"
          className="snap-center shrink-0 w-[82vw] max-w-[340px]"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="82vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-white text-xl font-medium tracking-tight mb-1">
                {product.name}
              </p>
              <p className="text-gold text-sm tracking-wider">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>
            {product.badge && (
              <div className="absolute top-6 left-6 bg-gold text-black text-[10px] uppercase tracking-brutal px-4 py-2 rounded-full font-medium shadow-lg">
                {product.badge}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
