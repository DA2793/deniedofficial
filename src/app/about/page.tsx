"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function AboutPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={sectionRef} className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
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
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              Who We Are
            </p>
            <h1 className="font-display text-6xl md:text-8xl uppercase mb-8">
              About DENIED<span className="text-gold">.</span>
            </h1>
          </ScrollReveal>

          <div className="max-w-[700px]">
            <ScrollReveal delay={0.1}>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                DENIED. is a premium apparel brand built on one principle — not everything is for everyone. We create for those who refuse to settle, who understand that what you wear is a statement before you speak.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We don&apos;t chase trends. We craft pieces that carry weight — from oversized silhouettes and acid-washed textures to signature prints that you won&apos;t find anywhere else. Each piece is made to order, printed exclusively for the person who claims it.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-gray-400 text-lg leading-relaxed">
                Every drop is limited. Every design is intentional. When you wear DENIED., you wear something rare — because it was made for you, and only you.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="border-t border-white/[0.04]" />
      </div>

      {/* Founder's Letter */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
            {/* Left */}
            <ScrollReveal>
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                A Letter from the Founder
              </p>
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-4">
                Why DENIED<span className="text-gold">.</span> Exists
              </h2>
            </ScrollReveal>

            {/* Right */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <p className="text-gray-400 text-base leading-relaxed italic font-serif">
                  I started DENIED. because I was tired of seeing the same mass-produced apparel everywhere — no thought, no identity, no intention behind it.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-gray-400 text-base leading-relaxed italic font-serif">
                  I wanted to build something that feels personal. Something where every piece is printed only when someone chooses it — not sitting in a warehouse waiting to be picked. When you order from DENIED., that tee is born because of you. It didn&apos;t exist before your order.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-gray-400 text-base leading-relaxed italic font-serif">
                  The name itself is a filter. Not everyone will get it. Not everyone is supposed to. And that&apos;s exactly the point.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="text-gray-400 text-base leading-relaxed italic font-serif">
                  This isn&apos;t just clothing — it&apos;s a statement you carry. I want every person who wears DENIED. to feel like they&apos;re part of something exclusive, something that doesn&apos;t need validation.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <p className="text-gray-400 text-base leading-relaxed italic font-serif">
                  Because some standards still exist.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <p className="text-white text-sm mt-8 tracking-wide">
                  — Founder, DENIED.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="border-t border-white/[0.04]" />
      </div>

      {/* Values */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              What We Stand For
            </p>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-16">
              Our Values
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/[0.04]">
            {[
              {
                title: "Made to Order",
                desc: "Every piece is printed exclusively for you. No ready stock. No mass production. Your tee exists because you chose it.",
              },
              {
                title: "Premium Quality",
                desc: "From 260 GSM terry-knit to Supima cotton — we use fabrics that feel as good as they look. No shortcuts.",
              },
              {
                title: "Limited Drops",
                desc: "We don't restock. Once a design is gone, it's gone. Exclusivity isn't a marketing word here — it's how we operate.",
              },
              {
                title: "Intentional Design",
                desc: "Every print, every cut, every detail is deliberate. We don't design to fill shelves. We design to make statements.",
              },
            ].map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="bg-black p-8 md:p-10 h-full">
                  <h3 className="font-display text-lg uppercase mb-4 text-gold">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="border-t border-white/[0.04]" />
      </div>

      {/* Promise */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              What You Can Expect
            </p>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-16">
              Our Promise
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Crafted for You",
                desc: "Every order is printed fresh — your piece doesn't exist until you claim it. That's not a limitation, that's luxury.",
              },
              {
                title: "Premium Packaging",
                desc: "We don't ship in poly bags. Every order is hand-packed in premium branded packaging — because the experience starts before you wear it.",
              },
              {
                title: "No Compromises",
                desc: "From fabric weight to print quality to stitching — every detail is checked before it reaches you. We'd rather delay than deliver something below standard.",
              },
              {
                title: "Exclusive by Design",
                desc: "Limited quantities. No restocks. When you wear DENIED., you wear something most people will never own.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="border-l-2 border-gold/30 pl-6">
                  <h3 className="text-white text-base font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-black-soft border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-8">
              Ready to Wear the Statement<span className="text-gold">?</span>
            </h2>
            <MagneticButton strength={0.2}>
              <Link
                href="/collection"
                className="inline-block text-[11px] uppercase tracking-brutal border border-white/20 px-10 py-4 text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                Explore Collection
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
