"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingChapterCTAProps {
  href: string;
  /** id of the page's closing CTA section — the pill hides while it's in view. */
  endId: string;
  label?: string;
}

/**
 * Scroll-aware floating CTA for chapter pages. Invisible on the hero (the
 * first screen stays pure story), fades in once the visitor scrolls into the
 * narrative, and hides again when the closing CTA section enters the viewport
 * so buttons never stack. Lets someone who finds their piece mid-scroll act
 * immediately instead of travelling to the end of the chapter.
 */
export default function FloatingChapterCTA({
  href,
  endId,
  label = "Enter the Collection",
}: FloatingChapterCTAProps) {
  const [pastHero, setPastHero] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const end = document.getElementById(endId);
    if (!end) return;
    const observer = new IntersectionObserver(
      ([entry]) => setEndVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(end);
    return () => observer.disconnect();
  }, [endId]);

  const visible = pastHero && !endVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[10px] uppercase tracking-brutal text-black shadow-xl shadow-black/50 transition-colors duration-300 hover:bg-white"
          >
            {label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
