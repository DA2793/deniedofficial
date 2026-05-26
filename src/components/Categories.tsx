"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/[0.04]">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.1}>
              {cat.status === "live" ? (
                <Link href={cat.href}>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(201, 169, 110, 0.03)" }}
                    className="bg-black p-8 md:p-12 group cursor-pointer transition-colors duration-500"
                  >
                    <span className="font-display text-2xl md:text-3xl uppercase block mb-3 group-hover:text-gold transition-colors duration-500">
                      {cat.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-brutal text-gray-500">
                      Shop Now →
                    </span>
                  </motion.div>
                </Link>
              ) : (
                <motion.div
                  className="bg-black p-8 md:p-12 opacity-30 cursor-default"
                >
                  <span className="font-display text-2xl md:text-3xl uppercase block mb-3">
                    {cat.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-brutal text-gray-500">
                    Coming Soon
                  </span>
                </motion.div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
