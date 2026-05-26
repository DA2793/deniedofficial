"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.04] pt-20 pb-8 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/assets/Brand Logo.png"
              alt="DENIED."
              width={120}
              height={35}
              className="h-7 w-auto mb-6"
            />
            <p className="text-gray-600 text-sm max-w-xs">
              Not for Everyone. Luxury for the Selected.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] uppercase tracking-brutal text-gray-400 mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              <li><Link href="/collection" className="text-gray-600 text-sm hover:text-white transition-colors">T-Shirts</Link></li>
              <li><Link href="/collection" className="text-gray-600 text-sm hover:text-white transition-colors">Caps</Link></li>
              <li><span className="text-gray-800 text-sm">Watches — Soon</span></li>
              <li><span className="text-gray-800 text-sm">Perfumes — Soon</span></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-brutal text-gray-400 mb-6">
              Info
            </h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-600 text-sm hover:text-white transition-colors">About</Link></li>
              <li><a href="https://www.instagram.com/denied._official/" target="_blank" rel="noopener" className="text-gray-600 text-sm hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-brutal text-gray-700">
            &copy; 2026 DENIED. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-brutal text-gray-700">
            deniedofficial.com
          </p>
        </div>
      </div>
    </footer>
  );
}
