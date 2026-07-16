"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

const categoryFilters = [
  { slug: "all", name: "All" },
  { slug: "T-Shirts", name: "T-Shirts" },
  { slug: "Women", name: "Women" },
  { slug: "Caps", name: "Caps" },
];

function CollectionContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high">("default");

  useEffect(() => {
    const cat = searchParams.get("category");
    const filter = searchParams.get("filter");
    if (cat) setActiveCategory(cat);
    if (filter === "new") setShowNewOnly(true);
    if (filter === "signature") setShowSignature(true);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (showNewOnly) {
      filtered = filtered.filter((p) => p.badge === "New");
    }

    if (showSignature) {
      filtered = filtered.filter((p) => p.badge === "Signature");
    }

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [activeCategory, showNewOnly, showSignature, sortBy]);

  return (
    <>
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 space-y-6 md:space-y-0"
      >
        <div className="flex flex-wrap gap-2">
          {/* Category filters */}
          {categoryFilters.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setActiveCategory(cat.slug);
                setShowNewOnly(false);
                setShowSignature(false);
              }}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-brutal rounded-full transition-all duration-300 ${
                activeCategory === cat.slug && !showNewOnly && !showSignature
                  ? "bg-white text-black"
                  : "border border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}

          {/* Divider */}
          <div className="w-[1px] h-8 bg-white/[0.06] mx-2 self-center hidden md:block" />

          {/* Special filters */}
          <button
            onClick={() => {
              setShowNewOnly(!showNewOnly);
              setShowSignature(false);
              setActiveCategory("all");
            }}
            className={`px-5 py-2.5 text-[10px] uppercase tracking-brutal rounded-full transition-all duration-300 ${
              showNewOnly
                ? "bg-gold text-black"
                : "border border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
            }`}
          >
            · New In
          </button>

          <button
            onClick={() => {
              setShowSignature(!showSignature);
              setShowNewOnly(false);
              setActiveCategory("all");
            }}
            className={`px-5 py-2.5 text-[10px] uppercase tracking-brutal rounded-full transition-all duration-300 ${
              showSignature
                ? "bg-gold text-black"
                : "border border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
            }`}
          >
            · Signature
          </button>
        </div>

        {/* Sort + Count */}
        <div className="flex items-center gap-6">
          <span className="text-[10px] uppercase tracking-brutal text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-transparent border border-white/10 text-gray-400 px-4 py-2.5 text-[10px] uppercase tracking-brutal rounded-full focus:outline-none focus:border-gold appearance-none cursor-pointer"
          >
            <option value="default" className="bg-black">Sort: Default</option>
            <option value="price-low" className="bg-black">Price: Low → High</option>
            <option value="price-high" className="bg-black">Price: High → Low</option>
          </select>
        </div>
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + String(showNewOnly) + String(showSignature) + sortBy}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <p className="text-gray-500 text-sm mb-2">No products found.</p>
          <p className="text-gray-600 text-xs">Try a different filter or check back for new drops.</p>
        </motion.div>
      )}
    </>
  );
}

export default function CollectionPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              Too Original to Blend In
            </p>
            <h1 className="font-display text-6xl md:text-8xl uppercase mb-4">
              Collection
            </h1>
            <p className="text-gray-500 text-sm max-w-md">
              Every piece carries intention. Every drop is limited. Find what speaks to you.
            </p>
          </div>
        </ScrollReveal>

        <Suspense
          fallback={
            <div className="text-center py-20">
              <div className="inline-block w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <CollectionContent />
        </Suspense>
      </div>
    </section>
  );
}
