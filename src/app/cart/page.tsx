"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[900px] mx-auto">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Your Order
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-12">
            Cart
          </h1>
        </ScrollReveal>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm mb-8">Your cart is empty.</p>
            <MagneticButton strength={0.2}>
              <Link
                href="/collection"
                className="inline-block text-[11px] uppercase tracking-brutal border border-white/20 px-10 py-4 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                Explore Collection
              </Link>
            </MagneticButton>
          </div>
        ) : (
          <div>
            {/* Cart Items */}
            <div className="space-y-6 mb-12">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-5 p-5 border border-white/[0.06] rounded-xl bg-white/[0.02]"
                >
                  {/* Image */}
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-sm text-white font-medium mb-1">{item.product.name}</h3>
                    <p className="text-[10px] uppercase tracking-brutal text-gray-500 mb-2">
                      {item.selectedColor} · {item.selectedSize}
                    </p>
                    <p className="text-gold text-sm">₹{item.product.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                        className="w-7 h-7 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors text-xs"
                      >
                        −
                      </button>
                      <span className="text-sm text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                        className="w-7 h-7 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-white/[0.06] pt-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm">Items</span>
                <span className="text-white text-sm">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm">Shipping</span>
                <span className="text-white text-sm">{totalPrice >= 999 ? "Free" : "₹49"}</span>
              </div>
              <div className="flex justify-between items-center mb-8 pt-4 border-t border-white/[0.06]">
                <span className="text-white text-base font-medium">Total</span>
                <span className="text-gold text-lg font-medium">
                  ₹{(totalPrice + (totalPrice >= 999 ? 0 : 49)).toLocaleString()}
                </span>
              </div>

              <MagneticButton strength={0.15} className="w-full">
                <Link
                  href="/checkout"
                  className="block w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 rounded-full hover:bg-gold transition-colors duration-300 text-center"
                >
                  Proceed to Checkout
                </Link>
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
