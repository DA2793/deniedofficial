"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping: number;
  promo_code: string | null;
  promo_discount: number;
  payment_id: string;
  order_id: string;
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  items: OrderItem[];
}

type InvoiceState = "loading" | "ready" | "signed-out" | "unauthorized" | "not-found" | "error";

export default function InvoicePage() {
  const params = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [state, setState] = useState<InvoiceState>("loading");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setOrder(null);
      setState("signed-out");
      return;
    }

    let cancelled = false;
    setState("loading");
    setOrder(null);

    supabase
      .from("orders")
      .select("*")
      .eq("id", params.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          const denied = error.code === "42501" || /permission|policy|unauthorized/i.test(error.message);
          setState(denied ? "unauthorized" : "error");
          return;
        }
        if (!data) {
          setState("not-found");
          return;
        }
        setOrder(data as Order);
        setState("ready");
      });

    return () => { cancelled = true; };
  }, [authLoading, params.id, user]);

  if (state === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (state === "signed-out") {
    const next = encodeURIComponent(`/invoice/${params.id}`);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-white px-6 text-center">
        <h1 className="text-2xl font-semibold text-black">Sign in to view this invoice</h1>
        <p className="text-sm text-gray-500">Invoices are only available to the account that placed the order.</p>
        <Link href={`/account?next=${next}`} className="px-7 py-3 bg-black text-white text-xs uppercase tracking-widest rounded-full">Sign In</Link>
      </div>
    );
  }

  if (state !== "ready" || !order) {
    const content = state === "unauthorized"
      ? { title: "Not authorized", message: "This invoice belongs to another account." }
      : state === "not-found"
        ? { title: "Invoice not found", message: "This order does not exist or is not available to your account." }
        : { title: "Unable to load invoice", message: "Please try again in a moment." };
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <h1 className="text-2xl font-semibold text-black">{content.title}</h1>
        <p className="text-sm text-gray-500">{content.message}</p>
        <Link href="/account" className="text-xs uppercase tracking-widest text-black underline underline-offset-4">Back to account</Link>
      </div>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const invoiceDate = new Date(order.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const invoiceNumber = `DEN-${new Date(order.created_at).getFullYear()}-${order.id.slice(0, 8).toUpperCase()}`;
  const paymentLabel = order.payment_id.startsWith("test_") ? "TEST ORDER" : "PAID ONLINE";

  return (
    <div className="invoice-print-page min-h-screen bg-[#e9e7e2] px-3 py-6 sm:px-6 sm:py-10">
      <article
        id="invoice"
        className="relative mx-auto min-h-[1120px] max-w-[794px] overflow-hidden border border-black/5 bg-white p-6 text-black shadow-xl sm:p-10 md:p-12"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <Image
            src="/assets/Brand Logo.png"
            alt=""
            width={420}
            height={450}
            className="w-[48%] max-w-[360px] opacity-[0.025] grayscale"
          />
        </div>

        <div className="relative z-10 flex min-h-[1010px] flex-col">
          <header className="flex items-start justify-between gap-6 border-b border-[#c9a96e]/45 pb-7">
            <div className="flex min-w-0 items-center gap-4">
              <Image
                src="/assets/Brand Logo.png"
                alt="DENIED. logo"
                width={54}
                height={58}
                className="h-12 w-12 shrink-0 object-contain grayscale"
                priority
              />
              <div>
                <h1 className="font-display text-3xl uppercase leading-none tracking-[0.08em] text-black">DENIED.</h1>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#9a7945]">Premium Apparel & Accessories</p>
                <p className="mt-1 text-[9px] text-gray-400">deniedofficial.com</p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="font-serif text-2xl uppercase tracking-[0.12em] text-[#b28c50]">Invoice</p>
              <dl className="mt-3 space-y-1 text-[9px]">
                <div className="flex justify-end gap-2"><dt className="font-semibold">Invoice No:</dt><dd>{invoiceNumber}</dd></div>
                <div className="flex justify-end gap-2"><dt className="font-semibold">Date:</dt><dd>{invoiceDate}</dd></div>
                <div className="flex max-w-[230px] justify-end gap-2"><dt className="shrink-0 font-semibold">Order ID:</dt><dd className="truncate">{order.order_id}</dd></div>
              </dl>
              <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-[8px] font-semibold uppercase tracking-wider ${paymentLabel === "TEST ORDER" ? "bg-amber-100 text-amber-800" : "bg-emerald-50 text-emerald-700"}`}>
                {paymentLabel}
              </span>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-7 py-8 sm:grid-cols-2 sm:gap-12">
            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.24em] text-gray-400">Bill To</p>
              <p className="text-sm font-semibold text-black">{order.shipping_name}</p>
              <p className="mt-1 text-[10px] leading-5 text-gray-600">{order.shipping_phone}</p>
              <p className="break-all text-[10px] leading-5 text-gray-600">{order.shipping_email}</p>
            </div>
            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.24em] text-gray-400">Ship To</p>
              <p className="text-[10px] leading-5 text-gray-700">{order.shipping_address}</p>
              <p className="text-[10px] leading-5 text-gray-700">{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
              <p className="text-[10px] leading-5 text-gray-700">India</p>
            </div>
          </section>

          <div className="invoice-desktop-items hidden overflow-x-auto sm:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-[#c9a96e]/35 bg-[#faf8f4]">
                  <th className="px-3 py-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">Item</th>
                  <th className="px-3 py-3 text-center text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">Variant</th>
                  <th className="px-3 py-3 text-center text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">Qty</th>
                  <th className="px-3 py-3 text-center text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">Price</th>
                  <th className="px-3 py-3 text-right text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={`${item.productId}-${item.color}-${item.size}-${index}`} className="border-b border-gray-100">
                    <td className="px-3 py-4 text-[11px] font-medium text-black">{item.name}</td>
                    <td className="px-3 py-4 text-center text-[10px] text-gray-500">{item.color} / {item.size}</td>
                    <td className="px-3 py-4 text-center text-[10px] text-gray-700">{item.quantity}</td>
                    <td className="px-3 py-4 text-center text-[10px] text-gray-700">₹{item.price.toLocaleString("en-IN")}</td>
                    <td className="px-3 py-4 text-right text-[11px] font-medium text-black">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="invoice-mobile-items divide-y divide-gray-100 border-y border-[#c9a96e]/35 sm:hidden">
            {order.items.map((item, index) => (
              <div key={`${item.productId}-${item.color}-${item.size}-${index}`} className="py-4">
                <div className="flex justify-between gap-4">
                  <p className="text-xs font-medium text-black">{item.name}</p>
                  <p className="whitespace-nowrap text-xs font-medium text-black">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                </div>
                <p className="mt-1 text-[10px] text-gray-500">{item.color} / {item.size} · Qty {item.quantity} · ₹{item.price.toLocaleString("en-IN")} each</p>
              </div>
            ))}
          </div>

          <section className="mt-7 flex justify-end">
            <div className="w-full sm:w-64">
              <div className="flex justify-between py-2 text-[11px]"><span className="text-gray-500">Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
              {order.promo_code && (
                <div className="flex justify-between gap-4 py-2 text-[11px]">
                  <span className="text-gray-500">Promo ({order.promo_code})</span>
                  <span className="text-emerald-600">-₹{order.promo_discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between py-2 text-[11px]"><span className="text-gray-500">Shipping</span><span>{order.shipping === 0 ? "Free" : `₹${order.shipping.toLocaleString("en-IN")}`}</span></div>
              <div className="mt-2 flex justify-between border-t border-black py-3 text-sm font-bold"><span>Total</span><span>₹{order.total.toLocaleString("en-IN")}</span></div>
            </div>
          </section>

          <footer className="mt-auto border-t border-[#c9a96e]/45 bg-[#faf8f4] px-5 py-5 text-center">
            <p className="font-serif text-sm uppercase tracking-[0.12em] text-[#b28c50]">Thank you for choosing DENIED.</p>
            <p className="mt-2 text-[8px] leading-4 text-gray-500">This is a computer-generated invoice and does not require a signature.</p>
            <p className="text-[8px] leading-4 text-gray-500">For queries, contact contact@deniedofficial.com</p>
            <p className="text-[8px] leading-4 text-gray-500">deniedofficial.com</p>
          </footer>
        </div>
      </article>

      <div className="invoice-print-actions mt-6 text-center">
        <button onClick={() => window.print()} className="rounded-full bg-black px-8 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
          Print / Download PDF
        </button>
      </div>

      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body > *:not(main) { display: none !important; }
          body > main { display: block !important; margin: 0 !important; padding: 0 !important; }
          .invoice-print-page { min-height: 0 !important; margin: 0 !important; padding: 0 !important; background: white !important; }
          #invoice {
            box-sizing: border-box !important;
            width: 210mm !important;
            min-height: 297mm !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 14mm !important;
            border: 0 !important;
            box-shadow: none !important;
          }
          #invoice > div.relative { min-height: 269mm !important; }
          .invoice-print-actions { display: none !important; }
          .invoice-desktop-items { display: block !important; overflow: visible !important; }
          .invoice-mobile-items { display: none !important; }
        }
      `}</style>
    </div>
  );
}
