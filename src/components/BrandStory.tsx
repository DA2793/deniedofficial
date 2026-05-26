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
        <span className="font-display text-[20vw] uppercase text-white/[0.035] whitespace-nowrap">
          DENIED.
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-start">
          {/* Left */}
          <div>
            <ScrollReveal>
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                The Philosophy
              </p>
              <h2 className="font-display text-6xl md:text-8xl uppercase leading-[0.9]">
                DENIED
                <span className="text-gold">.</span>
              </h2>
            </ScrollReveal>

            {/* Trust badges — below DENIED. */}
            <ScrollReveal delay={0.5}>
              <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/[0.06]">
                <div className="text-center">
                  <div className="mb-2">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="mx-auto">
                      <path d="M14 8L8 14V40C8 41.1 8.9 42 10 42H38C39.1 42 40 41.1 40 40V14L34 8H14Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
                      <path d="M14 8L18 4H30L34 8" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
                      <path d="M8 14H40" stroke="#c9a96e" strokeWidth="1.5"/>
                      <rect x="18" y="22" width="12" height="12" rx="1" stroke="#c9a96e" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
                      <path d="M22 26L24 28L26 26" stroke="#c9a96e" strokeWidth="1" opacity="0.8"/>
                      <path d="M24 28V24" stroke="#c9a96e" strokeWidth="1" opacity="0.8"/>
                    </svg>
                  </div>
                  <span className="text-[9px] uppercase tracking-brutal text-gray-400">Made to Order</span>
                </div>
                <div className="text-center">
                  <div className="mb-2">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="mx-auto">
                      <path d="M24 4L6 12V22C6 34 14 42 24 46C34 42 42 34 42 22V12L24 4Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
                      <path d="M16 24L22 30L32 18" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[9px] uppercase tracking-brutal text-gray-400">Quality Assured</span>
                </div>
                <div className="text-center">
                  <div className="mb-2">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="mx-auto">
                      <line x1="10" y1="6" x2="10" y2="42" stroke="#c9a96e" strokeWidth="1.5"/>
                      <path d="M10 8C14 6 18 10 22 8C26 6 30 10 34 8V22C30 24 26 20 22 22C18 24 14 20 10 22" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                        <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10 8C14 6 18 10 22 8C26 6 30 10 34 8V22C30 24 26 20 22 22C18 24 14 20 10 22;M10 8C14 10 18 6 22 8C26 10 30 6 34 8V22C30 20 26 24 22 22C18 20 14 24 10 22;M10 8C14 6 18 10 22 8C26 6 30 10 34 8V22C30 24 26 20 22 22C18 24 14 20 10 22"/>
                      </path>
                      <path d="M10 8C14 6 18 10 22 8C26 6 30 10 34 8V12.5C30 14.5 26 10.5 22 12.5C18 14.5 14 10.5 10 12.5" fill="#FF9933" opacity="0.5">
                        <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10 8C14 6 18 10 22 8C26 6 30 10 34 8V12.5C30 14.5 26 10.5 22 12.5C18 14.5 14 10.5 10 12.5;M10 8C14 10 18 6 22 8C26 10 30 6 34 8V12.5C30 10.5 26 14.5 22 12.5C18 10.5 14 14.5 10 12.5;M10 8C14 6 18 10 22 8C26 6 30 10 34 8V12.5C30 14.5 26 10.5 22 12.5C18 14.5 14 10.5 10 12.5"/>
                      </path>
                      <path d="M10 12.5C14 10.5 18 14.5 22 12.5C26 10.5 30 14.5 34 12.5V17.5C30 19.5 26 15.5 22 17.5C18 19.5 14 15.5 10 17.5" fill="#FFFFFF" opacity="0.5">
                        <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10 12.5C14 10.5 18 14.5 22 12.5C26 10.5 30 14.5 34 12.5V17.5C30 19.5 26 15.5 22 17.5C18 19.5 14 15.5 10 17.5;M10 12.5C14 14.5 18 10.5 22 12.5C26 14.5 30 10.5 34 12.5V17.5C30 15.5 26 19.5 22 17.5C18 15.5 14 19.5 10 17.5;M10 12.5C14 10.5 18 14.5 22 12.5C26 10.5 30 14.5 34 12.5V17.5C30 19.5 26 15.5 22 17.5C18 19.5 14 15.5 10 17.5"/>
                      </path>
                      <path d="M10 17.5C14 15.5 18 19.5 22 17.5C26 15.5 30 19.5 34 17.5V22C30 24 26 20 22 22C18 24 14 20 10 22" fill="#138808" opacity="0.5">
                        <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10 17.5C14 15.5 18 19.5 22 17.5C26 15.5 30 19.5 34 17.5V22C30 24 26 20 22 22C18 24 14 20 10 22;M10 17.5C14 19.5 18 15.5 22 17.5C26 19.5 30 15.5 34 17.5V22C30 20 26 24 22 22C18 20 14 24 10 22;M10 17.5C14 15.5 18 19.5 22 17.5C26 15.5 30 19.5 34 17.5V22C30 24 26 20 22 22C18 24 14 20 10 22"/>
                      </path>
                    </svg>
                  </div>
                  <span className="text-[9px] uppercase tracking-brutal text-gray-400">Made in India</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
