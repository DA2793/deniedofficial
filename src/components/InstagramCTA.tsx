"use client";

import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

export default function InstagramCTA() {
  return (
    <section className="py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle background differentiation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-[700px] mx-auto text-center relative z-10">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Follow Us
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-serif italic text-4xl md:text-5xl mb-6 text-white">
            @denied._official
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-gray-400 text-sm mb-10 max-w-sm mx-auto">
            New drops, behind the scenes, and exclusive content.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <MagneticButton strength={0.15}>
            <a
              href="https://www.instagram.com/denied._official/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 gradient-gold text-black text-[11px] uppercase tracking-brutal px-10 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Follow on Instagram
            </a>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
