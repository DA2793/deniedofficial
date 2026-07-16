"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color: string, size: string) => void;
  removeFromCart: (productId: number, color: string, size: string) => void;
  updateQuantity: (productId: number, color: string, size: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("denied-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("denied-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, color: string, size: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedColor: color, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number, color: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: number, color: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
