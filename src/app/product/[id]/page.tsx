"use client";

import { useParams } from "next/navigation";
import { getProductById, products } from "@/data/products";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ProductCard from "@/components/ProductCard";
import MagneticButton from "@/components/MagneticButton";

// ===== IMAGE ZOOM MODAL =====
function ImageZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const zoomIn = () => setScale((s) => Math.min(s + 0.5, 4));
  const zoomOut = () => {
    setScale((s) => {
      const newScale = Math.max(s - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };
  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.3 : 0.3;
    setScale((s) => {
      const newScale = Math.max(1, Math.min(s + delta, 4));
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
        <button onClick={zoomIn} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:border-gold transition-colors" aria-label="Zoom in">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12M6 12h12" /></svg>
        </button>
        <button onClick={zoomOut} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:border-gold transition-colors" aria-label="Zoom out">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12h12" /></svg>
        </button>
        <button onClick={resetZoom} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:border-gold transition-colors text-[10px] tracking-brutal" aria-label="Reset zoom">
          {Math.round(scale * 100)}%
        </button>
        <button onClick={onClose} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:border-gold transition-colors" aria-label="Close">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-[10px] uppercase tracking-brutal z-10">
        Scroll to zoom · Drag to pan · Esc to close
      </div>

      {/* Image */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative w-[80vmin] h-[80vmin] transition-transform duration-150 ease-out"
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
        >
          <Image src={src} alt={alt} fill className="object-contain select-none pointer-events-none" sizes="80vmin" priority draggable={false} />
        </div>
      </div>
    </motion.div>
  );
}

// ===== PRODUCT PAGE =====
export default function ProductPage() {
  const params = useParams();
  const product = getProductById(Number(params.id));
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-4">
        <p className="text-gray-500 text-sm">Product not found.</p>
        <Link href="/collection" className="text-gold text-xs uppercase tracking-brutal hover:text-white transition-colors">
          ← Back to Collection
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-brutal text-gray-500 mb-12"
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-gray-700">/</span>
          <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-300">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-900 mb-4 cursor-zoom-in" onClick={() => setZoomOpen(true)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
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

              {/* Zoom indicator */}
              <div className="absolute top-4 right-4 w-9 h-9 border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6M7 10h6" />
                </svg>
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1)); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-gold transition-all"
                    aria-label="Previous image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1)); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-gold transition-all"
                    aria-label="Next image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] uppercase tracking-brutal text-white/40">
                  {String(activeImage + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-24 overflow-hidden border transition-all duration-300 ${
                      activeImage === i
                        ? "border-gold opacity-100"
                        : "border-white/[0.06] opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right — Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pt-4"
          >
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
                <>
                  <span className="text-gray-600 text-lg line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] uppercase tracking-brutal text-green-400 border border-green-400/20 px-2 py-1">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-brutal text-gray-400 mb-4">
                Colour {selectedColor && <span className="text-white ml-2">— {selectedColor}</span>}
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
                Size {selectedSize && <span className="text-white ml-2">— {selectedSize}</span>}
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

            {/* CTA Buttons */}
            <div className="space-y-3 mb-8">
              <MagneticButton strength={0.1} className="w-full">
                <button className="w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Bag
                </button>
              </MagneticButton>

              <button className="w-full border border-white/10 text-white text-[11px] uppercase tracking-brutal py-4 hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                Add to Wishlist
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-b border-white/[0.06] mb-10">
              {[
                { icon: "◆", label: "Made to Order" },
                { icon: "◆", label: "Premium Quality" },
                { icon: "◆", label: "Made in India" },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <div className="text-gold text-sm mb-1">{badge.icon}</div>
                  <div className="text-[9px] uppercase tracking-brutal text-gray-500">{badge.label}</div>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div>
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-6">
                Product Details
              </p>
              <div className="space-y-4">
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
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-32">
            <ScrollReveal>
              <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
                You May Also Like
              </p>
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-12">
                More from the Collection
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomOpen && (
          <ImageZoomModal
            src={product.images[activeImage]}
            alt={product.name}
            onClose={() => setZoomOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
