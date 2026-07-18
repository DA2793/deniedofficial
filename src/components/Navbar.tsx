"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { TIER_DESCRIPTIONS, type ProductTier, type ProductGender } from "@/data/products";

const tiers: ProductTier[] = ["The Foundation", "The Numbered"];
const genders: ProductGender[] = ["Women", "Men", "Unisex"];
const filters = ["New In", "Signature"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountHover, setAccountHover] = useState(false);
  const [wishlistHover, setWishlistHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-20 gap-3">
          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0" aria-label="DENIED. home">
            <Image
              src="/assets/Brand Logo.png"
              alt="DENIED."
              width={180}
              height={50}
              className="h-8 sm:h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {/* Collection with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/collection"
                className="relative text-[11px] uppercase tracking-brutal text-gray-400 hover:text-gold transition-colors duration-300 py-2 group"
              >
                Collection
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-3 w-[200px] glass-subtle rounded-xl py-3 overflow-hidden"
                  >
                    <Link
                      href="/collection"
                      className="block px-5 py-2.5 text-[11px] uppercase tracking-wide text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                    >
                      All Collection
                    </Link>
                    <Link
                      href="/collection?category=T-Shirts"
                      className="block px-5 py-2.5 text-[11px] uppercase tracking-wide text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                    >
                      T-Shirts
                    </Link>
                    {tiers.map((tier) => (
                      <Link
                        key={tier}
                        href={`/collection?category=T-Shirts&tier=${encodeURIComponent(tier)}`}
                        title={TIER_DESCRIPTIONS[tier]}
                        className="block pl-9 pr-5 py-2 text-[10px] uppercase tracking-wide text-gray-500 hover:text-gold hover:bg-white/[0.04] transition-all duration-200"
                      >
                        {tier}
                      </Link>
                    ))}
                    <Link
                      href="/chapter/neelkanth"
                      className="block pl-9 pr-5 py-2 text-[10px] uppercase tracking-wide text-neelkanth-light hover:text-gold hover:bg-white/[0.04] transition-all duration-200"
                    >
                      The Chapter — Neelkanth
                    </Link>
                    {genders.map((gender) => (
                      <Link
                        key={gender}
                        href={`/collection?category=T-Shirts&gender=${encodeURIComponent(gender)}`}
                        className="block pl-9 pr-5 py-2 text-[10px] uppercase tracking-wide text-gray-500 hover:text-gold hover:bg-white/[0.04] transition-all duration-200"
                      >
                        {gender}
                      </Link>
                    ))}
                    <Link
                      href="/collection?category=Caps"
                      className="block px-5 py-2.5 text-[11px] uppercase tracking-wide text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                    >
                      Caps
                    </Link>
                    <div className="border-t border-white/[0.06] my-2" />
                    {filters.slice(0, 2).map((item) => (
                      <Link
                        key={item}
                        href={`/collection?filter=${item === "New In" ? "new" : "signature"}`}
                        className="block px-5 py-2.5 text-[11px] uppercase tracking-wide text-gray-500 hover:text-gold hover:bg-white/[0.04] transition-all duration-200"
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/inner-sanctum"
              className="relative text-[11px] uppercase tracking-brutal text-gray-400 hover:text-gold transition-colors duration-300 py-2 group"
            >
              Inner Sanctum
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/about"
              className="relative text-[11px] uppercase tracking-brutal text-gray-400 hover:text-gold transition-colors duration-300 py-2 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/contact"
              className="relative text-[11px] uppercase tracking-brutal text-gray-400 hover:text-gold transition-colors duration-300 py-2 group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-3 md:gap-5 shrink-0">
            {/* Account */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setAccountHover(true)}
              onMouseLeave={() => setAccountHover(false)}
            >
              <Link href="/account" className="relative text-gray-400 hover:text-gold transition-colors p-1" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <AnimatePresence>
                {accountHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 glass-subtle rounded-lg px-4 py-2 whitespace-nowrap"
                  >
                    <span className="text-[10px] uppercase tracking-brutal text-white">Account</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <div
              className="relative"
              onMouseEnter={() => setWishlistHover(true)}
              onMouseLeave={() => setWishlistHover(false)}
            >
              <Link href="/wishlist" className="relative w-10 h-10 inline-flex items-center justify-center text-gray-400 hover:text-gold transition-colors touch-manipulation" aria-label="Wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <AnimatePresence>
                {wishlistHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 glass-subtle rounded-lg px-4 py-2 whitespace-nowrap"
                  >
                    <span className="text-[10px] uppercase tracking-brutal text-white">Wishlist</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <div
              className="relative"
              onMouseEnter={() => setCartHover(true)}
              onMouseLeave={() => setCartHover(false)}
            >
              <Link href="/cart" className="relative w-10 h-10 inline-flex items-center justify-center text-gray-400 hover:text-gold transition-colors touch-manipulation" aria-label="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <AnimatePresence>
                {cartHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 glass-subtle rounded-lg px-4 py-2 whitespace-nowrap"
                  >
                    <span className="text-[10px] uppercase tracking-brutal text-white">Cart</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Menu Toggle (mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[6px] touch-manipulation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-white block origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[1.5px] bg-white block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-white block origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 sm:gap-12 px-4 pt-20 overflow-y-auto"
          >
            {[
              { label: "Collection", href: "/collection" },
              { label: "Inner Sanctum", href: "/inner-sanctum" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Account", href: "/account" },
            ].map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-white hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
