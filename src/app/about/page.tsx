"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <path d="M14 8L8 14V40C8 41.1 8.9 42 10 42H38C39.1 42 40 41.1 40 40V14L34 8H14Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
        <path d="M14 8L18 4H30L34 8" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
        <path d="M8 14H40" stroke="#c9a96e" strokeWidth="1.5"/>
        <rect x="18" y="22" width="12" height="12" rx="1" stroke="#c9a96e" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
      </svg>
    ),
    title: "Made to Order",
    description: "Every piece is printed exclusively for you. No ready stock. Your order exists because you chose it.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L6 12V22C6 34 14 42 24 46C34 42 42 34 42 22V12L24 4Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
        <path d="M16 24L22 30L32 18" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Premium Quality",
    description: "From 260 GSM terry-knit to Supima cotton — fabrics that feel as good as they look. No shortcuts.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
        <path d="M24 12V24L32 28" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Limited Drops",
    description: "We don't restock. Once a design is gone, it's gone. Exclusivity isn't a word here — it's how we operate.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <path d="M8 12L24 4L40 12V20C40 32 32 40 24 44C16 40 8 32 8 20V12Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
        <path d="M24 18V28M20 24H28" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Intentional Design",
    description: "Every print, every cut, every detail is deliberate. We design to make statements, not fill shelves.",
  },
];

const promises = [
  {
    title: "Crafted for You",
    description: "Every order is printed fresh — your piece doesn't exist until you claim it. That's not a limitation, that's luxury.",
    icon: "01",
  },
  {
    title: "Premium Packaging",
    description: "We don't ship in poly bags. Every order is hand-packed in premium branded packaging — the experience starts before you wear it.",
    icon: "02",
  },
  {
    title: "No Compromises",
    description: "From fabric weight to print quality to stitching — every detail is checked before it reaches you. We'd rather delay than deliver below standard.",
    icon: "03",
  },
  {
    title: "Exclusive by Design",
    description: "Limited quantities. No restocks. When you wear DENIED., you wear something most people will never own.",
    icon: "04",
  },
];

export default function AboutPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={sectionRef}>
      {/* Hero — Brand Intro */}
      <section className="pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        >
          <span className="font-display text-[20vw] uppercase text-white/[0.035] whitespace-nowrap">
            DENIED.
          </span>
        </motion.div>

        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              Who We Are
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase mb-12">
              About DENIED<span className="text-gold">.</span>
            </h1>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="text-gray-300 text-base leading-relaxed">
                DENIED. is a premium apparel brand built on one principle — not everything is for everyone. We create for those who refuse to settle, who understand that what you wear is a statement before you speak.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-gray-300 text-base leading-relaxed">
                We don&apos;t chase trends. We craft pieces that carry weight — from oversized silhouettes and acid-washed textures to signature prints that you won&apos;t find anywhere else. Each piece is made to order, printed exclusively for the person who claims it.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-gray-300 text-base leading-relaxed">
                Every drop is limited. Every design is intentional. When you wear DENIED., you wear something rare — because it was made for you, and only you.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Founder's Letter */}
      <section className="py-28 px-6 md:px-12 bg-black-soft">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left — Letter */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                A Letter from the Founder
              </p>
              <h2 className="font-display text-3xl md:text-4xl uppercase mb-10">
                Why DENIED<span className="text-gold">.</span> Exists
              </h2>

              <div className="space-y-5">
                <p className="text-gray-300 text-sm leading-relaxed italic font-serif">
                  I started DENIED. because I was tired of seeing the same mass-produced apparel everywhere — no thought, no identity, no intention behind it.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed italic font-serif">
                  I wanted to build something that feels personal. Something where every piece is printed only when someone chooses it — not sitting in a warehouse waiting to be picked. When you order from DENIED., that product is born because of you.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed italic font-serif">
                  The name itself is a filter. Not everyone will get it. Not everyone is supposed to. And that&apos;s exactly the point.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed italic font-serif">
                  Because some standards still exist.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-gold font-serif text-lg italic">Founder, DENIED.</span>
              </div>
            </motion.div>

            {/* Right — Visual element */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent flex items-center justify-center">
                <div className="text-center px-8">
                  <span className="font-display text-[8rem] md:text-[10rem] text-white/[0.04] leading-none">D.</span>
                  <p className="text-gold text-[10px] uppercase tracking-brutal mt-4">Est. 2026</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values — Glass cards with hover */}
      <section className="py-28 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                What We Stand For
              </p>
              <h2 className="font-display text-4xl md:text-5xl uppercase">
                Our Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-8 text-center h-full"
                >
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-5">
                    {value.icon}
                  </div>
                  <h3 className="text-white font-display text-base uppercase mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-28 px-6 md:px-12 bg-black-soft">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                What You Can Expect
              </p>
              <h2 className="font-display text-4xl md:text-5xl uppercase">
                Our Promise
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {promises.map((promise, i) => (
              <ScrollReveal key={promise.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-7 flex gap-5 h-full"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-xs font-medium">{promise.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium mb-2">
                      {promise.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {promise.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-4">
              Ready to Wear the Statement<span className="text-gold">?</span>
            </h2>
            <p className="text-gray-400 text-sm mb-10">
              Explore our collection and find what speaks to you.
            </p>
            <MagneticButton strength={0.2}>
              <Link
                href="/collection"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-brutal border border-white/20 px-12 py-5 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full"
              >
                Explore Collection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
