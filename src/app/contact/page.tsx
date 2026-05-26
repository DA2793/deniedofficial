"use client";

import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

export default function ContactPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-6xl md:text-8xl uppercase mb-20">
            Contact
          </h1>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left — Info */}
          <div className="space-y-12">
            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-[10px] uppercase tracking-brutal text-gray-500 mb-3">
                  Email
                </p>
                <a
                  href="mailto:hello@deniedofficial.com"
                  className="text-lg text-white hover:text-gold transition-colors"
                >
                  hello@deniedofficial.com
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-[10px] uppercase tracking-brutal text-gray-500 mb-3">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/denied._official/"
                  target="_blank"
                  rel="noopener"
                  className="text-lg text-white hover:text-gold transition-colors"
                >
                  @denied._official
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div>
                <p className="text-[10px] uppercase tracking-brutal text-gray-500 mb-3">
                  Website
                </p>
                <span className="text-lg text-white">
                  deniedofficial.com
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Form */}
          <ScrollReveal delay={0.2}>
            <form className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-3">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-3">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-brutal text-gray-500 block mb-3">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-sm outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                <MagneticButton strength={0.15}>
                  <button
                    type="submit"
                    className="bg-white text-black text-[11px] uppercase tracking-brutal px-10 py-4 hover:bg-gold transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </MagneticButton>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
