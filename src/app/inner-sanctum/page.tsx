"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function InnerSanctumPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[900px] mx-auto">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              Loyalty Programme
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase mb-6">
              The Inner Sanctum
            </h1>
            <p className="font-serif text-lg md:text-xl italic text-gray-300 mb-8">
              Members do not just buy from DENIED. They build it.
            </p>
            <div className="inline-block border border-gold/30 bg-gold/[0.05] rounded-full px-6 py-2">
              <span className="text-gold text-[11px] uppercase tracking-brutal">Coming Soon</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Overview */}
        <ScrollReveal delay={0.1}>
          <div className="mb-20">
            <p className="text-gray-400 text-base leading-relaxed text-center max-w-[650px] mx-auto">
              The Inner Sanctum transforms customers into brand co-creators. Unlike conventional loyalty programmes that reward repeat purchases with discounts, DENIED. gives members authorship, identity, and earnings from their creative contributions.
            </p>
          </div>
        </ScrollReveal>

        {/* Tiers */}
        <div className="space-y-6 mb-20">
          {/* Tier 1 */}
          <ScrollReveal delay={0.1}>
            <div className="border border-white/[0.06] rounded-xl p-8 bg-white/[0.02]">
              <div className="flex items-start gap-6">
                <span className="font-display text-4xl text-gold/30">01</span>
                <div>
                  <h3 className="font-display text-2xl uppercase mb-2">The Denied</h3>
                  <p className="text-gold text-[10px] uppercase tracking-brutal mb-4">Entry — 3 purchases</p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>▸ Submit original designs for review</li>
                    <li>▸ Approved designs get printed with your name</li>
                    <li>▸ Earn 5 points per ₹100 MRP on every sale of your design</li>
                    <li>▸ Points never expire</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tier 2 */}
          <ScrollReveal delay={0.2}>
            <div className="border border-white/[0.06] rounded-xl p-8 bg-white/[0.02]">
              <div className="flex items-start gap-6">
                <span className="font-display text-4xl text-gold/30">02</span>
                <div>
                  <h3 className="font-display text-2xl uppercase mb-2">The Selected</h3>
                  <p className="text-gold text-[10px] uppercase tracking-brutal mb-4">Entry — 20+ orders on your design & 10+ personal purchases</p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>▸ 10 points per ₹100 MRP earned</li>
                    <li>▸ Submit up to 3 designs simultaneously</li>
                    <li>▸ Priority 1-week review</li>
                    <li>▸ Featured on public creator leaderboard</li>
                    <li>▸ 24-hour early access to new drops</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Tier 3 */}
          <ScrollReveal delay={0.3}>
            <div className="border border-gold/20 rounded-xl p-8 bg-gold/[0.02]">
              <div className="flex items-start gap-6">
                <span className="font-display text-4xl text-gold/50">03</span>
                <div>
                  <h3 className="font-display text-2xl uppercase mb-2">The Few</h3>
                  <p className="text-gold text-[10px] uppercase tracking-brutal mb-4">Entry — 50+ orders on your design & 20+ personal purchases</p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>▸ 15 points per ₹100 MRP earned</li>
                    <li>▸ Join the design review panel</li>
                    <li>▸ DENIED. Black Card — physical, name-embossed</li>
                    <li>▸ Name on Founding Creators wall</li>
                    <li>▸ 48-hour exclusive early access</li>
                    <li>▸ Personal promo code — 5% sitewide for anyone</li>
                    <li>▸ Unlimited design submissions</li>
                    <li>▸ Annual co-design vote on limited collection</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Points System */}
        <ScrollReveal delay={0.1}>
          <div className="mb-20">
            <h2 className="font-display text-2xl uppercase mb-8 text-center">Points System</h2>
            <div className="border border-white/[0.06] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    <th className="text-left py-4 px-6 text-gold text-[10px] uppercase tracking-brutal">Tier</th>
                    <th className="text-center py-4 px-6 text-gold text-[10px] uppercase tracking-brutal">Points per ₹100</th>
                    <th className="text-center py-4 px-6 text-gold text-[10px] uppercase tracking-brutal">Effective % back</th>
                    <th className="text-right py-4 px-6 text-gold text-[10px] uppercase tracking-brutal">Redemption</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-4 px-6 text-white">The Denied</td>
                    <td className="py-4 px-6 text-center text-gray-400">5 points</td>
                    <td className="py-4 px-6 text-center text-gray-400">5%</td>
                    <td className="py-4 px-6 text-right text-gray-400">1 pt = ₹1</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-4 px-6 text-white">The Selected</td>
                    <td className="py-4 px-6 text-center text-gray-400">10 points</td>
                    <td className="py-4 px-6 text-center text-gray-400">10%</td>
                    <td className="py-4 px-6 text-right text-gray-400">1 pt = ₹1</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-white">The Few</td>
                    <td className="py-4 px-6 text-center text-gray-400">15 points</td>
                    <td className="py-4 px-6 text-center text-gray-400">15%</td>
                    <td className="py-4 px-6 text-right text-gray-400">1 pt = ₹1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-xs text-center mt-4 italic">
              Points calculated on MRP. Earned only on sales of your approved designs.
            </p>
          </div>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal delay={0.1}>
          <div className="mb-20">
            <h2 className="font-display text-2xl uppercase mb-8 text-center">How It Works</h2>
            <div className="space-y-4">
              {[
                "Purchase 3 products to unlock Tier 1 — The Denied",
                "Submit your original design or quote via the member portal",
                "Design reviewed within 2 weeks — approved or rejected with reason",
                "If approved — your design gets printed with your name",
                "Earn points on every sale of your design — redeem on purchases",
                "Hit thresholds to unlock The Selected and The Few",
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-gold text-[10px] uppercase tracking-brutal mt-1 flex-shrink-0 w-8">0{i + 1}</span>
                  <p className="text-gray-400 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.1}>
          <div className="text-center border-t border-white/[0.06] pt-12">
            <p className="font-serif text-lg italic text-gold mb-4">
              The Denied → The Selected → The Few
            </p>
            <p className="text-gray-500 text-sm mb-8">
              The Inner Sanctum launches soon. Start building your purchase count now.
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-brutal border border-white/20 px-12 py-5 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full"
            >
              Shop Collection
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
