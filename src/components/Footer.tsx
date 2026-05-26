"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.04] pt-24 pb-10 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-20 mb-24">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/assets/Brand Logo.png"
              alt="DENIED."
              width={120}
              height={35}
              className="h-7 w-auto mb-6"
            />
            <p className="text-gray-500 text-sm max-w-xs mb-6 leading-relaxed">
              Not for Everyone. Luxury for the Selected.
            </p>
            <a
              href="https://www.instagram.com/denied._official/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gold transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="text-xs">@denied._official</span>
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] uppercase tracking-brutal text-gray-400 mb-6">
              Shop
            </h4>
            <ul className="space-y-4">
              <li><Link href="/collection" className="text-gray-500 text-sm hover:text-white transition-colors">T-Shirts</Link></li>
              <li><Link href="/collection" className="text-gray-500 text-sm hover:text-white transition-colors">Caps</Link></li>
              <li><span className="text-gray-700 text-sm">Watches — Soon</span></li>
              <li><span className="text-gray-700 text-sm">Perfumes — Soon</span></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[10px] uppercase tracking-brutal text-gray-400 mb-6">
              Info
            </h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-500 text-sm hover:text-white transition-colors">About</Link></li>
              <li><a href="https://www.instagram.com/denied._official/" target="_blank" rel="noopener" className="text-gray-500 text-sm hover:text-white transition-colors">Instagram</a></li>
              <li><Link href="/policies" className="text-gray-500 text-sm hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/policies" className="text-gray-500 text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-brutal text-gray-700">
            &copy; 2026 DENIED. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-brutal text-gray-600">
            Handcrafted with ◆ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
