"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AshDriftBackdrop from "@/components/AshDriftBackdrop";

// Flip to true once the Neelkanth products are added.
const COLLECTION_LIVE = true;

export default function NeelkanthChapterClient() {
  return (
    <main className="bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <AshDriftBackdrop />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-56 max-w-3xl text-center"
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

          {COLLECTION_LIVE ? (
            <div className="mt-14">
              <Link
                href="/collection?tier=The%20Chapter"
                className="inline-flex rounded-full bg-white px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-gold"
              >
                Enter the Collection
              </Link>
            </div>
          ) : (
            <div className="mt-14 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.06] px-7 py-3">
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-gold"
                aria-hidden="true"
              />
              <span className="text-[10px] uppercase tracking-brutal text-gold">
                Launching Soon
              </span>
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
