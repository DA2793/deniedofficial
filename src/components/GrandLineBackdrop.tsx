"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface GrandLineBackdropProps {
  className?: string;
  /** The hero gets the full chart treatment; tall content sections pass false
   *  to drop the corner compass and keep only the quiet atmosphere. */
  showCompass?: boolean;
}

/**
 * Atmosphere for the Anime chapter: a night crossing on a charted sea.
 * Deep-water gradient, an antique compass watermark in the corner, and a
 * dashed voyage route with waypoints ending at a crimson X — every drawn
 * element lives in the page margins so the centered text column stays clean
 * (an earlier full-width horizon line cut through headings; nothing here
 * crosses the middle of the frame). Palette is the chapter's own: parchment,
 * crimson, gold. Pure SVG/transforms — no video, no WebGL.
 */
export default function GrandLineBackdrop({ className = "", showCompass = true }: GrandLineBackdropProps) {
  const reducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    let seed = 32032;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: 44 }, () => ({
      left: random() * 100,
      top: 12 + random() * 82,
      size: 1 + random() * 2.2,
      opacity: 0.1 + random() * 0.32,
      sail: 120 + random() * 300,
      lift: (random() - 0.65) * 55,
      duration: 15 + random() * 18,
      delay: random() * 16,
      gold: random() > 0.84,
    }));
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Deep water: black into a drowned teal-ink, never flat */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#08141b] to-black" />
      <div className="absolute left-[-20%] top-[15%] h-[34rem] w-[34rem] rounded-full bg-[#12333d]/[0.16] blur-[140px]" />
      <div className="absolute right-[-15%] bottom-[8%] h-[30rem] w-[30rem] rounded-full bg-[#0e2a33]/[0.2] blur-[140px]" />
      {/* Parchment warmth pooling low, gold beneath the waterline */}
      <div className="absolute bottom-[-12%] left-1/2 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[150px]" />

      {/* The voyage — a dashed route down the left margin, waypoints along
          the way, ending at the crimson X. Confined to the outer 18% of the
          frame so it can never interfere with the text column. */}
      <svg
        className="absolute inset-y-0 left-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 10 -2 C 4 18, 15 30, 9 46 C 4 60, 14 72, 8 88 L 10 104"
          fill="none"
          stroke="#cdb194"
          strokeOpacity="0.13"
          strokeWidth="0.22"
          strokeDasharray="1.4 1.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Waypoints and the X live in a non-stretched layer so they keep shape */}
      <svg className="absolute inset-y-0 left-0 h-full w-[18%] min-w-[130px]" viewBox="0 0 100 600" preserveAspectRatio="xMidYMid slice">
        <g stroke="#cdb194" strokeOpacity="0.22" fill="none">
          <circle cx="54" cy="120" r="3.2" strokeWidth="1" />
          <circle cx="46" cy="292" r="2.4" strokeWidth="1" />
          <circle cx="55" cy="452" r="3" strokeWidth="1" />
        </g>
        {/* the destination */}
        <g stroke="#931c1d" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round">
          <path d="M44 540 L58 554" />
          <path d="M58 540 L44 554" />
        </g>
      </svg>

      {/* Corner compass — hero only. Sits in the top-right margin, watermark
          weight, breathing slowly; never behind centered copy. */}
      {showCompass && (
        <motion.div
          className="absolute right-[4%] top-[9%] hidden md:block"
          animate={reducedMotion ? undefined : { opacity: [0.5, 0.85, 0.5], rotate: [-2, 2, -2] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.6 }}
        >
          <svg width="260" height="260" viewBox="0 0 260 260">
            <g stroke="#cdb194" fill="none">
              <circle cx="130" cy="130" r="104" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="130" cy="130" r="88" strokeWidth="0.6" strokeOpacity="0.14" />
              <circle cx="130" cy="130" r="30" strokeWidth="0.6" strokeOpacity="0.18" />
              {/* degree ticks */}
              {Array.from({ length: 24 }, (_, i) => {
                const angle = (i * 15 * Math.PI) / 180;
                const inner = i % 6 === 0 ? 92 : 98;
                return (
                  <line
                    key={i}
                    x1={130 + inner * Math.sin(angle)}
                    y1={130 - inner * Math.cos(angle)}
                    x2={130 + 104 * Math.sin(angle)}
                    y2={130 - 104 * Math.cos(angle)}
                    strokeWidth="0.8"
                    strokeOpacity={i % 6 === 0 ? 0.28 : 0.14}
                  />
                );
              })}
              {/* needles — north carries the chapter red */}
              <path d="M130 34 L140 122 L130 130 L120 122 Z" fill="#931c1d" fillOpacity="0.55" stroke="none" />
              <path d="M130 226 L140 138 L130 130 L120 138 Z" fill="#cdb194" fillOpacity="0.3" stroke="none" />
              <path d="M34 130 L122 140 L130 130 L122 120 Z" fill="#cdb194" fillOpacity="0.2" stroke="none" />
              <path d="M226 130 L138 120 L130 130 L138 140 Z" fill="#cdb194" fillOpacity="0.2" stroke="none" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Latitude arcs in the bottom-right margin — chart texture, kept low */}
      <svg className="absolute bottom-[-6%] right-[-8%] hidden h-[42%] w-[46%] md:block" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMax meet">
        <g stroke="#cdb194" fill="none">
          <path d="M400 40 A 360 360 0 0 0 60 300" strokeWidth="0.8" strokeOpacity="0.1" />
          <path d="M400 100 A 300 300 0 0 0 120 300" strokeWidth="0.8" strokeOpacity="0.08" />
          <path d="M400 160 A 240 240 0 0 0 180 300" strokeWidth="0.8" strokeOpacity="0.06" />
        </g>
      </svg>

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
            backgroundColor: particle.gold ? "#d8b98a" : "#c3ccc9",
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
