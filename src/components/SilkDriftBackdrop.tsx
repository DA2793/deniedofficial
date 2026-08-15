"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface SilkDriftBackdropProps {
  className?: string;
}

/**
 * Atmosphere for The Geet Collection: deep mauve silk washed with dusty rose,
 * soft rose-gold bokeh glows, and blush petals drifting downward. Feminine,
 * quiet luxury — mirrors the collection reel's silk identity. Pure
 * transforms/opacity, no video or WebGL; same lightweight approach as
 * AshDriftBackdrop and ConstellationBackdrop.
 */
export default function SilkDriftBackdrop({ className = "" }: SilkDriftBackdropProps) {
  const reducedMotion = useReducedMotion();

  const petals = useMemo(() => {
    let seed = 150815;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 42 }, () => ({
      left: random() * 100,
      top: -10 + random() * 100,
      width: 3 + random() * 6,
      squash: 0.45 + random() * 0.3,
      opacity: 0.12 + random() * 0.28,
      fall: 160 + random() * 300,
      sway: (random() - 0.5) * 90,
      duration: 14 + random() * 18,
      delay: random() * 16,
      light: random() > 0.5,
    }));
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Deep mauve silk base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#241318] via-[#38222a] to-[#1c1014]" />

      {/* Silk sheen — soft diagonal light bands that breathe */}
      <motion.div
        className="absolute -inset-x-1/2 top-[8%] h-[26rem] rotate-[-14deg] blur-[90px]"
        style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(214,160,134,0.12), transparent)" }}
        animate={reducedMotion ? undefined : { x: ["-8%", "8%", "-8%"], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -inset-x-1/2 bottom-[14%] h-[22rem] rotate-[-14deg] blur-[110px]"
        style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(219,172,152,0.09), transparent)" }}
        animate={reducedMotion ? undefined : { x: ["6%", "-6%", "6%"], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rose-gold bokeh glows */}
      <div className="absolute left-[12%] top-[18%] h-56 w-56 rounded-full bg-[#deaa8e]/[0.07] blur-[70px]" />
      <div className="absolute right-[8%] top-[42%] h-72 w-72 rounded-full bg-[#dbac98]/[0.06] blur-[90px]" />
      <div className="absolute bottom-[10%] left-[28%] h-64 w-64 rounded-full bg-[#c98d84]/[0.05] blur-[80px]" />

      {/* Falling blush petals */}
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${petal.left}%`,
            top: `${petal.top}%`,
            width: petal.width,
            height: petal.width * petal.squash,
            backgroundColor: petal.light ? "#f0d0c4" : "#e2ac9e",
            opacity: reducedMotion ? petal.opacity * 0.6 : 0,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, petal.fall],
                  x: [0, petal.sway],
                  rotate: [0, petal.sway > 0 ? 120 : -120],
                  opacity: [0, petal.opacity, petal.opacity * 0.7, 0],
                }
          }
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Gentle vignette to keep edges quiet */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(12,6,8,0.6)_100%)]" />
    </div>
  );
}
