import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json({ verified: false, error: "Payment verification failed" }, { status: 400 });
    }

    // Save order to Supabase
    const { error: orderError } = await getSupabaseAdmin().from("orders").insert({
      user_id: orderDetails.userId,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      status: "placed",
      items: orderDetails.items,
      total: orderDetails.total,
      shipping: orderDetails.shipping,
      promo_code: orderDetails.promoCode || null,
      promo_discount: orderDetails.promoDiscount || 0,
      shipping_name: orderDetails.shippingName,
      shipping_email: orderDetails.shippingEmail,
      shipping_phone: orderDetails.shippingPhone,
      shipping_address: orderDetails.shippingAddress,
      shipping_city: orderDetails.shippingCity,
      shipping_state: orderDetails.shippingState,
      shipping_pincode: orderDetails.shippingPincode,
    });

    if (orderError) {
      console.error("Order save error:", orderError);
    }

    // Save/update user address for next time
    const { error: addressError } = await getSupabaseAdmin().from("user_addresses").upsert({
      user_id: orderDetails.userId,
      name: orderDetails.shippingName,
      phone: orderDetails.shippingPhone,
      address: orderDetails.shippingAddress,
      city: orderDetails.shippingCity,
      state: orderDetails.shippingState,
      pincode: orderDetails.shippingPincode,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

    if (addressError) {
      console.error("Address save error:", addressError);
    }

    return NextResponse.json({ verified: true, paymentId: razorpay_payment_id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
