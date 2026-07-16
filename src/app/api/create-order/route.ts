import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getRequestUser } from "@/lib/auth/server";
import { calculateOrder, CheckoutItemInput } from "@/lib/checkout";
import { getSupabaseAdmin } from "@/lib/supabase/server";

interface CreateOrderBody {
  items?: CheckoutItemInput[];
  promoCode?: string | null;
  shipping?: Record<string, unknown>;
}

function requiredText(value: unknown, label: string, max = 200) {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max) {
    throw new Error(`Invalid ${label}`);
  }
  return value.trim();
}

export async function POST(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

    const body = (await req.json()) as CreateOrderBody;
    const pricing = calculateOrder(body.items || [], body.promoCode);
    const shippingInput = body.shipping || {};
    const shipping = {
      name: requiredText(shippingInput.name, "name", 120),
      email: requiredText(shippingInput.email, "email", 254).toLowerCase(),
      phone: requiredText(shippingInput.phone, "phone", 30),
      address: requiredText(shippingInput.address, "address", 500),
      city: requiredText(shippingInput.city, "city", 100),
      state: requiredText(shippingInput.state, "state", 100),
      pincode: requiredText(shippingInput.pincode, "pincode", 6),
    };

    if (!/^\S+@\S+\.\S+$/.test(shipping.email) || !/^\d{6}$/.test(shipping.pincode)) {
      return NextResponse.json({ error: "Invalid email or pincode" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    if (pricing.promoCode === "FIRST10") {
      const { count, error } = await admin.from("orders").select("id", { count: "exact", head: true }).eq("user_id", user.id);
      if (error) throw error;
      if ((count || 0) > 0) return NextResponse.json({ error: "FIRST10 is only valid on your first order" }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) throw new Error("Payment service not configured");
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const receipt = `denied_${Date.now()}_${user.id.slice(0, 8)}`.slice(0, 40);
    const razorpayOrder = await razorpay.orders.create({
      amount: pricing.total * 100,
      currency: "INR",
      receipt,
      notes: { user_id: user.id, promo_code: pricing.promoCode || "" },
    });

    const { error: pendingError } = await admin.from("pending_orders").insert({
      razorpay_order_id: razorpayOrder.id,
      user_id: user.id,
      items: pricing.items,
      subtotal: pricing.subtotal,
      total: pricing.total,
      shipping: pricing.shipping,
      promo_code: pricing.promoCode,
      promo_discount: pricing.promoDiscount,
      shipping_name: shipping.name,
      shipping_email: shipping.email,
      shipping_phone: shipping.phone,
      shipping_address: shipping.address,
      shipping_city: shipping.city,
      shipping_state: shipping.state,
      shipping_pincode: shipping.pincode,
    });
    if (pendingError) throw new Error(`Unable to prepare order: ${pendingError.message}`);

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      pricing: {
        subtotal: pricing.subtotal,
        shipping: pricing.shipping,
        promoDiscount: pricing.promoDiscount,
        total: pricing.total,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create order";
    const status = /Invalid|valid|cart|product|quantity|colour|size|pincode|email/i.test(message) ? 400 : 500;
    console.error("Create order error:", message);
    return NextResponse.json({ error: message }, { status });
  }
}
