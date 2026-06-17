"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Pre-fill saved address
  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, email: user.email || "" }));
      supabase
        .from("user_addresses")
        .select("*")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setForm((prev) => ({
              ...prev,
              name: data.name || prev.name,
              phone: data.phone || prev.phone,
              address: data.address || prev.address,
              city: data.city || prev.city,
              state: data.state || prev.state,
              pincode: data.pincode || prev.pincode,
            }));
          }
        });
    }
  }, [user]);

  const [processing, setProcessing] = useState(false);

  // Require auth
  if (!user && !loading) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[500px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
              One More Step
            </p>
            <h1 className="font-display text-5xl uppercase mb-6">
              Sign In to Checkout
            </h1>
            <p className="text-gray-400 text-sm mb-10">
              Create an account or sign in to complete your order. This helps us track your order and keep you updated.
            </p>
            <MagneticButton strength={0.15}>
              <Link
                href="/account"
                className="inline-block text-[11px] uppercase tracking-brutal bg-white text-black px-10 py-4 rounded-full hover:bg-gold transition-colors duration-300"
              >
                Sign In / Create Account
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  const shipping = totalPrice >= 999 ? 0 : 49;
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Promo codes — add more as needed
  const PROMO_CODES: Record<string, { type: "percent" | "flat"; value: number }> = {
    "FIRST10": { type: "percent", value: 10 },
    "DENIED20": { type: "percent", value: 20 },
    "FLAT100": { type: "flat", value: 100 },
  };

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const promo = PROMO_CODES[code];
    if (!promo) {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
      setPromoDiscount(0);
      return;
    }
    const discount = promo.type === "percent" ? Math.round(totalPrice * promo.value / 100) : promo.value;
    setPromoDiscount(discount);
    setPromoApplied(true);
    setPromoError(null);
  };

  const finalTotal = totalPrice - promoDiscount + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    setProcessing(true);

    // Load Razorpay script
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load payment gateway. Please try again.");
      setProcessing(false);
      return;
    }

    // Create order on server
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalTotal,
        receipt: `denied_${Date.now()}`,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Failed to create order. Please try again.");
      setProcessing(false);
      return;
    }

    // Open Razorpay modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "DENIED.",
      description: "Premium Apparel",
      order_id: data.orderId,
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#c9a96e",
      },
      handler: async function (response: any) {
        // Verify payment and save order
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderDetails: {
              userId: user?.id,
              items: items.map((item) => ({
                productId: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                color: item.selectedColor,
                size: item.selectedSize,
              })),
              total: finalTotal,
              shipping,
              promoCode: promoApplied ? promoCode : null,
              promoDiscount,
              shippingName: form.name,
              shippingEmail: form.email,
              shippingPhone: form.phone,
              shippingAddress: form.address,
              shippingCity: form.city,
              shippingState: form.state,
              shippingPincode: form.pincode,
            },
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.verified) {
          clearCart();
          router.push("/order-success?id=" + response.razorpay_payment_id);
        } else {
          alert("Payment verification failed. Contact support.");
        }
      },
      modal: {
        ondismiss: function () {
          setProcessing(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  if (items.length === 0) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[600px] mx-auto text-center">
          <h1 className="font-display text-5xl uppercase mb-8">Checkout</h1>
          <p className="text-gray-500 text-sm mb-8">Your cart is empty.</p>
          <Link href="/collection" className="text-gold text-xs uppercase tracking-brutal hover:text-white transition-colors">
            ← Back to Collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-4">
            Final Step
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-12">
            Checkout
          </h1>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Shipping Form */}
          <form onSubmit={handleCheckout} id="checkout-form" className="space-y-5">
            <ScrollReveal delay={0.1}>
              <p className="text-[10px] uppercase tracking-brutal text-gray-400 mb-6">
                Shipping Details
              </p>

              <div className="space-y-4">
                <input
                  type="text" name="name" placeholder="Full Name" required
                  value={form.name} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                />
                <input
                  type="email" name="email" placeholder="Email" required
                  value={form.email} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                />
                <input
                  type="tel" name="phone" placeholder="Phone Number" required
                  value={form.phone} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                />
                <input
                  type="text" name="address" placeholder="Full Address" required
                  value={form.address} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text" name="city" placeholder="City" required
                    value={form.city} onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="text" name="state" placeholder="State" required
                    value={form.state} onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                  />
                </div>
                <input
                  type="text" name="pincode" placeholder="Pincode" required pattern="[0-9]{6}"
                  value={form.pincode} onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-gold transition-colors"
                />
              </div>
            </ScrollReveal>
          </form>

          {/* Right — Order Summary */}
          <div>
            <ScrollReveal delay={0.2}>
              <p className="text-[10px] uppercase tracking-brutal text-gray-400 mb-6">
                Order Summary
              </p>

              <div className="border border-white/[0.06] rounded-2xl p-6 bg-white/[0.02] space-y-4 mb-8">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4">
                    <div className="relative w-14 h-18 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} width={56} height={72} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{item.product.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-brutal">
                        {item.selectedColor} · {item.selectedSize} · Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-gold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8">
                {/* Promo Code */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="flex-1 bg-white/[0.03] border border-white/10 rounded-full px-5 py-3 text-white text-xs outline-none focus:border-gold transition-colors uppercase tracking-wide disabled:opacity-50"
                  />
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied || !promoCode.trim()}
                    className="text-[10px] uppercase tracking-brutal px-6 py-3 border border-white/10 rounded-full text-white hover:border-gold hover:text-gold transition-all disabled:opacity-50"
                  >
                    {promoApplied ? "Applied ✓" : "Apply"}
                  </button>
                </div>
                {promoError && <p className="text-red-400 text-xs">{promoError}</p>}
                {promoApplied && <p className="text-green-400 text-xs">Promo applied! You save ₹{promoDiscount.toLocaleString()}</p>}

                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Subtotal</span>
                  <span className="text-white text-sm">₹{totalPrice.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Discount</span>
                    <span className="text-green-400 text-sm">-₹{promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Shipping</span>
                  <span className="text-white text-sm">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/[0.06]">
                  <span className="text-white text-base font-medium">Total</span>
                  <span className="text-gold text-lg font-medium">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <MagneticButton strength={0.15} className="w-full">
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={processing}
                  className="w-full bg-white text-black text-[11px] uppercase tracking-brutal py-4 rounded-full hover:bg-gold transition-colors duration-300 disabled:opacity-50"
                >
                  {processing ? "Processing..." : `Pay ₹${finalTotal.toLocaleString()}`}
                </button>
              </MagneticButton>

              <p className="text-gray-600 text-[10px] text-center mt-4 uppercase tracking-brutal">
                Secure payment via Razorpay
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
