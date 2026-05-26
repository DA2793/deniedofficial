"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

const categories = [
  { name: "T-Shirts", status: "live", href: "/collection" },
  { name: "Caps", status: "live", href: "/collection" },
  { name: "Watches", status: "soon", href: "#" },
  { name: "Perfumes", status: "soon", href: "#" },
  { name: "Belts", status: "soon", href: "#" },
  { name: "Wallets", status: "soon", href: "#" },
];

export default function Categories() {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            What We Offer
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase mb-20">
            Categories
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.1}>
              {cat.status === "live" ? (
                <Link href={cat.href}>
                  <MagneticButton strength={0.15}>
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(201, 169, 110, 0.04)" }}
                      className="border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-12 rounded-xl group cursor-pointer transition-all duration-500 hover:border-gold/30"
                    >
                      <span className="font-display text-2xl md:text-3xl uppercase block mb-3 group-hover:text-gold transition-colors duration-500">
                        {cat.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-brutal text-gold">
                        Shop Now →
                      </span>
                    </motion.div>
                  </MagneticButton>
                </Link>
              ) : (
                <div className="border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm p-8 md:p-12 rounded-xl opacity-60 relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                  <span className="font-display text-2xl md:text-3xl uppercase block mb-3 text-gray-600">
                    {cat.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-brutal text-gray-700">
                    Classified — Dropping Soon
                  </span>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
