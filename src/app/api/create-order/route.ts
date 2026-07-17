import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getRequestUser } from "@/lib/auth/server";
import { calculateOrder, CheckoutItemInput } from "@/lib/checkout";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { checkStockAvailable } from "@/lib/inventory";
import { getProductById } from "@/data/products";
import { validatePromoCode } from "@/lib/promo";

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
    const cartTotals = calculateOrder(body.items || []);
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

    const stockCheck = await checkStockAvailable(
      cartTotals.items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
    );
    if (!stockCheck.ok) {
      const product = getProductById(stockCheck.productId);
      return NextResponse.json(
        { error: `${product?.name || "This item"} is sold out` },
        { status: 400 }
      );
    }

    const admin = getSupabaseAdmin();

    let promoCode: string | null = null;
    let promoDiscount = 0;
    const rawPromoCode = body.promoCode?.trim();
    if (rawPromoCode) {
      const { count, error: countError } = await admin
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);
      if (countError) throw countError;

      const validation = await validatePromoCode(rawPromoCode, cartTotals.subtotal, (count || 0) > 0);
      if (!validation.valid) {
        return NextResponse.json({ error: validation.reason || "Invalid promo code" }, { status: 400 });
      }
      promoCode = validation.promo!.code;
      promoDiscount = validation.discount;
    }

    const total = cartTotals.subtotal - promoDiscount + cartTotals.shipping;

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) throw new Error("Payment service not configured");
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const receipt = `denied_${Date.now()}_${user.id.slice(0, 8)}`.slice(0, 40);
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt,
      notes: { user_id: user.id, promo_code: promoCode || "" },
    });

    const { error: pendingError } = await admin.from("pending_orders").insert({
      razorpay_order_id: razorpayOrder.id,
      user_id: user.id,
      items: cartTotals.items,
      subtotal: cartTotals.subtotal,
      total,
      shipping: cartTotals.shipping,
      promo_code: promoCode,
      promo_discount: promoDiscount,
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
        subtotal: cartTotals.subtotal,
        shipping: cartTotals.shipping,
        promoDiscount,
        total,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create order";
    const status = /Invalid|valid|cart|product|quantity|colour|size|pincode|email|sold out/i.test(message) ? 400 : 500;
    console.error("Create order error:", message);
    return NextResponse.json({ error: message }, { status });
  }
}
