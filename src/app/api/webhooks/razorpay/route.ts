import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { finalizePaidOrder } from "@/lib/orders/finalize";

export const dynamic = "force-dynamic";

function signaturesMatch(expected: string, supplied: string) {
  if (expected.length !== supplied.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(supplied));
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET not configured");
    const rawBody = await request.text();
    const supplied = request.headers.get("x-razorpay-signature") || "";
    const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    if (!signaturesMatch(expected, supplied)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    if (event.event !== "payment.captured" && event.event !== "order.paid") {
      return NextResponse.json({ received: true, ignored: true });
    }
    const payment = event.payload?.payment?.entity;
    if (!payment?.id || !payment?.order_id) {
      return NextResponse.json({ error: "Payment entity missing" }, { status: 400 });
    }

    const result = await finalizePaidOrder({
      razorpayOrderId: String(payment.order_id),
      paymentId: String(payment.id),
      amountPaise: Number(payment.amount),
      currency: String(payment.currency || ""),
      origin: request.nextUrl.origin,
    });
    return NextResponse.json({ received: true, alreadyProcessed: result.alreadyProcessed });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    console.error("Razorpay webhook error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
