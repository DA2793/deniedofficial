"use client";

import { motion } from "framer-motion";
import SilkDriftBackdrop from "@/components/SilkDriftBackdrop";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { products, type Product } from "@/data/products";

// Curated order: the new drops lead, the guest Foundation piece closes.
const GEET_ORDER = [39, 18, 19, 20, 21, 13, 12, 8, 14, 17];

/** Geet membership: every women's product, plus unisex pieces flagged in. */
function getGeetProducts(): Product[] {
  const members = products.filter((p) => p.gender === "Women" || p.geet);
  return members.sort((a, b) => {
    const ai = GEET_ORDER.indexOf(a.id);
    const bi = GEET_ORDER.indexOf(b.id);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

/** Cards wear curated Geet imagery when specified (unisex guest pieces). */
function forGeetCard(product: Product): Product {
  if (!product.geetImages || product.geetImages.length === 0) return product;
  return { ...product, image: product.geetImages[0], images: product.geetImages };
}

export default function GeetClient() {
  const geetProducts = getGeetProducts();

  return (
    <main className="relative text-white">
      {/* Silk atmosphere behind the entire page — viewport-locked so the
          petals and sheen accompany the whole scroll, not just the hero */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <SilkDriftBackdrop />
      </div>

      {/* Hero — the silk identity */}
      <section className="relative z-10 flex min-h-[78vh] items-center justify-center overflow-hidden px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-3xl pt-24 pb-16 text-center"
        >
          <p className="mb-6 text-[10px] uppercase tracking-brutal text-[#deaa8e]">
            DENIED. presents
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] text-[#f6f1e7] sm:text-7xl md:text-8xl">
            The Geet Collection
          </h1>
          <div className="mx-auto my-8 h-px w-16 bg-[#deaa8e]/50" />
          <p className="mx-auto max-w-md font-serif text-xl italic text-[#e8cfc3] md:text-2xl">
            Designed by Her, for Her.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-gray-400">
            Crafted for the woman who needs no introduction.
          </p>
          <div className="mt-12">
            <a
              href="#collection"
              className="inline-flex rounded-full bg-[#f6f1e7] px-10 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors duration-300 hover:bg-[#deaa8e]"
            >
              Explore the Collection
            </a>
          </div>
        </motion.div>
      </section>

      {/* The collection */}
      <section id="collection" className="relative z-10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <p className="mb-3 text-[10px] uppercase tracking-brutal text-[#deaa8e]">
                Her Pieces
              </p>
              <h2 className="font-display text-4xl uppercase md:text-6xl">The Collection</h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
                Crop tops, dresses, classics, and oversized fits — every piece
                belongs to her. The collection grows. Selectively.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {geetProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              >
                <ProductCard product={forGeetCard(product)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
