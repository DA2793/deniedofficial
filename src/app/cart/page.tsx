"use client";

import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function CartPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Your Order
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-12">
            Cart
          </h1>
        </ScrollReveal>

        <div className="text-center py-20">
          <p className="text-gray-500 text-sm mb-8">Your cart is empty.</p>
          <MagneticButton strength={0.2}>
            <Link
              href="/collection"
              className="inline-block text-[11px] uppercase tracking-brutal border border-white/20 px-10 py-4 text-white hover:bg-white hover:text-black transition-all duration-500"
            >
              Explore Collection
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
