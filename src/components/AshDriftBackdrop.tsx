"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface AshDriftBackdropProps {
  className?: string;
}

/**
 * Atmosphere for the Neelkanth chapter: a luminous crescent moon over pure
 * black, with slow-rising silver ash and rare warm embers. No blue — the
 * palette is moonlight, ash, and the brand's gold. Pure transforms/opacity,
 * no video or WebGL; same lightweight approach as ConstellationBackdrop.
 */
export default function AshDriftBackdrop({ className = "" }: AshDriftBackdropProps) {
  const reducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    let seed = 108108;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 54 }, () => ({
      left: random() * 100,
      top: 25 + random() * 80,
      size: 1 + random() * 2.3,
      opacity: 0.14 + random() * 0.4,
      rise: 140 + random() * 260,
      drift: (random() - 0.5) * 70,
      duration: 13 + random() * 17,
      delay: random() * 15,
      warm: random() > 0.85,
    }));
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Pure black with the faintest warm-grey breath */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0d0c0a] to-black" />

      {/* The tripundra — three strokes of sacred ash */}
      <motion.div
        className="absolute left-1/2 top-[11%] -translate-x-1/2"
        animate={reducedMotion ? undefined : { opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="220" height="120" viewBox="0 0 220 120">
          <defs>
            <linearGradient id="ashStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e9e2d2" stopOpacity="0" />
              <stop offset="18%" stopColor="#efe9db" stopOpacity="0.95" />
              <stop offset="82%" stopColor="#efe9db" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e9e2d2" stopOpacity="0" />
            </linearGradient>
            <filter id="ashSoft" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
          </defs>
          <g filter="url(#ashSoft)" stroke="url(#ashStroke)" strokeLinecap="round" fill="none">
            <path d="M28 30 Q110 22 192 30" strokeWidth="9" />
            <path d="M18 60 Q110 51 202 60" strokeWidth="10" />
            <path d="M28 90 Q110 82 192 90" strokeWidth="9" />
          </g>
        </svg>
      </motion.div>

      {/* Soft moonlight aura behind the content area */}
      <div className="absolute left-1/2 top-[38%] h-[30rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#efe9db]/[0.045] blur-[130px]" />
      {/* Faint gold warmth low in the frame */}
      <div className="absolute bottom-[-12%] left-1/2 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[150px]" />

      {/* Rising silver ash, rare warm embers */}
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.warm ? "#d8b98a" : "#ddd8cc",
            opacity: reducedMotion ? particle.opacity * 0.6 : 0,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -particle.rise],
                  x: [0, particle.drift],
                  opacity: [0, particle.opacity, particle.opacity * 0.7, 0],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Gentle vignette to keep edges quiet */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
