"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

const PREVIEW_INTERVAL_MS = 1100;

export default function ProductCard({ product }: { product: Product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const previewImages = Array.from(new Set([product.image, ...product.images]));
  const [isHovered, setIsHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isHovered || !supportsHover || reducedMotion || previewImages.length < 2) {
      setPreviewIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setPreviewIndex((current) => (current + 1) % previewImages.length);
    }, PREVIEW_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [isHovered, previewImages.length]);

  const previewImage = previewImages[previewIndex] ?? product.image;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block" aria-label={`View ${product.name}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <motion.div
            key={previewImage}
            initial={previewIndex === 0 ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          >
            <Image src={previewImage} alt={`${product.name} preview ${previewIndex + 1}`} fill className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          {product.badge && <div className="absolute top-4 left-4 glass-subtle px-3 py-1.5 z-10"><span className="text-[9px] uppercase tracking-brutal text-gold font-medium">{product.badge}</span></div>}
        </div>
        <div className="pt-5 pb-6">
          <h3 className="text-sm text-white font-medium mb-1.5 group-hover:text-gold transition-colors duration-300">{product.name}</h3>
          <span className="text-gold text-sm">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && <span className="text-gray-600 text-xs line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>}
        </div>
      </Link>
      <button type="button" onClick={() => toggleWishlist(product.id)} className={`absolute top-4 right-4 z-20 w-11 h-11 rounded-full glass-subtle flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-all duration-300 touch-manipulation ${wishlisted ? "text-gold" : "text-white hover:text-gold"}`} aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={wishlisted}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
      </button>
    </motion.article>
  );
}
