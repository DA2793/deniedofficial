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
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="bg-black group cursor-pointer relative"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />

          {/* Split/Peel reveal overlay */}
          <motion.div
            initial={false}
            animate={hovered ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-10"
          >
            <motion.span
              initial={false}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-[10px] uppercase tracking-brutal text-gold"
            >
              View Product
            </motion.span>
            <motion.span
              initial={false}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-display text-2xl uppercase text-white"
            >
              {product.name}
            </motion.span>
            <motion.span
              initial={false}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-gold text-sm"
            >
              ₹{product.price.toLocaleString()}
            </motion.span>
          </motion.div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 bg-gold text-black text-[9px] uppercase tracking-brutal px-3 py-1.5 font-medium z-20">
              {product.badge}
            </div>
          )}

          {/* Wishlist heart */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold transition-colors duration-300"
            aria-label="Add to wishlist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="p-6 border-t border-white/[0.04]">
          <p className="text-[9px] uppercase tracking-brutal text-gray-500 mb-2">
            {product.category}
          </p>
          <h3 className="font-display text-lg uppercase mb-3">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-gold text-sm font-medium">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-gray-600 text-xs line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
