"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[600px] mx-auto text-center">
        <ScrollReveal>
          <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Order Confirmed
          </p>
          <h1 className="font-display text-5xl md:text-6xl uppercase mb-6">
            Thank You<span className="text-gold">.</span>
          </h1>
          <p className="text-gray-300 text-base mb-4">
            You&apos;re now one of the Selected.
          </p>
          <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
            Your order has been placed and your piece is now being crafted exclusively for you. We&apos;ll send you a confirmation email with tracking details once it ships.
          </p>

          {paymentId && (
            <p className="text-gray-600 text-xs mb-12">
              Payment ID: {paymentId}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton strength={0.15}>
              <Link
                href="/collection"
                className="inline-block text-[11px] uppercase tracking-brutal border border-white/20 px-10 py-4 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                Continue Shopping
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" /></div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
