"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function InnerSanctumPage() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32 md:px-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[120px]" />
        <div className="absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent md:inset-x-24" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-13rem)] max-w-[800px] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/[0.04]"
            aria-hidden="true"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold">
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 018 0v3" />
              <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
            </svg>
          </motion.div>

          <p className="mb-5 text-[10px] uppercase tracking-brutal text-gold">
            Access Reserved
          </p>
          <h1 className="font-display text-5xl uppercase leading-none text-white sm:text-6xl md:text-8xl">
            The Inner Sanctum
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-gold/50" />
          <p className="font-serif text-xl italic text-gray-300 md:text-2xl">
            Something exclusive is taking shape.
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-gray-500">
            We are finalising the programme. The doors will open when every detail is worthy of the Selected.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/[0.04] px-7 py-3">
            <motion.span
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-gold"
              aria-hidden="true"
            />
            <span className="text-[10px] uppercase tracking-brutal text-gold">Coming Soon</span>
          </div>

          <div className="mt-12">
            <Link
              href="/collection"
              className="inline-flex rounded-full border border-white/15 px-10 py-4 text-[10px] uppercase tracking-brutal text-white transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Explore Collection
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
