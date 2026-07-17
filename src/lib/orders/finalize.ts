import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getInternalApiToken } from "@/lib/internal-auth";
import { reserveStockForItems } from "@/lib/inventory";
import { recordPromoUsage } from "@/lib/promo";

interface PendingOrder {
  id: string;
  razorpay_order_id: string;
  user_id: string;
  items: Array<{
    productId: number;
    name: string;
    price: number;
    quantity: number;
    color: string;
    size: string;
  }>;
  total: number;
  shipping: number;
  promo_code: string | null;
  promo_discount: number;
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
}

interface FinalizeInput {
  razorpayOrderId: string;
  paymentId: string;
  amountPaise: number;
  currency: string;
  origin: string;
  expectedUserId?: string;
}

export async function loadPendingOrder(razorpayOrderId: string) {
  const { data, error } = await getSupabaseAdmin()
    .from("pending_orders")
    .select("*")
    .eq("razorpay_order_id", razorpayOrderId)
    .maybeSingle();

  if (error) throw new Error(`Pending order lookup failed: ${error.message}`);
  return data as PendingOrder | null;
}

export async function finalizePaidOrder(input: FinalizeInput) {
  const admin = getSupabaseAdmin();
  const { data: existing, error: existingError } = await admin
    .from("orders")
    .select("id, payment_id, order_id")
    .or(`payment_id.eq.${input.paymentId},order_id.eq.${input.razorpayOrderId}`)
    .maybeSingle();

  if (existingError) throw new Error(`Order lookup failed: ${existingError.message}`);
  if (existing) return { order: existing, alreadyProcessed: true };

  const pending = await loadPendingOrder(input.razorpayOrderId);
  if (!pending) throw new Error("Pending order not found");
  if (input.expectedUserId && pending.user_id !== input.expectedUserId) {
    throw new Error("Order ownership mismatch");
  }
  if (input.currency.toUpperCase() !== "INR") throw new Error("Invalid currency");
  if (input.amountPaise !== pending.total * 100) throw new Error("Payment amount mismatch");

  const { data: order, error: insertError } = await admin
    .from("orders")
    .insert({
      user_id: pending.user_id,
      payment_id: input.paymentId,
      order_id: input.razorpayOrderId,
      status: "placed",
      items: pending.items,
      total: pending.total,
      shipping: pending.shipping,
      promo_code: pending.promo_code,
      promo_discount: pending.promo_discount,
      shipping_name: pending.shipping_name,
      shipping_email: pending.shipping_email,
      shipping_phone: pending.shipping_phone,
      shipping_address: pending.shipping_address,
      shipping_city: pending.shipping_city,
      shipping_state: pending.shipping_state,
      shipping_pincode: pending.shipping_pincode,
    })
    .select("*")
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      const { data: duplicate } = await admin
        .from("orders")
        .select("*")
        .or(`payment_id.eq.${input.paymentId},order_id.eq.${input.razorpayOrderId}`)
        .maybeSingle();
      if (duplicate) return { order: duplicate, alreadyProcessed: true };
    }
    throw new Error(`Order persistence failed: ${insertError.message}`);
  }

  const { error: addressError } = await admin.from("user_addresses").upsert({
    user_id: pending.user_id,
    name: pending.shipping_name,
    phone: pending.shipping_phone,
    address: pending.shipping_address,
    city: pending.shipping_city,
    state: pending.shipping_state,
    pincode: pending.shipping_pincode,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
  if (addressError) console.error("Address save error:", addressError);

  await admin.from("pending_orders").update({
    processed_at: new Date().toISOString(),
    order_record_id: order.id,
  }).eq("id", pending.id);

  // Reserve stock now that payment is confirmed and the order is durably saved.
  // This is the authoritative, race-safe check — checkStockAvailable at
  // create-order time was only a fail-fast screen before payment. If a design
  // sold out between screening and payment (two concurrent buyers on the last
  // unit), the order still stands since the customer already paid; this is
  // logged for manual reconciliation rather than silently overselling.
  const failedReservations = await reserveStockForItems(
    pending.items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
  );
  if (failedReservations.length > 0) {
    console.error(
      `Order ${order.id} oversold stock for product(s): ${failedReservations.join(", ")}`
    );
  }

  if (pending.promo_code) {
    await recordPromoUsage(pending.promo_code);
  }

  const internalToken = getInternalApiToken();
  const invoiceUrl = `${input.origin}/invoice/${order.id}`;
  const customerResponse = await fetch(`${input.origin}/api/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-denied-internal": internalToken,
    },
    body: JSON.stringify({
      type: "order-confirmation",
      data: {
        orderId: input.razorpayOrderId,
        paymentId: input.paymentId,
        name: pending.shipping_name,
        email: pending.shipping_email,
        items: pending.items,
        total: pending.total,
        shipping: pending.shipping,
        promoCode: pending.promo_code,
        promoDiscount: pending.promo_discount,
        invoiceUrl,
      },
    }),
  });
  if (!customerResponse.ok) {
    console.error("Customer email failed:", await customerResponse.text());
  }

  const adminResponse = await fetch(`${input.origin}/api/admin-notification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-denied-internal": internalToken,
    },
    body: JSON.stringify({ order }),
  });
  if (!adminResponse.ok) {
    console.error("Admin notification failed:", await adminResponse.text());
  }

  return { order, alreadyProcessed: false };
}
