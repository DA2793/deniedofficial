"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

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
  items: { productId: number; name: string; price: number; quantity: number; color: string; size: string }[];
}

export default function InvoicePage() {
  const params = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      supabase
        .from("orders")
        .select("*")
        .eq("id", params.id)
        .single()
        .then(({ data }) => {
          if (data) setOrder(data as Order);
          setLoading(false);
        });
    }
  }, [user, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Order not found.</p>
      </div>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const invoiceDate = new Date(order.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white py-8 px-4 print:py-0 print:px-0">
      <div className="max-w-[800px] mx-auto bg-white p-10 print:p-8" id="invoice">
        {/* Header */}
        <div className="flex justify-between items-start mb-10 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-black tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>DENIED.</h1>
            <p className="text-gray-500 text-xs mt-1">Premium Apparel & Accessories</p>
            <p className="text-gray-400 text-xs mt-0.5">deniedofficial.com</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-black uppercase tracking-wider">Invoice</h2>
            <p className="text-gray-500 text-xs mt-2">#{order.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-gray-500 text-xs">{invoiceDate}</p>
          </div>
        </div>

        {/* Bill To + Payment Info */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Bill To</p>
            <p className="text-sm text-black font-medium">{order.shipping_name}</p>
            <p className="text-xs text-gray-600 mt-1">{order.shipping_phone}</p>
            <p className="text-xs text-gray-600">{order.shipping_email}</p>
            <p className="text-xs text-gray-600 mt-2">{order.shipping_address}</p>
            <p className="text-xs text-gray-600">{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Payment Details</p>
            <p className="text-xs text-gray-600">Payment ID: {order.payment_id}</p>
            <p className="text-xs text-gray-600">Order ID: {order.order_id.slice(0, 20)}</p>
            <p className="text-xs text-gray-600 mt-2">Status: <span className="font-medium text-black capitalize">{order.status}</span></p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Item</th>
              <th className="text-center py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Variant</th>
              <th className="text-center py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Qty</th>
              <th className="text-center py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Price</th>
              <th className="text-right py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-3 text-sm text-black">{item.name}</td>
                <td className="py-3 text-xs text-gray-500 text-center">{item.color} / {item.size}</td>
                <td className="py-3 text-sm text-gray-700 text-center">{item.quantity}</td>
                <td className="py-3 text-sm text-gray-700 text-center">₹{item.price.toLocaleString("en-IN")}</td>
                <td className="py-3 text-sm text-black text-right">₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-black">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {order.promo_code && (
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-500">Discount ({order.promo_code})</span>
                <span className="text-green-600">-₹{order.promo_discount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="text-black">{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span>
            </div>
            <div className="flex justify-between py-3 text-base font-semibold border-t border-gray-200 mt-2">
              <span className="text-black">Total</span>
              <span className="text-black">₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-xs">Thank you for your order.</p>
          <p className="text-gray-300 text-[10px] mt-1 uppercase tracking-widest">DENIED. — Not for Everyone. Luxury for the Selected.</p>
        </div>

        {/* Print Button */}
        <div className="mt-8 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors"
          >
            Print / Download PDF
          </button>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          nav, footer, .grain, .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
