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
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-black group cursor-pointer"
      >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 bg-gold text-black text-[9px] uppercase tracking-brutal px-3 py-1.5 font-medium">
            {product.badge}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button className="w-full bg-white text-black text-[10px] uppercase tracking-brutal py-3 hover:bg-gold transition-colors duration-300">
            Add to Cart
          </button>
        </div>
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
