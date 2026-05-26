"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function PoliciesPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Transparency First
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-6">
            Shipping & Payment Policy
          </h1>
          <p className="text-gray-500 text-sm mb-20 max-w-lg">
            Every DENIED. piece is crafted exclusively for you. Here&apos;s everything you need to know about how we create, ship, and handle your orders.
          </p>
        </ScrollReveal>

        {/* Made to Order */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <div className="border border-gold/20 bg-gold/[0.03] p-8 mb-8">
              <h3 className="font-display text-xl uppercase mb-4 text-gold">Made to Order — Crafted for You</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Every DENIED. piece is printed and crafted only after you place your order. We do not hold ready stock. Your order is created exclusively for you — making every piece truly one-of-one.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Once your order is placed, it goes through our curation process: printing, quality check, premium packaging, and dispatch. This is not fast fashion — it&apos;s intentional luxury.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Shipping */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h2 className="font-display text-3xl uppercase mb-8">Shipping Across India</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Every order is packed with care in our signature premium packaging. We partner with trusted logistics providers to ensure secure and timely delivery across India.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              At present, we do not offer international shipping.
            </p>

            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">Delivery Timelines</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Printing & Curation</span>
                <span className="text-sm text-gray-400">2–4 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Premium Packaging & Dispatch</span>
                <span className="text-sm text-gray-400">1–2 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Delivery (Metro Cities)</span>
                <span className="text-sm text-gray-400">3–5 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Delivery (Other Cities)</span>
                <span className="text-sm text-gray-400">5–8 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white font-medium">Total Estimated Time</span>
                <span className="text-sm text-gold">7–14 business days</span>
              </div>
            </div>

            <ul className="space-y-2 text-gray-500 text-xs">
              <li>• Business days exclude Sundays and public holidays.</li>
              <li>• Orders placed after 3 PM may be processed on the next business day.</li>
              <li>• During festive periods or high demand, deliveries may take slightly longer.</li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Shipping Charges */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">Shipping Charges</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Below ₹999</span>
                <span className="text-sm text-gray-400">₹49</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">₹999 & Above</span>
                <span className="text-sm text-gold">Free Shipping</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Express Shipping</span>
                <span className="text-sm text-gray-400">₹99 (additional)</span>
              </div>
            </div>
            <ul className="space-y-2 text-gray-500 text-xs">
              <li>• Free shipping applies automatically at checkout.</li>
              <li>• Express shipping is available for select pincodes and prepaid orders only.</li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Address */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">Address & Delivery Attempts</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Customers are responsible for providing accurate name, mobile number, shipping address, and pincode. Once shipped, address modifications will not be possible.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Courier partners generally make 2–3 delivery attempts. Undelivered orders will be returned, and the order will be considered cancelled.
            </p>
          </div>
        </ScrollReveal>

        {/* Payment */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h2 className="font-display text-3xl uppercase mb-8">Payment Policy</h2>
            
            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">Accepted Payment Methods</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {["Credit Cards", "Debit Cards", "UPI (GPay, PhonePe, Paytm)", "Wallets", "Cash on Delivery"].map((method) => (
                <div key={method} className="border border-white/[0.06] px-4 py-3 text-xs text-gray-300">
                  {method}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mb-8">
              All payments are processed securely through Razorpay. We do not store card details or banking credentials.
            </p>

            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">Cash on Delivery (COD)</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              COD is available only on select options with a flat handling fee of ₹99. Available on eligible serviceable pincodes.
            </p>
            <p className="text-gray-500 text-xs">
              DENIED. reserves the right to disable COD for specific users, locations, or orders at its discretion.
            </p>
          </div>
        </ScrollReveal>

        {/* Cancellation & Refund */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h2 className="font-display text-3xl uppercase mb-8">Cancellation & Refund Policy</h2>

            <div className="border border-gold/20 bg-gold/[0.03] p-8 mb-8">
              <h3 className="font-display text-lg uppercase mb-4 text-gold">Important — Please Read</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Since every DENIED. piece is printed and curated exclusively for you after your order is placed, cancellations are only possible before your order enters the <strong className="text-white">Printing</strong> stage.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                We give you time to think. Your order stays in &quot;Placed&quot; and &quot;Confirmed&quot; status before we begin printing — use this window to double-check your colour, size, and details.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Once your order status changes to <strong className="text-white">&quot;Printing&quot;</strong>, your piece is being crafted — cancellation is no longer possible and no refund or exchange will be issued. Please select your colour and size carefully.
              </p>
            </div>

            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">Order Stages</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Order Placed</span>
                <span className="text-sm text-green-400">Cancellation allowed</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Confirmed</span>
                <span className="text-sm text-green-400">Cancellation allowed</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Printing</span>
                <span className="text-sm text-red-400">No cancellation / No refund</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Quality Check & Packaging</span>
                <span className="text-sm text-red-400">No cancellation / No refund</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Shipped</span>
                <span className="text-sm text-red-400">No cancellation / No refund</span>
              </div>
            </div>

            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">To Request Cancellation</h3>
            <ul className="space-y-2 text-gray-400 text-sm mb-8">
              <li>• Contact us immediately at <a href="mailto:hello@deniedofficial.com" className="text-white hover:text-gold transition-colors">hello@deniedofficial.com</a></li>
              <li>• Include your Order ID and reason for cancellation</li>
              <li>• Cancellation requests are processed within 24 hours</li>
            </ul>

            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">No Returns or Exchanges</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Due to the made-to-order nature of our products, we do not accept returns, exchanges, or replacements once the order has been delivered. All sales are final after the Printing stage begins.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              We encourage customers to review product details, images, size charts, and descriptions carefully before placing an order. Select your colour and size with care — once printed, your piece cannot be returned or exchanged.
            </p>
          </div>
        </ScrollReveal>

        {/* Refund Timelines */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">Refund Timelines (If Eligible)</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">UPI (GPay, PhonePe, etc.)</span>
                <span className="text-sm text-gray-400">1–3 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Debit Card</span>
                <span className="text-sm text-gray-400">5–7 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Credit Card</span>
                <span className="text-sm text-gray-400">7–10 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/[0.06]">
                <span className="text-sm text-white">Wallets</span>
                <span className="text-sm text-gray-400">1–3 business days</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs">
              Refunds are credited back to the original payment source. Timelines may vary depending on your bank.
            </p>
          </div>
        </ScrollReveal>

        {/* Order Tracking */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h2 className="font-display text-3xl uppercase mb-8">Order Tracking</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Once your order is dispatched, you will receive a shipping confirmation with a live tracking link via email.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              If you do not receive tracking details within 48 hours of your order entering the &quot;Shipped&quot; stage, please contact our support team.
            </p>
          </div>
        </ScrollReveal>

        {/* Packaging */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h2 className="font-display text-3xl uppercase mb-8">Packaging</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Every DENIED. order is hand-packed in premium packaging designed to match the quality of what&apos;s inside. This isn&apos;t a poly bag and a sticker — it&apos;s an experience.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Premium branded packaging</li>
              <li>• Protective garment wrapping</li>
              <li>• Tamper-resistant outer packaging</li>
              <li>• Curated unboxing experience</li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Payment Security */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h2 className="font-display text-3xl uppercase mb-8">Payment Security</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              All transactions are processed through secure PCI-DSS compliant payment gateways powered by Razorpay. We do not store card details, CVV information, or banking credentials.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              If payment is deducted but the order is not confirmed, the amount is generally auto-refunded within 5–7 business days. If delayed, contact us with your Transaction ID and payment screenshot.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              DENIED. reserves the right to hold suspicious transactions for verification or cancel orders flagged as high-risk. In such cases, the full amount will be refunded.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h3 className="text-[10px] uppercase tracking-brutal text-gold mb-6">Pricing</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              All prices displayed on the website are inclusive of all charges unless stated otherwise. Shipping fees or COD charges, where applicable, will be clearly displayed during checkout.
            </p>
          </div>
        </ScrollReveal>

        {/* Footer note */}
        <ScrollReveal delay={0.1}>
          <div className="border-t border-white/[0.06] pt-8">
            <p className="text-gray-600 text-xs">
              DENIED. reserves the right to modify these policies at any time without prior notice.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
