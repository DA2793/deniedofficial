import { NextRequest, NextResponse } from "next/server";
import { getRequestUser } from "@/lib/auth/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { validatePromoCode } from "@/lib/promo";

// Client-side preview only — lets the checkout page show the discount before
// submitting the order. create-order re-validates independently server-side,
// so this endpoint being called with a stale/manipulated subtotal can't
// actually apply an unearned discount to a real order.
export async function POST(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

    const body = await req.json();
    const code = typeof body.code === "string" ? body.code.trim() : "";
    const subtotal = Number(body.subtotal);
    if (!code || !Number.isFinite(subtotal) || subtotal < 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    const { count, error: countError } = await admin
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);
    if (countError) throw countError;

    const validation = await validatePromoCode(code, subtotal, (count || 0) > 0);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.reason || "Invalid promo code" }, { status: 400 });
    }

    return NextResponse.json({ valid: true, discount: validation.discount, code: validation.promo!.code });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to validate promo code";
    console.error("Validate promo error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
