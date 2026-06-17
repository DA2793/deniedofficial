"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";

const ADMIN_EMAILS = ["da.2793@yahoo.com", "geetikatyagi75@gmail.com", "lokendras69@gmail.com"];

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping: number;
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  payment_id: string;
  order_id: string;
  promo_code: string | null;
  promo_discount: number;
  items: { productId: number; name: string; price: number; quantity: number; color: string; size: string }[];
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"orders" | "customers">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Auth check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/account");
    }
    if (!authLoading && user && !ADMIN_EMAILS.includes(user.email || "")) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // Load orders
  useEffect(() => {
    if (user && ADMIN_EMAILS.includes(user.email || "")) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data as Order[]);
    setLoadingData(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(true);
    await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    await loadOrders();
    setUpdatingStatus(false);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  if (authLoading || !user || !ADMIN_EMAILS.includes(user.email || "")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    placed: "bg-yellow-900/30 text-yellow-400",
    confirmed: "bg-blue-900/30 text-blue-400",
    printing: "bg-purple-900/30 text-purple-400",
    shipped: "bg-cyan-900/30 text-cyan-400",
    delivered: "bg-green-900/30 text-green-400",
    cancelled: "bg-red-900/30 text-red-400",
  };

  const orderStats = {
    total: orders.length,
    placed: orders.filter((o) => o.status === "placed").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    printing: orders.filter((o) => o.status === "printing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-[10px] uppercase tracking-brutal text-gold mb-2">Admin</p>
          <h1 className="font-display text-4xl md:text-5xl uppercase">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-2">Manage orders and track fulfillment</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-10">
          {[
            { label: "Total", value: orderStats.total, color: "text-white" },
            { label: "Placed", value: orderStats.placed, color: "text-yellow-400" },
            { label: "Confirmed", value: orderStats.confirmed, color: "text-blue-400" },
            { label: "Printing", value: orderStats.printing, color: "text-purple-400" },
            { label: "Shipped", value: orderStats.shipped, color: "text-cyan-400" },
            { label: "Delivered", value: orderStats.delivered, color: "text-green-400" },
          ].map((stat) => (
            <div key={stat.label} className="border border-white/[0.06] rounded-xl p-4 text-center bg-white/[0.02]">
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-500 text-[9px] uppercase tracking-brutal mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2.5 text-[10px] uppercase tracking-brutal rounded-full transition-all ${
              activeTab === "orders" ? "bg-white text-black" : "border border-white/10 text-gray-400"
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Orders */}
        {activeTab === "orders" && (
          <div>
            {loadingData ? (
              <div className="text-center py-12">
                <div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : orders.length === 0 ? (
              <div className="border border-white/[0.06] rounded-xl p-12 text-center bg-white/[0.02]">
                <p className="text-gray-500">No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border border-white/[0.06] rounded-xl p-6 bg-white/[0.02] cursor-pointer hover:border-gold/20 transition-colors"
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="text-white font-medium">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {order.shipping_name} · {order.shipping_phone}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-gold font-display font-bold text-lg">
                          ₹{order.total?.toLocaleString("en-IN")}
                        </p>
                        <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-brutal font-medium ${statusColors[order.status] || statusColors.placed}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedOrder?.id === order.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 pt-6 border-t border-white/[0.06]"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Items */}
                          <div>
                            <h4 className="text-white text-xs uppercase tracking-brutal mb-3">Items</h4>
                            {order.items?.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm text-gray-400 mb-2">
                                <span>{item.name} · {item.color} · {item.size} × {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                              </div>
                            ))}
                            {order.promo_code && (
                              <p className="text-green-400 text-xs mt-2">Promo: {order.promo_code} (-₹{order.promo_discount})</p>
                            )}
                          </div>

                          {/* Shipping */}
                          <div>
                            <h4 className="text-white text-xs uppercase tracking-brutal mb-3">Shipping To</h4>
                            <div className="text-sm text-gray-400 space-y-1">
                              <p>{order.shipping_name}</p>
                              <p>{order.shipping_phone}</p>
                              <p>{order.shipping_email}</p>
                              <p>{order.shipping_address}</p>
                              <p>{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
                            </div>
                            <p className="text-gray-600 text-xs mt-3">Payment: {order.payment_id}</p>
                          </div>
                        </div>

                        {/* Status Update */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          <a
                            href={`/invoice/${order.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-2 text-[10px] uppercase tracking-brutal rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-all"
                          >
                            View Invoice
                          </a>
                          {["placed", "confirmed", "printing", "shipped", "delivered", "cancelled"].map((status) => (
                            <button
                              key={status}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateOrderStatus(order.id, status);
                              }}
                              disabled={updatingStatus || order.status === status}
                              className={`px-4 py-2 text-[10px] uppercase tracking-brutal rounded-full transition-all ${
                                order.status === status
                                  ? "bg-gold text-black"
                                  : "border border-white/10 text-gray-400 hover:border-gold hover:text-gold"
                              } disabled:opacity-50`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
