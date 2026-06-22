"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const total = products.length;

  // Auto-rotate
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [autoPlay, total]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + total) % total) - Math.floor(total / 2);

    const absPos = Math.abs(normalizedDiff);

    return {
      rotateY: normalizedDiff * 35,
      x: normalizedDiff * 180,
      z: -absPos * 200,
      scale: absPos === 0 ? 1 : 0.75 - absPos * 0.08,
      opacity: absPos > 2 ? 0 : 1 - absPos * 0.25,
      zIndex: total - absPos,
    };
  };

  return (
    <section className="py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            The Collection
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase">
            Explore
          </h2>
        </div>

        {/* 3D Carousel */}
        <div
          className="relative h-[520px] md:h-[600px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {products.map((product, index) => {
            const style = getCardStyle(index);

            return (
              <motion.div
                key={product.id}
                animate={{
                  rotateY: style.rotateY,
                  x: style.x,
                  z: style.z,
                  scale: style.scale,
                  opacity: style.opacity,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ zIndex: style.zIndex, transformStyle: "preserve-3d" }}
                className="absolute w-[320px] md:w-[380px] cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.08] bg-black shadow-2xl shadow-black/50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Product info at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium mb-1">{product.name}</p>
                      <p className="text-gold text-xs">₹{product.price.toLocaleString()}</p>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-gold/90 text-black text-[8px] uppercase tracking-brutal px-2 py-1 rounded-sm font-medium">
                        {product.badge}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-gold w-6" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
