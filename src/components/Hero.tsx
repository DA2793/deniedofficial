"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";
import TextReveal from "./TextReveal";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background accent */}
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[100px]"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[10px] uppercase tracking-brutal text-gold mb-8"
        >
          Est. 2026
        </motion.p>

        {/* Main title */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(4rem,15vw,12rem)] leading-[0.85] uppercase tracking-tight"
          >
            DENIED
            <span className="text-gold">.</span>
          </motion.h1>
        </div>

        {/* Tagline — word-by-word reveal */}
        <div className="mt-6 mb-12">
          <TextReveal
            text="Not for Everyone. Luxury for the Selected."
            className="font-serif text-xl md:text-2xl text-gray-300 font-medium"
            delay={1.2}
          />
        </div>

        {/* CTA — magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <MagneticButton strength={0.2}>
            <a
              href="#collection"
              className="inline-block text-[11px] uppercase tracking-brutal border border-white/20 px-10 py-4 text-white hover:bg-white hover:text-black transition-all duration-500"
            >
              Explore Collection
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
