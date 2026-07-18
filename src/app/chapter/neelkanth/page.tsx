"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import OceanChurnBackdrop from "@/components/OceanChurnBackdrop";

// Flip to true once products for this drop are ready. Until then the page
// tells the full story but gates the actual collection behind Coming Soon —
// same masking pattern used for Inner Sanctum.
const COLLECTION_LIVE = false;

export default function NeelkanthChapterPage() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <main className="bg-black text-white">
      {/* ===== HERO — THE CHURNING ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <OceanChurnBackdrop intensity={reducedMotion ? 0.4 : 1} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-[10px] uppercase tracking-brutal text-neelkanth-light">
            The Chapter / 001
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Neelkanth.
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-neelkanth-light/60" />
          <p className="mx-auto max-w-md font-serif text-lg italic text-gray-300 md:text-xl">
            Everyone waited for the nectar.
            <br />
            No one wanted the poison.
            <br />
            One didn&apos;t walk away.
          </p>
          <p className="mt-8 text-[10px] uppercase tracking-brutal text-gray-500">
            DENIED. — Sawan 2026
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-[9px] uppercase tracking-brutal text-gray-500"
        >
          Scroll
        </motion.div>
      </section>

      {/* ===== 01 — THE POISON ===== */}
      <StoryBeat
        index="01"
        title="The Poison"
        lines={[
          "Before the nectar came the poison.",
          "The thing nobody wanted.",
          "Failure. Rejection. Pressure. Pain.",
        ]}
        accent="Denied."
      />

      {/* ===== 02 — THE CHOICE ===== */}
      <StoryBeat
        index="02"
        title="The Choice"
        lines={[
          "He didn't swallow it.",
          "He didn't spit it back.",
          "He held it.",
        ]}
        accent="Control. Not reaction."
        dark
      />

      {/* ===== 03 — THE BLUE ===== */}
      <section className="relative overflow-hidden px-6 py-32 md:py-48">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neelkanth/20 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <p className="mb-4 text-[10px] uppercase tracking-brutal text-neelkanth-light">03 — The Blue</p>
            <p className="font-serif text-2xl italic text-gray-300 md:text-3xl">
              The poison left a mark.
              <br />
              The mark became the name.
            </p>
            <h2 className="mt-10 font-display text-5xl uppercase text-white md:text-7xl">
              Neelkanth.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 04 — THE RAIN (brief transition beat, not a running motif) ===== */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-neelkanth-deep/30 to-black" aria-hidden="true" />
        <ScrollReveal className="relative max-w-2xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-brutal text-neelkanth-light">04 — The Rain</p>
          <p className="font-serif text-xl italic text-gray-300 md:text-2xl">
            Then comes Sawan.
            <br />
            Cooling what still burns.
          </p>
        </ScrollReveal>
      </section>

      {/* ===== 05 — THE STILLNESS ===== */}
      <StoryBeat
        index="05"
        title="The Stillness"
        lines={["Not the god.", "What he represents.", "Stillness in chaos."]}
        accent="Chaos, denied."
        dark
      />

      {/* ===== 06 — THE COLLECTION (gated) ===== */}
      <section className="relative px-6 py-32 md:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-5 text-[10px] uppercase tracking-brutal text-neelkanth-light">
              The Collection
            </p>
            <h2 className="font-display text-5xl uppercase text-white md:text-7xl">
              Neelkanth.
            </h2>

            {COLLECTION_LIVE ? (
              <div className="mt-10">
                <Link
                  href="/collection?tier=The%20Chapter"
                  className="inline-flex rounded-full border border-neelkanth-light/40 px-10 py-4 text-[10px] uppercase tracking-brutal text-white transition-all duration-300 hover:border-neelkanth-light hover:text-neelkanth-light"
                >
                  Enter the Collection
                </Link>
              </div>
            ) : (
              <>
                <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-gray-500">
                  Every piece is still being made. What you carry shouldn&apos;t be rushed.
                </p>
                <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-neelkanth-light/25 bg-neelkanth-dim px-7 py-3">
                  <motion.span
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1.5 w-1.5 rounded-full bg-neelkanth-light"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] uppercase tracking-brutal text-neelkanth-light">
                    Coming Soon
                  </span>
                </div>
                <div className="mt-12">
                  <Link
                    href="/collection"
                    className="inline-flex rounded-full border border-white/15 px-10 py-4 text-[10px] uppercase tracking-brutal text-white transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    Explore Collection
                  </Link>
                </div>
              </>
            )}
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

function StoryBeat({
  index,
  title,
  lines,
  accent,
  dark = false,
}: {
  index: string;
  title: string;
  lines: string[];
  accent: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden px-6 py-32 md:py-48 ${dark ? "bg-neelkanth-deep/20" : ""}`}
    >
      <div className="relative mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="mb-6 text-[10px] uppercase tracking-brutal text-neelkanth-light">
            {index} — {title}
          </p>
          <div className="space-y-2">
            {lines.map((line, i) => (
              <p key={i} className="font-serif text-xl italic text-gray-300 md:text-2xl">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-10 font-display text-3xl uppercase text-white md:text-4xl">
            {accent}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
