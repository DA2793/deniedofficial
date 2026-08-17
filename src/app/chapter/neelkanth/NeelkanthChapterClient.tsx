"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import AshDriftBackdrop from "@/components/AshDriftBackdrop";
import FloatingChapterCTA from "@/components/FloatingChapterCTA";
import { getProductById } from "@/data/products";

// One line per story — a gist, never an explanation.
const BEATS: { id: number; title: string; line: string }[] = [
  { id: 16, title: "Kaal Har", line: "He takes away what has been taking from you." },
  { id: 22, title: "Amarnath", line: "He left everything behind to speak of forever." },
  { id: 23, title: "Halahal", line: "Held. Never swallowed." },
  { id: 24, title: "Ananta", line: "Before form, there was sound." },
  { id: 25, title: "Tandav", line: "The fiercest dance begins in perfect stillness." },
  { id: 26, title: "Mahakaal", line: "Even time has its time." },
  { id: 27, title: "Aghora", line: "Beyond fear lies freedom." },
  { id: 28, title: "Astra", line: "Not forged. Manifested." },
];

export default function NeelkanthChapterClient() {
  return (
    <main className="bg-black text-white">
      {/* ===== HERO — the identity stays ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <AshDriftBackdrop />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-40 max-w-3xl text-center"
        >
          <p className="mb-6 text-[10px] uppercase tracking-brutal text-gold">
            The Chapter
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Neelkanth.
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-gold/50" />
          <p className="mx-auto max-w-md font-serif text-xl italic text-gray-300 md:text-2xl">
            An ode to Mahadev.
          </p>
          <p className="mt-6 text-lg tracking-wide text-[#e9e2d2]/90">ॐ नमः शिवाय</p>
          <div className="mt-14">
            <a
              href="#stories"
              className="inline-flex rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-gold"
            >
              Enter the Chapter
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== THE STORIES ===== */}
      <section id="stories" className="relative overflow-hidden px-6 pb-28">
        <AshDriftBackdrop className="opacity-70" showTripundra={false} />

        <div className="relative mx-auto max-w-2xl py-24 text-center md:py-32">
          <ScrollReveal>
            <p className="font-serif text-xl italic leading-relaxed text-gray-300 md:text-2xl">
              Eight stories. One lord.
              <br />
              Poison held, time bowed, fear ended.
            </p>
            <p className="mt-8 text-[10px] uppercase tracking-brutal text-gray-500">
              One story per tee. One colour per story. 100 pieces each.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col gap-24 md:gap-32">
          {BEATS.map((beat, index) => {
            const product = getProductById(beat.id);
            if (!product) return null;
            return (
              <ScrollReveal key={beat.id} delay={0.05}>
                <div
                  className={`flex flex-col items-center gap-10 md:gap-16 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <Link
                    href={`/product/${beat.id}`}
                    className="group relative w-64 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] sm:w-72 md:w-80"
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.image}
                      alt={`${beat.title} tee`}
                      width={720}
                      height={900}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <div className={`text-center ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <p className="text-[10px] uppercase tracking-brutal text-gold">
                      {String(index + 1).padStart(2, "0")} / {BEATS.length}
                    </p>
                    <h2 className="mt-3 font-display text-4xl uppercase text-white md:text-5xl">
                      {beat.title}
                    </h2>
                    <p className="mt-5 max-w-xs font-serif text-lg italic leading-relaxed text-gray-300 md:text-xl">
                      {beat.line}
                    </p>
                    <p className="mt-5 text-sm text-gold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <Link
                      href={`/product/${beat.id}`}
                      className="mt-4 inline-flex rounded-full border border-white/15 px-7 py-3 text-[10px] uppercase tracking-brutal text-white transition-all duration-300 hover:border-gold hover:text-gold"
                    >
                      Claim Yours
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Floating shortcut — lives only in the middle stretch of the scroll */}
      <FloatingChapterCTA
        href="/collection?category=T-Shirts&tier=The%20Chapter"
        endId="neelkanth-cta"
      />

      {/* ===== CLOSING ===== */}
      <section id="neelkanth-cta" className="relative overflow-hidden px-6 py-32 md:py-44">
        <AshDriftBackdrop className="opacity-60" showTripundra={false} />
        <div className="relative mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-5 text-[10px] uppercase tracking-brutal text-gold">
              The Collection
            </p>
            <h2 className="font-display text-5xl uppercase text-white md:text-7xl">
              Har Har Mahadev.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-gray-400">
              Eight stories on heavyweight cotton — each limited to 100 pieces,
              each printed only after you claim yours.
            </p>
            <div className="mt-10">
              <Link
                href="/collection?category=T-Shirts&tier=The%20Chapter"
                className="inline-flex rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-gold"
              >
                Enter the Collection
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
