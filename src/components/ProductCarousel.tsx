"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  animate,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

const ROTATE_DEG_PER_SEC = 9; // continuous drift speed — full loop ≈ 40s
const RADIUS_X = 540;
const RADIUS_Z = 260;
const FLOAT_HEIGHT = 16;
const PERSPECTIVE = 1800;
const TOTAL = products.length;
const ANGLE_PER_CARD = 360 / TOTAL;

function normalizeAngle(deg: number) {
  let a = deg % 360;
  if (a > 180) a -= 360;
  if (a <= -180) a += 360;
  return a;
}

function computeTarget(currentSpin: number, index: number) {
  const desired = -index * ANGLE_PER_CARD;
  const k = Math.round((currentSpin - desired) / 360);
  return desired + k * 360;
}

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [manualPlay, setManualPlay] = useState(true);
  const [hoverPause, setHoverPause] = useState(false);
  const [focusPause, setFocusPause] = useState(false);
  const [touchPause, setTouchPause] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const spin = useMotionValue(0);

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

  // Continuous rotation, driven every frame — this is what gives the silky drift.
  useAnimationFrame((_, delta) => {
    if (isMobile || !isPlaying) return;
    spin.set(spin.get() - (ROTATE_DEG_PER_SEC / 1000) * delta);
  });

  // Track which card is currently front-and-center, without re-rendering every frame.
  useEffect(() => {
    const unsubscribe = spin.on("change", (latest) => {
      const idx = Math.round(-latest / ANGLE_PER_CARD);
      const normalized = ((idx % TOTAL) + TOTAL) % TOTAL;
      setActiveIndex((prev) => (prev === normalized ? prev : normalized));
    });
    return () => unsubscribe();
  }, [spin]);

  const handleFocusCapture = () => setFocusPause(true);
  const handleBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setFocusPause(false);
    }
  };

  const goTo = useCallback(
    (index: number) => {
      const normalizedIndex = ((index % TOTAL) + TOTAL) % TOTAL;
      const target = computeTarget(spin.get(), normalizedIndex);
      animate(spin, target, {
        duration: reducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      });
    },
    [spin, reducedMotion]
  );

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
            {/* Rotating ring */}
            <div
              className="relative h-[620px] flex items-center justify-center"
              style={{ perspective: `${PERSPECTIVE}px` }}
              onMouseEnter={() => setHoverPause(true)}
              onMouseLeave={() => setHoverPause(false)}
              onTouchStart={() => setTouchPause(true)}
              onTouchEnd={() => setTouchPause(false)}
              onFocusCapture={handleFocusCapture}
              onBlurCapture={handleBlurCapture}
            >
              {products.map((product, index) => (
                <CarouselCard
                  key={product.id}
                  product={product}
                  index={index}
                  spin={spin}
                  isActive={index === activeIndex}
                  onSelect={() => goTo(index)}
                />
              ))}
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

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/collection"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-brutal border border-white/20 px-12 py-5 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full"
          >
            View All Collections
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CarouselCard({
  product,
  index,
  spin,
  isActive,
  onSelect,
}: {
  product: Product;
  index: number;
  spin: MotionValue<number>;
  isActive: boolean;
  onSelect: () => void;
}) {
  const theta = useTransform(spin, (s) => normalizeAngle(s + index * ANGLE_PER_CARD));
  const rotateY = theta;
  const x = useTransform(theta, (t) => Math.sin((t * Math.PI) / 180) * RADIUS_X);
  const z = useTransform(theta, (t) => (Math.cos((t * Math.PI) / 180) - 1) * RADIUS_Z);
  const y = useTransform(theta, (t) => Math.sin((t * Math.PI) / 90) * FLOAT_HEIGHT);

  // Normalized depth (0 = directly behind, 1 = front-and-center) — every visual
  // property below is derived from this one value so they stay in sync.
  const depth = useTransform(theta, (t) => (Math.cos((t * Math.PI) / 180) + 1) / 2);
  const scale = useTransform(depth, [0, 1], [0.68, 1]);
  const opacity = useTransform(depth, [0, 1], [0.18, 1]);
  const filter = useTransform(
    depth,
    (d) => `blur(${(1 - d) * 6}px) brightness(${0.65 + d * 0.35})`
  );
  const zIndex = useTransform(depth, (d) => Math.round(d * 1000));

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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="text-white text-xl font-medium tracking-tight mb-1">{product.name}</p>
        <p className="text-gold text-sm tracking-wider">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>

      {product.badge && (
        <div className="absolute top-6 left-6 bg-gold text-black text-[10px] uppercase tracking-brutal px-4 py-2 rounded-full font-medium shadow-lg">
          {product.badge}
        </div>
      )}

      {isActive && (
        <div className="absolute inset-0 border border-gold/40 rounded-3xl pointer-events-none" />
      )}
    </div>
  );

  return (
    <motion.div
      style={{ x, y, z, rotateY, scale, opacity, zIndex, filter, transformStyle: "preserve-3d" }}
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
          onClick={onSelect}
          aria-label={`Show ${product.name}`}
          tabIndex={-1}
          className="block w-full text-left"
        >
          {cardInner}
        </button>
      )}
    </motion.div>
  );
}

const MOBILE_AUTOPLAY_MS = 3200;
const MOBILE_RESUME_DELAY_MS = 2500;

function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [offScreen, setOffScreen] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const resumeTimeout = useRef<number>();

  // Only autoplay while the carousel is actually in the viewport — this also
  // prevents any chance of the page jumping to this section while scrolling
  // through the rest of the homepage.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffScreen(!entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Respect reduced-motion preference — no autoplay, manual swipe still works.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", onChange);
    return () => motionQuery.removeEventListener("change", onChange);
  }, []);

  // Pause autoplay when the tab isn't visible.
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Track which card is centered in view, so it can get the "depth" treatment
  // (full scale/opacity) while the peeking neighbour stays slightly receded.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex: number | null = null;
        let bestRatio = 0;
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIndex = index;
          }
        });
        if (bestIndex !== null && bestRatio > 0.5) {
          setActiveIndex(bestIndex);
        }
      },
      { root: container, threshold: [0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isPlaying = !paused && !tabHidden && !reducedMotion && !offScreen;

  // Autoplay: scroll to the next card on a timer. Scrolls the carousel's own
  // scrollLeft directly (never scrollIntoView) so the page's vertical scroll
  // position is never touched.
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const container = containerRef.current;
      const next = (activeIndex + 1) % products.length;
      const card = cardRefs.current[next];
      if (!container || !card) return;
      const targetLeft =
        card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
    }, MOBILE_AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex]);

  const handleTouchStart = () => {
    setPaused(true);
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current);
    resumeTimeout.current = window.setTimeout(() => setPaused(false), MOBILE_RESUME_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 scrollbar-hide"
      role="list"
      aria-label="Products, swipe to browse"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {products.map((product, index) => {
        const isActive = index === activeIndex;
        return (
          <Link
            key={product.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-index={index}
            href={`/product/${product.id}`}
            role="listitem"
            aria-current={isActive ? "true" : undefined}
            className={`snap-center shrink-0 w-[82vw] max-w-[340px] transition-all duration-500 ${
              isActive ? "scale-100 opacity-100" : "scale-[0.92] opacity-60"
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="82vw"
                className="object-cover"
                priority={isActive}
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
              {isActive && (
                <div className="absolute inset-0 border border-gold/40 rounded-3xl pointer-events-none" />
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
