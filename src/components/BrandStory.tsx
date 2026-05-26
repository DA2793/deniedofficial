"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import TextReveal from "./TextReveal";

export default function BrandStory() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} className="relative py-40 px-6 md:px-12 overflow-hidden">
      {/* Parallax background text */}
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        <span className="font-display text-[20vw] uppercase text-white/[0.02] whitespace-nowrap">
          DENIED.
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-start">
          {/* Left */}
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              The Philosophy
            </p>
            <h2 className="font-display text-6xl md:text-8xl uppercase leading-[0.9]">
              DENIED
              <span className="text-gold">.</span>
            </h2>
          </ScrollReveal>

          {/* Right */}
          <div className="space-y-8">
            <ScrollReveal delay={0.2}>
              <p className="text-gray-300 text-lg leading-relaxed italic font-serif">
                DENIED. is a filter — not everyone passes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-gray-300 text-lg leading-relaxed italic font-serif">
                True luxury is never about being loud. It is about being selected.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <p className="text-gray-300 text-lg leading-relaxed italic font-serif">
                Every piece carries intention. Every drop is limited.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-white text-xl md:text-2xl leading-relaxed italic font-serif mt-4">
                <TextReveal text="Some standards still exist." delay={0.2} />
              </p>
            </ScrollReveal>

            {/* Trust badges */}
            <ScrollReveal delay={0.5}>
              <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/[0.06]">
                <div className="text-center">
                  <span className="text-gold text-lg mb-2 block">✦</span>
                  <span className="text-[9px] uppercase tracking-brutal text-gray-400">Made to Order</span>
                </div>
                <div className="text-center">
                  <span className="text-gold text-lg mb-2 block">100%</span>
                  <span className="text-[9px] uppercase tracking-brutal text-gray-400">Quality Assured</span>
                </div>
                <div className="text-center">
                  <span className="text-gold text-lg mb-2 block">✦</span>
                  <span className="text-[9px] uppercase tracking-brutal text-gray-400">Made in India</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
