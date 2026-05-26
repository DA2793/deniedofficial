"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = ["T-Shirts", "Caps"];
const filters = ["New In", "Best Sellers", "All Collection"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image
              src="/assets/Brand Logo.png"
              alt="DENIED."
              width={180}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {/* Collection with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/collection"
                className="text-[11px] uppercase tracking-brutal text-gray-400 hover:text-white transition-colors duration-300"
              >
                Collection
              </Link>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-4 w-[280px] bg-black border border-white/[0.06] p-6"
                  >
                    {/* Categories */}
                    <p className="text-[9px] uppercase tracking-brutal text-gold mb-4">
                      Products
                    </p>
                    <div className="space-y-3 mb-6">
                      {categories.map((cat) => (
                        <Link
                          key={cat}
                          href="/collection"
                          className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/[0.06] my-4" />

                    {/* Filters */}
                    <p className="text-[9px] uppercase tracking-brutal text-gold mb-4">
                      Browse
                    </p>
                    <div className="space-y-3">
                      {filters.map((filter) => (
                        <Link
                          key={filter}
                          href="/collection"
                          className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {filter}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className="text-[11px] uppercase tracking-brutal text-gray-400 hover:text-white transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[11px] uppercase tracking-brutal text-gray-400 hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative text-gray-400 hover:text-white transition-colors" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative text-gray-400 hover:text-white transition-colors" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </Link>

            {/* Profile */}
            <Link href="/account" className="relative text-gray-400 hover:text-white transition-colors" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Menu Toggle (mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center gap-[6px]"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                className="w-full h-[1.5px] bg-white block origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-[1.5px] bg-white block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                className="w-full h-[1.5px] bg-white block origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-12"
          >
            {[
              { label: "Collection", href: "/collection" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
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
                  className="text-4xl font-display uppercase tracking-wide text-white hover:text-gold transition-colors"
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
