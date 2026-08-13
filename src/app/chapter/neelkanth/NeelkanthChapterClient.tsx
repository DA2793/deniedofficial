"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import OceanChurnBackdrop from "@/components/OceanChurnBackdrop";

// Flip to true once the Neelkanth products are added. Until then the page
// tells the story and gates the collection behind Coming Soon.
const COLLECTION_LIVE = false;

export default function NeelkanthChapterClient() {
  return (
    <main className="bg-black text-white">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <OceanChurnBackdrop intensity={0.45} />
        <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-[10px] uppercase tracking-brutal text-neelkanth-light">
            The Chapter
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.95] text-white sm:text-7xl md:text-8xl">
            Neelkanth.
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-neelkanth-light/60" />
          <p className="mx-auto max-w-md font-serif text-xl italic text-gray-300 md:text-2xl">
            An ode to Mahadev.
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

      {/* ===== 01 — THE STILLNESS ===== */}
      <StoryBeat
        index="01"
        title="The Stillness"
        lines={["The storm learned silence", "from Him."]}
      />

      {/* ===== 02 — THE ARTWORK ===== */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neelkanth/25 blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-md">
          <ScrollReveal>
            <Image
              src="/chapter/neelkanth/mahadev.webp"
              alt="Mahadev — the flagship artwork of the Neelkanth chapter"
              width={760}
              height={1126}
              className="h-auto w-full drop-shadow-[0_0_40px_rgba(30,58,95,0.45)]"
            />
            <p className="mt-8 text-center text-[10px] uppercase tracking-brutal text-gray-500">
              Mahadev — the first piece
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 03 — THE POISON ===== */}
      <StoryBeat
        index="03"
        title="The Poison"
        lines={[
          "Everyone waited for the nectar.",
          "One held the poison instead —",
          "and it never left His throat.",
        ]}
        accent="Held. Not swallowed."
        dark
      />

      {/* ===== 04 — THE KAAL ===== */}
      <StoryBeat
        index="04"
        title="The Kaal"
        lines={["Time takes everything.", "And fears its own keeper."]}
      />

      {/* ===== 05 — THE THIRD EYE ===== */}
      <StoryBeat
        index="05"
        title="The Third Eye"
        lines={["Closed,", "out of mercy."]}
        dark
      />

      {/* ===== THE COLLECTION (gated) ===== */}
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
                    href="/chapter/zodiac"
                    className="inline-flex rounded-full border border-white/15 px-10 py-4 text-[10px] uppercase tracking-brutal text-white transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    Explore the Zodiac Chapter
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
  accent?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden px-6 py-32 md:py-44 ${dark ? "bg-neelkanth-deep/20" : ""}`}
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
          {accent && (
            <p className="mt-10 font-display text-3xl uppercase text-white md:text-4xl">
              {accent}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
