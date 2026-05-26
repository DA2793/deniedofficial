"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/product/${product.id}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group cursor-pointer"
      >
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-900 rounded-lg border border-white/[0.06]">
          {/* Product image with hover scale */}
          <motion.div
            animate={hovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Badge */}
          {product.badge && (
            <motion.div
              initial={false}
              animate={hovered ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-4 bg-gold text-black text-[9px] uppercase tracking-brutal px-3 py-1.5 font-medium z-20"
            >
              {product.badge}
            </motion.div>
          )}

          {/* Wishlist — appears on hover */}
          <motion.button
            initial={false}
            animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:text-gold transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </motion.button>

          {/* Add to Cart — slides up on hover */}
          <motion.div
            initial={false}
            animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 left-4 right-4 z-20"
          >
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-full bg-white/90 backdrop-blur-sm text-black text-[10px] uppercase tracking-brutal py-3 hover:bg-gold transition-colors duration-300"
            >
              Add to Bag
            </button>
          </motion.div>
        </div>

        {/* Info — below image */}
        <div className="pt-4 pb-6">
          <h3 className="text-sm text-white font-medium mb-1 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <span className="text-gold text-sm">
            ₹{product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
