"use client";

import { useParams } from "next/navigation";
import { getProductById } from "@/data/products";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(Number(params.id));
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Back link */}
        <Link
          href="/#collection"
          className="inline-block text-[10px] uppercase tracking-brutal text-gray-500 hover:text-white transition-colors mb-12"
        >
          ← Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[3/4] bg-gray-900 overflow-hidden"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={`${product.name} - ${activeImage + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation — vertical bar on right side */}
              <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col items-center justify-center gap-6 z-20">
                {/* Prev */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="w-10 h-10 border border-white/10 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-all duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </motion.button>

                {/* Progress indicator */}
                <div className="flex flex-col items-center gap-1">
                  {product.images.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: activeImage === i ? 20 : 6,
                        backgroundColor: activeImage === i ? "#c9a96e" : "rgba(255,255,255,0.15)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-[2px] rounded-full cursor-pointer"
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </div>

                {/* Next */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 border border-white/10 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-all duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.button>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-[10px] uppercase tracking-brutal text-white/40">
                  {String(activeImage + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-[3/4] overflow-hidden border transition-all duration-300 ${
                    activeImage === i
                      ? "border-gold"
                      : "border-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="lg:pt-8">
            {/* Badge */}
            {product.badge && (
              <span className="inline-block bg-gold text-black text-[9px] uppercase tracking-brutal px-3 py-1.5 font-medium mb-6">
                {product.badge}
              </span>
            )}

            {/* Category */}
            <p className="text-[10px] uppercase tracking-brutal text-gray-500 mb-3">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="font-display text-4xl md:text-5xl uppercase mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gold text-2xl font-medium">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-gray-600 text-lg line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-brutal text-gray-400 mb-4">
                Color
              </p>
              <div className="flex gap-3">
                {product.details.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-5 py-2.5 text-xs uppercase tracking-wide border transition-all duration-300 ${
                      selectedColor === color
                        ? "border-gold text-white bg-gold/10"
                        : "border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-brutal text-gray-400 mb-4">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.details.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-xs uppercase border transition-all duration-300 ${
                      selectedSize === size
                        ? "border-gold text-white bg-gold/10"
                        : "border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 hover:bg-gold transition-colors duration-300 mb-3">
              Add to Cart
            </button>

            {/* Wishlist */}
            <button className="w-full border border-white/10 text-white text-[11px] uppercase tracking-brutal py-4 hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Add to Wishlist
            </button>

            {/* Divider */}
            <div className="border-t border-white/[0.06] my-10" />

            {/* Product Details */}
            <div className="space-y-5">
              <p className="text-[10px] uppercase tracking-brutal text-gray-400 mb-4">
                Details
              </p>
              <div className="flex justify-between py-3 border-b border-white/[0.04]">
                <span className="text-sm text-gray-400">Fabric</span>
                <span className="text-sm text-white text-right max-w-[60%]">{product.details.fabric}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.04]">
                <span className="text-sm text-gray-400">Fit</span>
                <span className="text-sm text-white text-right max-w-[60%]">{product.details.fit}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.04]">
                <span className="text-sm text-gray-400">Care</span>
                <span className="text-sm text-white text-right max-w-[60%]">{product.details.care}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
