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
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                Too Original to Blend In
              </p>
              <h2 className="font-display text-5xl md:text-7xl uppercase">
                Featured
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.15}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button — centered, prominent */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <MagneticButton strength={0.2}>
              <Link
                href="/collection"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-brutal border border-white/20 px-12 py-5 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full"
              >
                View All Collections
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
