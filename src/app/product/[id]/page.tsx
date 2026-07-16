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
import SizeGuide from "@/components/SizeGuide";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handlePointerUp = () => setDragging(false);

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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-gray-500 text-[10px] uppercase tracking-brutal z-10">
        Use controls to zoom · Drag to pan · Esc to close
      </div>

      {/* Image */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: scale > 1 ? "none" : "manipulation" }}
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
  const [selectedColor, setSelectedColor] = useState<string>(product?.details.colors[0] || "");
  const [zoomOpen, setZoomOpen] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = product ? isInWishlist(product.id) : false;

  // Get images based on selected color
  const currentImages = selectedColor && product?.colorImages[selectedColor]
    ? product.colorImages[selectedColor]
    : product?.images || [];

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
            {/* Main Image + Vertical Nav */}
            <div className="flex gap-4">
              {/* Image */}
              <div
                className="relative flex-1 aspect-[3/4] overflow-hidden rounded-lg border border-white/[0.06] cursor-zoom-in"
                onClick={() => setZoomOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setZoomOpen(true);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open zoomed view of ${product.name}`}
              >
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
                      src={currentImages[activeImage]}
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

                {/* Image counter */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] uppercase tracking-brutal text-white/40">
                    {String(activeImage + 1).padStart(2, "0")} / {String(currentImages.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Vertical navigation — outside image on the right */}
              {currentImages.length > 1 && (
                <div className="flex flex-col items-center justify-center gap-4">
                  {/* Up arrow */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveImage((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))}
                    className="w-11 h-11 border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-all duration-300 touch-manipulation"
                    aria-label="Previous product image"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </motion.button>

                  {/* Progress dots */}
                  <div className="flex flex-col items-center gap-1.5">
                    {currentImages.map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className="w-11 h-6 flex items-center justify-center touch-manipulation"
                        aria-label={`Show product image ${i + 1}`}
                        aria-current={activeImage === i ? "true" : undefined}
                      >
                        <motion.span
                          animate={{
                            height: activeImage === i ? 20 : 6,
                            backgroundColor: activeImage === i ? "#c9a96e" : "rgba(255,255,255,0.15)",
                          }}
                          transition={{ duration: 0.3 }}
                          className="block w-[2px] rounded-full"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Down arrow */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveImage((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))}
                    className="w-11 h-11 border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-all duration-300 touch-manipulation"
                    aria-label="Next product image"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {currentImages.length > 1 && (
              <div className="flex gap-2 mt-4">
                {currentImages.map((img, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show ${product.name} image ${i + 1}`}
                    className={`relative w-20 h-24 overflow-hidden rounded-md border transition-all duration-300 touch-manipulation ${
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
              <div className="flex flex-wrap gap-3">
                {product.details.colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    onClick={() => { setSelectedColor(color); setActiveImage(0); }}
                    className={`min-h-11 px-5 py-2.5 rounded-full text-xs uppercase tracking-wide border transition-all duration-300 touch-manipulation ${
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
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] uppercase tracking-brutal text-gray-400">
                  Size {selectedSize && <span className="text-white ml-2">— {selectedSize}</span>}
                </p>
                <SizeGuide sizeChart={product.sizeChart} />
              </div>
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
                <button
                  onClick={() => {
                    if (!selectedSize) { alert("Please select a size"); return; }
                    addToCart(product, selectedColor, selectedSize);
                  }}
                  className="w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-3 rounded-full"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Bag
                </button>
              </MagneticButton>

              <button
                onClick={() => product && toggleWishlist(product.id)}
                className={`w-full border text-[11px] uppercase tracking-brutal py-4 transition-all duration-300 flex items-center justify-center gap-3 rounded-full ${
                  wishlisted
                    ? "border-gold text-gold bg-gold/10"
                    : "border-white/10 text-white hover:border-gold hover:text-gold"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-b border-white/[0.06] mb-10">
              {/* Made to Order — T-shirt with print */}
              <div className="text-center">
                <div className="text-2xl mb-2">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="mx-auto">
                    <path d="M14 8L8 14V40C8 41.1 8.9 42 10 42H38C39.1 42 40 41.1 40 40V14L34 8H14Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
                    <path d="M14 8L18 4H30L34 8" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
                    <path d="M8 14H40" stroke="#c9a96e" strokeWidth="1.5"/>
                    <rect x="18" y="22" width="12" height="12" rx="1" stroke="#c9a96e" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
                    <path d="M22 26L24 28L26 26" stroke="#c9a96e" strokeWidth="1" opacity="0.8"/>
                    <path d="M24 28V24" stroke="#c9a96e" strokeWidth="1" opacity="0.8"/>
                  </svg>
                </div>
                <div className="text-[9px] uppercase tracking-brutal text-gray-400">Made to Order</div>
              </div>

              {/* Premium Quality — Shield with check */}
              <div className="text-center">
                <div className="text-2xl mb-2">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="mx-auto">
                    <path d="M24 4L6 12V22C6 34 14 42 24 46C34 42 42 34 42 22V12L24 4Z" stroke="#c9a96e" strokeWidth="1.5" fill="none"/>
                    <path d="M16 24L22 30L32 18" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[9px] uppercase tracking-brutal text-gray-400">Premium Quality</div>
              </div>

              {/* Made in India — Waving flag */}
              <div className="text-center">
                <div className="text-2xl mb-2 relative">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="mx-auto">
                    <line x1="10" y1="6" x2="10" y2="42" stroke="#c9a96e" strokeWidth="1.5"/>
                    <path d="M10 8C14 6 18 10 22 8C26 6 30 10 34 8V22C30 24 26 20 22 22C18 24 14 20 10 22" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                      <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10 8C14 6 18 10 22 8C26 6 30 10 34 8V22C30 24 26 20 22 22C18 24 14 20 10 22;M10 8C14 10 18 6 22 8C26 10 30 6 34 8V22C30 20 26 24 22 22C18 20 14 24 10 22;M10 8C14 6 18 10 22 8C26 6 30 10 34 8V22C30 24 26 20 22 22C18 24 14 20 10 22"/>
                    </path>
                    {/* Tricolor bands */}
                    <path d="M10 8C14 6 18 10 22 8C26 6 30 10 34 8V12.5C30 14.5 26 10.5 22 12.5C18 14.5 14 10.5 10 12.5" fill="#FF9933" opacity="0.6">
                      <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10 8C14 6 18 10 22 8C26 6 30 10 34 8V12.5C30 14.5 26 10.5 22 12.5C18 14.5 14 10.5 10 12.5;M10 8C14 10 18 6 22 8C26 10 30 6 34 8V12.5C30 10.5 26 14.5 22 12.5C18 10.5 14 14.5 10 12.5;M10 8C14 6 18 10 22 8C26 6 30 10 34 8V12.5C30 14.5 26 10.5 22 12.5C18 14.5 14 10.5 10 12.5"/>
                    </path>
                    <path d="M10 12.5C14 10.5 18 14.5 22 12.5C26 10.5 30 14.5 34 12.5V17.5C30 19.5 26 15.5 22 17.5C18 19.5 14 15.5 10 17.5" fill="#FFFFFF" opacity="0.6">
                      <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10 12.5C14 10.5 18 14.5 22 12.5C26 10.5 30 14.5 34 12.5V17.5C30 19.5 26 15.5 22 17.5C18 19.5 14 15.5 10 17.5;M10 12.5C14 14.5 18 10.5 22 12.5C26 14.5 30 10.5 34 12.5V17.5C30 15.5 26 19.5 22 17.5C18 15.5 14 19.5 10 17.5;M10 12.5C14 10.5 18 14.5 22 12.5C26 10.5 30 14.5 34 12.5V17.5C30 19.5 26 15.5 22 17.5C18 19.5 14 15.5 10 17.5"/>
                    </path>
                    <path d="M10 17.5C14 15.5 18 19.5 22 17.5C26 15.5 30 19.5 34 17.5V22C30 24 26 20 22 22C18 24 14 20 10 22" fill="#138808" opacity="0.6">
                      <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10 17.5C14 15.5 18 19.5 22 17.5C26 15.5 30 19.5 34 17.5V22C30 24 26 20 22 22C18 24 14 20 10 22;M10 17.5C14 19.5 18 15.5 22 17.5C26 19.5 30 15.5 34 17.5V22C30 20 26 24 22 22C18 20 14 24 10 22;M10 17.5C14 15.5 18 19.5 22 17.5C26 15.5 30 19.5 34 17.5V22C30 24 26 20 22 22C18 24 14 20 10 22"/>
                    </path>
                  </svg>
                </div>
                <div className="text-[9px] uppercase tracking-brutal text-gray-400">Made in India</div>
              </div>
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
            src={currentImages[activeImage]}
            alt={product.name}
            onClose={() => setZoomOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
