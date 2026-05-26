"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

const categories = ["All", "T-Shirts", "Caps"];

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Too Original to Blend In
          </p>
          <h1 className="font-display text-6xl md:text-8xl uppercase mb-6">
            Collection
          </h1>
          <p className="text-gray-500 text-sm mb-16 max-w-md">
            Every piece carries intention. Every drop is limited.
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex gap-4 mb-16 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[11px] uppercase tracking-brutal px-6 py-3 border transition-all duration-300 ${
                activeFilter === cat
                  ? "border-gold text-white bg-gold/10"
                  : "border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-[11px] uppercase tracking-brutal text-gray-600 self-center ml-auto">
            {filtered.length} {filtered.length === 1 ? "Piece" : "Pieces"}
          </span>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.04]"
        >
          {filtered.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">No products in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
