"use client";

import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

export default function InstagramCTA() {
  return (
    <section className="py-36 px-6 md:px-12">
      <div className="max-w-[700px] mx-auto text-center">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Follow Us
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-serif italic text-4xl md:text-6xl mb-6 text-white">
            @denied._official
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-gray-400 text-base mb-12 max-w-md mx-auto">
            Join the community. New drops, behind the scenes, and exclusive content.
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
