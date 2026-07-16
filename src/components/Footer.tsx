"use client";

import Image from "next/image";
import Link from "next/link";

const linkClass = "text-gray-500 text-sm hover:text-white transition-colors";
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.04] pt-24 pb-10 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-20 mb-24">
          <div className="md:col-span-2">
            <Image src="/assets/Brand Logo.png" alt="DENIED." width={120} height={35} className="h-7 w-auto mb-6" />
            <p className="text-gray-500 text-sm max-w-xs mb-6 leading-relaxed">Not for Everyone. Luxury for the Selected.</p>
            <div className="flex flex-col items-start gap-3">
              <a href="https://www.instagram.com/denied._official/" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram · @denied._official</a>
              <a href="mailto:contact@deniedofficial.com" className={linkClass}>contact@deniedofficial.com</a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-brutal text-gray-400 mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/collection?category=T-Shirts" className={linkClass}>T-Shirts</Link></li>
              <li><Link href="/collection?category=Women" className={linkClass}>Women</Link></li>
              <li><Link href="/collection?category=Caps" className={linkClass}>Caps</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-brutal text-gray-400 mb-6">Info</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className={linkClass}>About</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              <li><Link href="/policies" className={linkClass}>Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-brutal text-gray-700">&copy; 2026 DENIED. All rights reserved.</p><p className="text-[10px] uppercase tracking-brutal text-gray-600">Designed in India</p>
        </div>
      </div>
    </footer>
  );
}
