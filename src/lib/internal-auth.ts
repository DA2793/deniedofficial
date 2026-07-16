import crypto from "crypto";
import { NextRequest } from "next/server";

const PURPOSE = "denied-internal-email-v1";

export function getInternalApiToken() {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error("RAZORPAY_KEY_SECRET not configured");
  return crypto.createHmac("sha256", secret).update(PURPOSE).digest("hex");
}

export function isInternalRequest(request: NextRequest) {
  const supplied = request.headers.get("x-denied-internal") || "";
  const expected = getInternalApiToken();
  if (supplied.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}
