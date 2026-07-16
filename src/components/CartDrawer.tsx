"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {

        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[110]">
          <motion.button
            type="button"
            aria-label="Close shopping bag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 h-full w-full cursor-default bg-black/75 backdrop-blur-sm"
          />

          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex h-[100dvh] w-full flex-col border-l border-white/10 bg-[#090909] shadow-2xl sm:max-w-[440px]"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
              <div>
                <p className="mb-1 text-[9px] uppercase tracking-brutal text-gold">The Selected</p>
                <h2 id="cart-drawer-title" className="font-display text-3xl uppercase text-white">
                  Your Bag <span className="text-lg text-gray-500">({totalItems})</span>
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeCart}
                aria-label="Close shopping bag"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-display text-3xl uppercase text-white">Your bag is empty</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
                  The next piece that belongs to you is waiting.
                </p>
                <Link
                  href="/collection"
                  onClick={closeCart}
                  className="mt-8 rounded-full bg-white px-8 py-4 text-[10px] uppercase tracking-brutal text-black transition-colors hover:bg-gold"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-2 sm:px-7">
                  {items.map((item) => {
                    const itemImage = item.product.colorImages[item.selectedColor]?.[0] ?? item.product.image;
                    const itemKey = `${item.product.id}-${item.selectedColor}-${item.selectedSize}`;

                    return (
                      <article key={itemKey} className="flex gap-4 border-b border-white/[0.08] py-6">
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-white/[0.03]"
                        >
                          <Image
                            src={itemImage}
                            alt={item.product.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                href={`/product/${item.product.id}`}
                                onClick={closeCart}
                                className="line-clamp-2 text-sm font-medium text-white transition-colors hover:text-gold"
                              >
                                {item.product.name}
                              </Link>
                              <p className="mt-1 text-[9px] uppercase tracking-brutal text-gray-500">
                                {item.selectedColor} · {item.selectedSize}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                              aria-label={`Remove ${item.product.name} from bag`}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-white/5 hover:text-red-400"
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                            <div className="flex items-center rounded-full border border-white/10">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                                aria-label={`Decrease quantity of ${item.product.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-l-full text-gray-400 transition-colors hover:text-white"
                              >
                                −
                              </button>
                              <span className="w-7 text-center text-xs text-white" aria-live="polite">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                                aria-label={`Increase quantity of ${item.product.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-r-full text-gray-400 transition-colors hover:text-white"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-sm font-medium text-gold">
                              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <footer
                  className="shrink-0 border-t border-white/10 bg-[#0d0d0d] px-5 pt-5 sm:px-7"
                  style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-brutal text-gray-400">Subtotal</span>
                    <span className="font-display text-2xl text-white">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="mb-5 text-[10px] text-gray-600">Shipping and discounts are calculated at checkout.</p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-full bg-white py-4 text-center text-[10px] uppercase tracking-brutal text-black transition-colors hover:bg-gold"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="mt-3 block w-full rounded-full border border-white/15 py-3.5 text-center text-[10px] uppercase tracking-brutal text-white transition-colors hover:border-gold hover:text-gold"
                  >
                    View Cart
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
