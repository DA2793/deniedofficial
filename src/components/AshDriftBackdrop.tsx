"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface AshDriftBackdropProps {
  className?: string;
  intensity?: number;
}

/**
 * Atmospheric backdrop for the Neelkanth chapter: slow-rising ash and ember
 * particles in cool blue-white over a deep gradient, with a soft indigo glow.
 * Pure transforms/opacity — no video or WebGL — cheap on mobile, same
 * approach as ConstellationBackdrop.
 */
export default function AshDriftBackdrop({ className = "", intensity = 1 }: AshDriftBackdropProps) {
  const reducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    let seed = 108108;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 46 }, () => ({
      left: random() * 100,
      top: 20 + random() * 85,
      size: 1 + random() * 2.4,
      opacity: (0.15 + random() * 0.45) * intensity,
      rise: 120 + random() * 240,
      drift: (random() - 0.5) * 60,
      duration: 14 + random() * 18,
      delay: random() * 16,
      warm: random() > 0.82, // occasional faint ember among the ash
    }));
  }, [intensity]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Deep night gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0e16] to-black" />

      {/* Soft indigo presence, low in the frame */}
      <div className="absolute bottom-[-10%] left-1/2 h-[40rem] w-[46rem] -translate-x-1/2 rounded-full bg-neelkanth/25 blur-[160px]" />
      <div className="absolute left-1/2 top-1/3 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-neelkanth-light/[0.06] blur-[120px]" />

      {/* Rising ash */}
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.warm ? "#d8b98a" : "#c8d4e6",
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
    </div>
  );
}
