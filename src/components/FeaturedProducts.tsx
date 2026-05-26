"use client";

import ScrollReveal from "./ScrollReveal";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

export default function FeaturedProducts() {
  const featured = products.slice(0, 3);

  return (
    <section className="py-32 px-6 md:px-12 bg-black-soft">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-20">
            <div>
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                Too Original to Blend In
              </p>
              <h2 className="font-display text-5xl md:text-7xl uppercase">
                Featured
              </h2>
            </div>
            <Link
              href="/collection"
              className="hidden md:block text-[11px] uppercase tracking-brutal text-gray-500 hover:text-gold transition-colors"
            >
              View All →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.15}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
          <MagneticButton strength={0.2}>
            <Link
              href="/collection"
              className="inline-block text-[11px] uppercase tracking-brutal border border-white/20 px-10 py-4 text-white hover:bg-white hover:text-black transition-all duration-500"
            >
              View All Collection
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
