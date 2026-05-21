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
              <a
                href="#collection"
                className="text-[11px] uppercase tracking-brutal text-gray-400 hover:text-white transition-colors duration-300"
              >
                Collection
              </a>

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
                        <a
                          key={cat}
                          href="#collection"
                          className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {cat}
                        </a>
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
                        <a
                          key={filter}
                          href="#collection"
                          className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {filter}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#about"
              className="text-[11px] uppercase tracking-brutal text-gray-400 hover:text-white transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-[11px] uppercase tracking-brutal text-gray-400 hover:text-white transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          {/* Menu Toggle */}
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
              { label: "Collection", href: "#collection" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-4xl font-display uppercase tracking-wide text-white hover:text-gold transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
