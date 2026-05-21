"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-black-soft border-t border-white/[0.04]">
      <div className="max-w-[600px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-6xl uppercase mb-4">
            Join the Selected
            <span className="text-gold">.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-gray-400 text-base mb-12">
            Early access to drops. No noise.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent border border-white/10 border-r-0 px-5 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-gold/50 transition-colors"
            />
            <MagneticButton strength={0.15}>
              <button
                type="submit"
                className="bg-white text-black text-[10px] uppercase tracking-brutal px-8 py-4 hover:bg-gold transition-colors duration-300"
              >
                {submitted ? "✓" : "Join"}
              </button>
            </MagneticButton>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
