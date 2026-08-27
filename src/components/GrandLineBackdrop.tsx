"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface GrandLineBackdropProps {
  className?: string;
  /** The compass rose — wanted on the hero; tall content sections pass false. */
  showCompass?: boolean;
}

/**
 * Atmosphere for the One Piece chapter: open sea at night. Pure black with a
 * faint horizon glow, sea-mist particles drifting sideways like a crossing,
 * and rare gold glints — the treasure is always just out of frame. Palette
 * stays parchment/red/gold to match the chapter's masters. Pure transforms
 * and opacity, same lightweight approach as AshDriftBackdrop.
 */
export default function GrandLineBackdrop({ className = "", showCompass = true }: GrandLineBackdropProps) {
  const reducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    let seed = 32032;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 48 }, () => ({
      left: random() * 100,
      top: 20 + random() * 75,
      size: 1 + random() * 2.2,
      opacity: 0.12 + random() * 0.36,
      sail: 120 + random() * 320,          // horizontal crossing distance
      lift: (random() - 0.65) * 60,        // slight upward bias, like spray
      duration: 14 + random() * 18,
      delay: random() * 16,
      gold: random() > 0.86,               // rare treasure glints
    }));
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Night sea: black with the faintest deep-water breath */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0c0d] to-black" />

      {/* The compass rose — course set for the last island */}
      {showCompass && (
        <motion.div
          className="absolute left-1/2 top-[11%] -translate-x-1/2"
          animate={reducedMotion ? undefined : { opacity: [0.75, 1, 0.75], rotate: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="150" height="150" viewBox="0 0 150 150">
            <defs>
              <filter id="glSoft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="0.9" />
              </filter>
            </defs>
            <g filter="url(#glSoft)" stroke="#e9e2d2" strokeOpacity="0.9" fill="none">
              <circle cx="75" cy="75" r="52" strokeWidth="1.2" strokeOpacity="0.45" />
              <circle cx="75" cy="75" r="44" strokeWidth="0.7" strokeOpacity="0.3" />
              {/* cardinal needles — north in the brand red */}
              <path d="M75 16 L82 68 L75 75 L68 68 Z" fill="#8f2f2f" stroke="none" fillOpacity="0.95" />
              <path d="M75 134 L82 82 L75 75 L68 82 Z" fill="#e9e2d2" stroke="none" fillOpacity="0.85" />
              <path d="M16 75 L68 82 L75 75 L68 68 Z" fill="#e9e2d2" stroke="none" fillOpacity="0.6" />
              <path d="M134 75 L82 68 L75 75 L82 82 Z" fill="#e9e2d2" stroke="none" fillOpacity="0.6" />
              {/* intercardinal ticks */}
              <path d="M39 39 L64 64 M111 39 L86 64 M39 111 L64 86 M111 111 L86 86" strokeWidth="1" strokeOpacity="0.4" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Horizon glow — the line every dream sails toward */}
      <div className="absolute left-1/2 top-[46%] h-px w-[76%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#e9e2d2]/25 to-transparent" />
      <div className="absolute left-1/2 top-[42%] h-[22rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#e9e2d2]/[0.04] blur-[130px]" />
      {/* Gold warmth low in the frame — treasure below the waterline */}
      <div className="absolute bottom-[-12%] left-1/2 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[150px]" />

      {/* Sea mist crossing the frame, rare gold glints */}
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.gold ? "#d8b98a" : "#cfd4d2",
            opacity: reducedMotion ? particle.opacity * 0.6 : 0,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [0, particle.sail],
                  y: [0, particle.lift],
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

      {/* Vignette keeps the edges quiet */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
