"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const items = [
  "Premium Quality",
  "Luxury Packaging",
  "Soft Fabric",
  "Limited Drops",
  "Curated Designs",
  "Selected Pieces Only",
];

export default function Marquee() {
  const [duration, setDuration] = useState(15);

  useEffect(() => {
    setDuration(window.innerWidth < 768 ? 10 : 15);
  }, []);

  return (
    <div className="border-y border-white/[0.04] py-5 overflow-hidden bg-black-soft">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="text-[11px] uppercase tracking-brutal text-gray-400">
              {item}
            </span>
            <span className="text-gold/40 text-xs">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
