"use client";

import { motion } from "framer-motion";

const items = [
  "Premium Quality",
  "Luxury Packaging",
  "Soft Fabric",
  "Limited Edition Drops",
  "Handcrafted Details",
];

export default function Marquee() {
  return (
    <div className="border-y border-white/[0.04] py-5 overflow-hidden bg-black-soft">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
