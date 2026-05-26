"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";

export default function AboutPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
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
        {/* Header */}
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            The Brand
          </p>
          <h1 className="font-display text-6xl md:text-8xl uppercase mb-20">
            DENIED<span className="text-gold">.</span>
          </h1>
        </ScrollReveal>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <p className="text-gray-400 text-lg leading-relaxed italic">
                DENIED. is a filter — not everyone passes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg leading-relaxed italic">
                True luxury is never about being loud. It is about being selected.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-gray-400 text-lg leading-relaxed italic">
                Every piece carries intention. Every drop is limited.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-white text-xl md:text-2xl leading-relaxed italic font-serif mt-4">
                <TextReveal text="Some standards still exist." delay={0.2} />
              </p>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal delay={0.3}>
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-brutal text-gold mb-6">
                  What We Stand For
                </p>
                {[
                  { label: "Premium Fabric", value: "240 GSM Combed Cotton" },
                  { label: "Exclusive Drops", value: "Once gone, gone forever" },
                  { label: "No Compromises", value: "Quality over quantity" },
                  { label: "Selective", value: "Not for everyone" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-4 border-b border-white/[0.06]"
                  >
                    <span className="text-sm text-white">{item.label}</span>
                    <span className="text-xs text-gray-500">{item.value}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
