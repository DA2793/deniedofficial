"use client";

import { useWishlist } from "@/context/WishlistContext";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function WishlistPage() {
  const { wishlistProducts, totalItems } = useWishlist();

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Your Selection
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-4">
            Wishlist
          </h1>
          <p className="text-gray-500 text-sm mb-12">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
        </ScrollReveal>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm mb-8">Your wishlist is empty.</p>
            <MagneticButton strength={0.2}>
              <Link
                href="/collection"
                className="inline-block text-[11px] uppercase tracking-brutal border border-white/20 px-10 py-4 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                Explore Collection
              </Link>
            </MagneticButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {wishlistProducts.map((product) => (
              <ScrollReveal key={product.id}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
