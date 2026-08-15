"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SilkDriftBackdrop from "@/components/SilkDriftBackdrop";

// Flip to true once the Geet pieces are added — the women's collection
// (existing and new) moves under this roof at launch.
const COLLECTION_LIVE = false;

export default function GeetClient() {
  return (
    <main className="bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <SilkDriftBackdrop />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-[10px] uppercase tracking-brutal text-[#deaa8e]">
            DENIED. presents
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] text-[#f6f1e7] sm:text-7xl md:text-8xl">
            The Geet Collection
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-[#deaa8e]/50" />
          <p className="mx-auto max-w-md font-serif text-xl italic text-[#e8cfc3] md:text-2xl">
            Designed by Her, for Her.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-gray-400">
            Crafted for the woman who needs no introduction.
          </p>

          {COLLECTION_LIVE ? (
            <div className="mt-14">
              <Link
                href="/collection?gender=Women"
                className="inline-flex rounded-full bg-[#f6f1e7] px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-[#deaa8e]"
              >
                Enter the Collection
              </Link>
            </div>
          ) : (
            <div className="mt-14 inline-flex items-center gap-3 rounded-full border border-[#deaa8e]/25 bg-[#deaa8e]/[0.06] px-7 py-3">
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-[#deaa8e]"
                aria-hidden="true"
              />
              <span className="text-[10px] uppercase tracking-brutal text-[#deaa8e]">
                Launching Soon
              </span>
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
