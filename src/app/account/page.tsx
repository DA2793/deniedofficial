"use client";

import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

export default function AccountPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[600px] mx-auto text-center">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Your Account
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-6">
            Sign In
          </h1>
          <p className="text-gray-500 text-sm mb-12">
            Create an account or sign in to track orders, save your wishlist, and get early access to drops.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-4 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent border border-white/10 px-5 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-gold transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border border-white/10 px-5 py-4 text-sm text-white placeholder:text-gray-600 outline-none focus:border-gold transition-colors"
            />

            <MagneticButton strength={0.15} className="w-full">
              <button className="w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 hover:bg-gold transition-colors duration-300">
                Sign In
              </button>
            </MagneticButton>

            <div className="border-t border-white/[0.06] my-6" />

            <MagneticButton strength={0.15} className="w-full">
              <button className="w-full border border-white/10 text-white text-[11px] uppercase tracking-brutal py-4 hover:border-gold hover:text-gold transition-all duration-300">
                Create Account
              </button>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-gray-600 text-xs mt-8">
            Supabase authentication coming soon.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
