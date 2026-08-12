"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface ConstellationBackdropProps {
  className?: string;
}

/**
 * Animated night-sky backdrop for the Zodiac chapter: deterministic star
 * field with gentle individual twinkles and a slow collective drift, plus
 * faint constellation lines. Pure transforms/opacity — no video or WebGL —
 * so it stays cheap on mobile (same approach as OceanChurnBackdrop).
 */
export default function ConstellationBackdrop({ className = "" }: ConstellationBackdropProps) {
  const reducedMotion = useReducedMotion();

  // Deterministic pseudo-random star layout so server and client agree.
  const stars = useMemo(() => {
    let seed = 120100;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 90 }, () => ({
      left: random() * 100,
      top: random() * 100,
      size: 1 + random() * 2.2,
      baseOpacity: 0.25 + random() * 0.55,
      duration: 2.4 + random() * 4,
      delay: random() * 5,
      warm: random() > 0.75,
    }));
  }, []);

  const lines = useMemo(() => {
    const bright = stars.filter((star) => star.baseOpacity > 0.55).slice(0, 18);
    const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i + 1 < bright.length; i += 2) {
      const a = bright[i];
      const b = bright[i + 1];
      const distance = Math.hypot(a.left - b.left, a.top - b.top);
      if (distance < 30) {
        segments.push({ x1: a.left, y1: a.top, x2: b.left, y2: b.top });
      }
    }
    return segments;
  }, [stars]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Deep-space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b14] to-black" />

      {/* Faint constellation lines */}
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="#c9a96e" strokeWidth="0.06" strokeOpacity="0.35"
          />
        ))}
      </svg>

      {/* Stars */}
      <motion.div
        className="absolute inset-0"
        animate={reducedMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
      >
        {stars.map((star, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              backgroundColor: star.warm ? "#e0c992" : "#f5f2ec",
              opacity: star.baseOpacity,
            }}
            animate={
              reducedMotion
                ? undefined
                : { opacity: [star.baseOpacity, star.baseOpacity * 0.35, star.baseOpacity] }
            }
            transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
          />
        ))}
      </motion.div>

      {/* Soft golden nebula glow at center */}
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[160px]" />
    </div>
  );
}
