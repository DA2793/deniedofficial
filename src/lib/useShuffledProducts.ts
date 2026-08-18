"use client";

import { useEffect, useState } from "react";
import { products, type Product } from "@/data/products";

/**
 * Session-stable product shuffle.
 *
 * The catalog array is append-ordered (newest last), which buries the newest
 * designs at the bottom of the collection page and the back of the carousel.
 * This hook returns the catalog in a shuffled order so every design gets a
 * fair shot at the top.
 *
 * - Runs only after mount (returns null on the server/first paint), so the
 *   statically pre-rendered HTML never mismatches during hydration.
 * - The shuffle seed is kept in sessionStorage: the order is stable while a
 *   visitor browses (navigating back from a product doesn't reorder the grid)
 *   and both the carousel and the collection page agree on the same order.
 *   A new session gets a fresh shuffle.
 */

const SEED_KEY = "denied-shuffle-seed";

/** Deterministic PRNG (mulberry32) so one seed always yields one order. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleWithSeed<T>(items: readonly T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function useShuffledProducts(): Product[] | null {
  const [shuffled, setShuffled] = useState<Product[] | null>(null);

  useEffect(() => {
    let seed = Number(sessionStorage.getItem(SEED_KEY));
    if (!Number.isFinite(seed) || seed <= 0) {
      seed = Math.floor(Math.random() * 2 ** 31) || 1;
      sessionStorage.setItem(SEED_KEY, String(seed));
    }
    setShuffled(shuffleWithSeed(products, seed));
  }, []);

  return shuffled;
}
