"use client";

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
  const invoiceDate = new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-white py-5 sm:py-8 px-3 sm:px-4 print:py-0 print:px-0">
      <div className="max-w-[800px] mx-auto bg-white p-4 sm:p-8 md:p-10 print:p-8" id="invoice">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 mb-8 sm:mb-10 border-b border-gray-200 pb-6 sm:pb-8">
          <div>
            <h1 className="text-3xl font-bold text-black tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>DENIED.</h1>
            <p className="text-gray-500 text-xs mt-1">Premium Apparel & Accessories</p>
            <p className="text-gray-400 text-xs mt-0.5">deniedofficial.com</p>
          </div>
          <div className="sm:text-right">
            <h2 className="text-lg font-semibold text-black uppercase tracking-wider">Invoice</h2>
            <p className="text-gray-500 text-xs mt-2">#{order.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-gray-500 text-xs">{invoiceDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8 mb-8 sm:mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Bill To</p>
            <p className="text-sm text-black font-medium">{order.shipping_name}</p>
            <p className="text-xs text-gray-600 mt-1">{order.shipping_phone}</p>
            <p className="text-xs text-gray-600 break-all">{order.shipping_email}</p>
            <p className="text-xs text-gray-600 mt-2">{order.shipping_address}</p>
            <p className="text-xs text-gray-600">{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
          </div>
          <div className="sm:text-right min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Payment Details</p>
            <p className="text-xs text-gray-600 break-all">Payment ID: {order.payment_id}</p>
            <p className="text-xs text-gray-600 break-all">Order ID: {order.order_id.slice(0, 20)}</p>
            <p className="text-xs text-gray-600 mt-2">Status: <span className="font-medium text-black capitalize">{order.status}</span></p>
          </div>
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full mb-8">
            <thead><tr className="border-b border-gray-200"><th className="text-left py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Item</th><th className="text-center py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Variant</th><th className="text-center py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Qty</th><th className="text-center py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Price</th><th className="text-right py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Total</th></tr></thead>
            <tbody>{order.items.map((item, index) => <tr key={`${item.productId}-${item.color}-${item.size}-${index}`} className="border-b border-gray-100"><td className="py-3 text-sm text-black">{item.name}</td><td className="py-3 text-xs text-gray-500 text-center">{item.color} / {item.size}</td><td className="py-3 text-sm text-gray-700 text-center">{item.quantity}</td><td className="py-3 text-sm text-gray-700 text-center">₹{item.price.toLocaleString("en-IN")}</td><td className="py-3 text-sm text-black text-right">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td></tr>)}</tbody>
          </table>
        </div>

        <div className="sm:hidden mb-8 divide-y divide-gray-100 border-y border-gray-200">
          {order.items.map((item, index) => (
            <div key={`${item.productId}-${item.color}-${item.size}-${index}`} className="py-4">
              <div className="flex justify-between gap-4"><p className="text-sm font-medium text-black">{item.name}</p><p className="text-sm text-black whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p></div>
              <p className="mt-1 text-xs text-gray-500">{item.color} / {item.size} · Qty {item.quantity} · ₹{item.price.toLocaleString("en-IN")} each</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="w-full sm:w-64">
            <div className="flex justify-between py-2 text-sm"><span className="text-gray-500">Subtotal</span><span className="text-black">₹{subtotal.toLocaleString("en-IN")}</span></div>
            {order.promo_code && <div className="flex justify-between gap-4 py-2 text-sm"><span className="text-gray-500">Discount ({order.promo_code})</span><span className="text-green-600">-₹{order.promo_discount.toLocaleString("en-IN")}</span></div>}
            <div className="flex justify-between py-2 text-sm"><span className="text-gray-500">Shipping</span><span className="text-black">{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span></div>
            <div className="flex justify-between py-3 text-base font-semibold border-t border-gray-200 mt-2"><span className="text-black">Total</span><span className="text-black">₹{order.total.toLocaleString("en-IN")}</span></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs">Thank you for your order.</p>
          <p className="text-gray-300 text-[10px] mt-1 uppercase tracking-widest">DENIED. — Not for Everyone. Luxury for the Selected.</p>
        </div>
        <div className="mt-8 text-center print:hidden"><button onClick={() => window.print()} className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest rounded-full hover:bg-gray-800">Print / Download PDF</button></div>
      </div>
      <style jsx global>{`@media print { body { background: white !important; color: black !important; } nav, footer, .grain, .print\\:hidden { display: none !important; } }`}</style>
    </div>
  );
}
