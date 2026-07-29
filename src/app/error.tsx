"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="text-[10px] uppercase tracking-brutal text-gold mb-6">
        Something Went Wrong
      </p>
      <h1 className="font-display text-5xl md:text-7xl uppercase mb-6 text-white">
        A Momentary Setback
      </h1>
      <p className="text-gray-500 text-sm mb-10 max-w-sm">
        An unexpected error occurred. Your cart and account are safe — please try
        again.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="bg-white text-black text-[11px] uppercase tracking-brutal px-8 py-4 rounded-full hover:bg-gold transition-colors duration-300"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-white/10 text-white text-[11px] uppercase tracking-brutal px-8 py-4 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
