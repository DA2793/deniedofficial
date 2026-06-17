"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group cursor-pointer"
      >
        {/* Image container — glass card */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          {/* Product image with hover zoom */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 glass-subtle px-3 py-1.5 z-20">
              <span className="text-[9px] uppercase tracking-brutal text-gold font-medium">
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist — appears on hover */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-9 h-9 glass-subtle flex items-center justify-center text-white/70 hover:text-gold transition-colors duration-200"
              aria-label="Add to wishlist"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </div>

          {/* Add to Bag — slides up on hover */}
          <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full glass-subtle py-3 text-[10px] uppercase tracking-brutal text-white hover:text-gold transition-colors duration-300 text-center"
            >
              Add to Bag
            </button>
          </div>
        </div>

        {/* Info — below image */}
        <div className="pt-5 pb-6">
          <h3 className="text-sm text-white font-medium mb-1.5 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <span className="text-gold text-sm">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-600 text-xs line-through ml-2">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
