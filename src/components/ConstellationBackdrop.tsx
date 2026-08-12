"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface ConstellationBackdropProps {
  className?: string;
  /** Total stars — raise for tall sections so density stays consistent. */
  starCount?: number;
  /** Vary between sections so layouts differ. */
  seed?: number;
  /** Occasional shooting star streak. */
  shooting?: boolean;
}

/**
 * Animated night-sky backdrop for the Zodiac chapter: deterministic star
 * field with gentle twinkles, faint constellation lines, slow drift, and an
 * occasional shooting star. Pure transforms/opacity — no video or WebGL —
 * so it stays cheap on mobile. Only brighter stars animate; the rest are
 * static, keeping the animation count bounded on long sections.
 */
export default function ConstellationBackdrop({
  className = "",
  starCount = 90,
  seed = 120100,
  shooting = true,
}: ConstellationBackdropProps) {
  const reducedMotion = useReducedMotion();

  const stars = useMemo(() => {
    let state = seed;
    const random = () => {
      state = (state * 16807) % 2147483647;
      return state / 2147483647;
    };
    return Array.from({ length: starCount }, () => ({
      left: random() * 100,
      top: random() * 100,
      size: 1 + random() * 2.2,
      baseOpacity: 0.22 + random() * 0.58,
      duration: 2.4 + random() * 4,
      delay: random() * 5,
      warm: random() > 0.75,
    }));
  }, [starCount, seed]);

  const lines = useMemo(() => {
    const bright = stars
      .filter((star) => star.baseOpacity > 0.5)
      .slice(0, Math.max(18, Math.round(starCount / 6)));
    const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i + 1 < bright.length; i += 2) {
      const a = bright[i];
      const b = bright[i + 1];
      if (Math.hypot(a.left - b.left, a.top - b.top) < 22) {
        segments.push({ x1: a.left, y1: a.top, x2: b.left, y2: b.top });
      }
    }
    return segments;
  }, [stars, starCount]);

  const shootingStars = useMemo(
    () =>
      [
        { top: 14, left: 10, angle: 28, delay: 3, period: 11 },
        { top: 52, left: 55, angle: 22, delay: 8.5, period: 14 },
      ].map((streak) => ({
        ...streak,
        dx: 280,
        dy: Math.tan((streak.angle * Math.PI) / 180) * 280,
      })),
    []
  );

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

      {/* Stars — brighter ones twinkle, dimmer ones stay static for perf */}
      <motion.div
        className="absolute inset-0"
        animate={reducedMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
      >
        {stars.map((star, index) => {
          const animated = !reducedMotion && star.baseOpacity > 0.45;
          return (
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
                boxShadow: star.size > 2.6 ? "0 0 6px rgba(224,201,146,0.5)" : undefined,
              }}
              animate={
                animated
                  ? { opacity: [star.baseOpacity, star.baseOpacity * 0.3, star.baseOpacity] }
                  : undefined
              }
              transition={
                animated
                  ? { duration: star.duration, repeat: Infinity, ease: "easeInOut", delay: star.delay }
                  : undefined
              }
            />
          );
        })}
      </motion.div>

      {/* Occasional shooting stars */}
      {shooting && !reducedMotion &&
        shootingStars.map((streak, index) => (
          <motion.span
            key={`shooting-${index}`}
            className="absolute h-px w-28 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            style={{
              top: `${streak.top}%`,
              left: `${streak.left}%`,
              rotate: streak.angle,
              opacity: 0,
            }}
            animate={{ x: [0, streak.dx], y: [0, streak.dy], opacity: [0, 0.9, 0] }}
            transition={{
              duration: 1.1,
              delay: streak.delay,
              repeat: Infinity,
              repeatDelay: streak.period,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Soft golden nebula glow */}
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[160px]" />
    </div>
  );
}
