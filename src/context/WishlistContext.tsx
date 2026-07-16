"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, getProductById } from "@/data/products";

interface WishlistContextType {
  items: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number) => void;
  wishlistProducts: Product[];
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  toggleWishlist: () => {},
  wishlistProducts: [],
  totalItems: 0,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<number[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("denied-wishlist");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("denied-wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (productId: number) => {
    setItems((prev) => prev.includes(productId) ? prev : [...prev, productId]);
  };

  const removeFromWishlist = (productId: number) => {
    setItems((prev) => prev.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: number) => items.includes(productId);

  const toggleWishlist = (productId: number) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const wishlistProducts = items
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);

  const totalItems = items.length;

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, wishlistProducts, totalItems }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
