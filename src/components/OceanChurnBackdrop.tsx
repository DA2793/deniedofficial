"use client";

import { motion } from "framer-motion";

interface OceanChurnBackdropProps {
  /** 0 = calm dark water, 1 = full churn with the poison/nectar glow visible. */
  intensity?: number;
  className?: string;
}

/**
 * Layered, purely CSS/SVG-driven approximation of a churning ocean —
 * gradient water base, two drifting turbulence layers, and an ambiguous
 * pulsing glow at center representing the nectar/poison surfacing. No video
 * or WebGL dependency; everything animates via Framer Motion transforms so
 * it stays cheap on mobile (same approach as StoreEntrance/ProductCarousel).
 */
export default function OceanChurnBackdrop({ intensity = 1, className = "" }: OceanChurnBackdropProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-black ${className}`}
      aria-hidden="true"
    >
      {/* Base water gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neelkanth-deep/40 to-black" />

      {/* Turbulence layer 1 — slow drift */}
      <motion.div
        className="absolute -inset-1/4 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(30,58,95,0.5), transparent 70%)",
        }}
        animate={{ x: ["-3%", "3%", "-3%"], y: ["2%", "-2%", "2%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Turbulence layer 2 — counter drift, different rhythm */}
      <motion.div
        className="absolute -inset-1/4 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 70% 40%, rgba(58,110,165,0.45), transparent 70%)",
        }}
        animate={{ x: ["4%", "-4%", "4%"], y: ["-3%", "3%", "-3%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Foam/surface texture — faint, fast-ish shimmer */}
      <motion.div
        className="absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.5) 0px, transparent 2px, transparent 40px)",
        }}
        animate={{ opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center glow — the poison/nectar surfacing, intensity-controlled */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,58,95,0.9), rgba(201,169,110,0.25) 55%, transparent 75%)",
        }}
        animate={{
          opacity: [0.3 * intensity, 0.65 * intensity, 0.3 * intensity],
          scale: [0.9, 1.08, 0.9],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette to keep focus centered and text legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
