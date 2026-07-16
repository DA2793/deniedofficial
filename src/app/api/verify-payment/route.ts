import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { getRequestUser } from "@/lib/auth/server";
import { finalizePaidOrder, loadPendingOrder } from "@/lib/orders/finalize";

function safeSignatureMatch(expected: string, supplied: unknown) {
  if (typeof supplied !== "string" || expected.length !== supplied.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(supplied));
}

export async function POST(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

    const body = await req.json();
    const orderId = String(body.razorpay_order_id || "");
    const paymentId = String(body.razorpay_payment_id || "");
    const signature = body.razorpay_signature;
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ error: "Incomplete payment response" }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) throw new Error("Payment service not configured");

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
    if (!safeSignatureMatch(expectedSignature, signature)) {
      return NextResponse.json({ verified: false, error: "Payment verification failed" }, { status: 400 });
    }

    const pending = await loadPendingOrder(orderId);
    if (!pending || pending.user_id !== user.id) {
      return NextResponse.json({ error: "Order ownership mismatch" }, { status: 403 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const [razorpayOrder, payment] = await Promise.all([
      razorpay.orders.fetch(orderId),
      razorpay.payments.fetch(paymentId),
    ]);

    const paymentEntity = payment as any;
    const orderEntity = razorpayOrder as any;
    const expectedAmount = pending.total * 100;
    const orderUserId = String(orderEntity.notes?.user_id || "");
    const validRemotePayment =
      String(paymentEntity.order_id || "") === orderId &&
      Number(paymentEntity.amount) === expectedAmount &&
      String(paymentEntity.currency || "").toUpperCase() === "INR" &&
      paymentEntity.status === "captured" &&
      Number(orderEntity.amount) === expectedAmount &&
      String(orderEntity.currency || "").toUpperCase() === "INR" &&
      orderUserId === user.id;

    if (!validRemotePayment) {
      return NextResponse.json({ verified: false, error: "Payment details could not be verified" }, { status: 400 });
    }

    const result = await finalizePaidOrder({
      razorpayOrderId: orderId,
      paymentId,
      amountPaise: Number(paymentEntity.amount),
      currency: String(paymentEntity.currency),
      origin: req.nextUrl.origin,
      expectedUserId: user.id,
    });

    return NextResponse.json({
      verified: true,
      paymentId,
      orderId: result.order.id,
      alreadyProcessed: result.alreadyProcessed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment verification failed";
    console.error("Verify payment error:", message);
    return NextResponse.json({ verified: false, error: message }, { status: 500 });
  }
}
