"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function Collection() {
  return (
    <section id="collection" className="py-32 px-6 md:px-12 bg-black-soft">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-20">
            <div>
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                Too Original to Blend In
              </p>
              <h2 className="font-display text-5xl md:text-7xl uppercase">
                Collection
              </h2>
            </div>
            <p className="hidden md:block text-[11px] uppercase tracking-brutal text-gray-500">
              {products.length} {products.length === 1 ? "Piece" : "Pieces"}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.04]">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.15}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">Collection dropping soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
