"use client";

import ScrollReveal from "@/components/ScrollReveal";

const actions = [
  { label: "Email Concierge", detail: "contact@deniedofficial.com", href: "mailto:contact@deniedofficial.com?subject=DENIED.%20Enquiry" },
  { label: "Message on Instagram", detail: "@denied._official", href: "https://www.instagram.com/denied._official/", external: true },
];

export default function ContactPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">Private Client Care</p>
          <h1 className="font-display text-6xl md:text-8xl uppercase mb-6">Contact</h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mb-16">Product questions, order support, collaborations, or anything else—reach DENIED. directly through one of our official channels.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {actions.map((action, index) => (
            <ScrollReveal key={action.label} delay={0.1 + index * 0.1}>
              <a href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noopener noreferrer" : undefined} className="group min-h-56 border border-white/10 bg-white/[0.02] rounded-2xl p-8 flex flex-col justify-between hover:border-gold/40 transition-colors">
                <span className="text-[10px] uppercase tracking-brutal text-gray-500">Official Channel 0{index + 1}</span>
                <span>
                  <span className="block font-display text-2xl uppercase text-white group-hover:text-gold transition-colors mb-3">{action.label}</span>
                  <span className="text-sm text-gray-400 break-all">{action.detail}</span>
                </span>
                <span className="self-start rounded-full border border-white/10 px-5 py-2.5 text-[10px] uppercase tracking-brutal text-white group-hover:border-gold group-hover:text-gold transition-colors">Open Channel →</span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
