import { getSupabaseAdmin } from "@/lib/supabase/server";

export interface PromoRow {
  code: string;
  type: "percentage" | "flat";
  value: number;
  min_order: number;
  max_discount: number | null;
  first_time_only: boolean;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  active: boolean;
}

export interface PromoValidationResult {
  valid: boolean;
  reason?: string;
  discount: number;
  promo?: PromoRow;
}

/**
 * Looks up a promo code and validates it against order-independent rules
 * (active, not expired, not exhausted, min order). The first-time-only check
 * needs the requesting user's order history, so it's passed in rather than
 * queried here — keeps this function reusable for both server-side
 * validation (create-order) and any future admin/preview tooling.
 */
export async function validatePromoCode(
  rawCode: string,
  subtotal: number,
  hasPriorOrders: boolean
): Promise<PromoValidationResult> {
  const code = rawCode.trim().toUpperCase();
  const { data, error } = await getSupabaseAdmin()
    .from("promo_codes")
    .select("*")
    .eq("code", code)
    .eq("active", true)
    .maybeSingle();

  if (error) throw new Error(`Promo lookup failed: ${error.message}`);
  if (!data) return { valid: false, reason: "Invalid promo code", discount: 0 };

  const promo = data as PromoRow;

  if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
    return { valid: false, reason: "This promo code has expired", discount: 0 };
  }
  if (promo.max_uses !== null && promo.used_count >= promo.max_uses) {
    return { valid: false, reason: "This promo code has been fully redeemed", discount: 0 };
  }
  if (promo.first_time_only && hasPriorOrders) {
    return { valid: false, reason: `${promo.code} is only valid on your first order`, discount: 0 };
  }
  if (subtotal < promo.min_order) {
    return {
      valid: false,
      reason: `Minimum order of ₹${promo.min_order.toLocaleString("en-IN")} required for ${promo.code}`,
      discount: 0,
    };
  }

  const rawDiscount =
    promo.type === "percentage" ? Math.round((subtotal * promo.value) / 100) : promo.value;
  const cappedDiscount = promo.max_discount ? Math.min(rawDiscount, promo.max_discount) : rawDiscount;
  const discount = Math.min(cappedDiscount, subtotal);

  return { valid: true, discount, promo };
}

/** Records a redemption. Called only after a paid order is durably saved. */
export async function recordPromoUsage(code: string) {
  const { error } = await getSupabaseAdmin().rpc("increment_promo_usage", { p_code: code });
  if (error) console.error(`Failed to record promo usage for ${code}:`, error.message);
}
