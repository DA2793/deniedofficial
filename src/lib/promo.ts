import { getSupabaseAdmin } from "@/lib/supabase/server";

export interface PromoRow {
  code: string;
  /**
   * percentage — value% off the subtotal
   * flat       — flat ₹value off the subtotal
   * price_to   — every item priced above ₹value drops to ₹value
   *              (e.g. FLAT999: 1,499 tee → 999, 1,799 tee → 999)
   */
  type: "percentage" | "flat" | "price_to";
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

/** Minimal item shape needed for per-item promo math (price_to). */
export interface PromoCartItem {
  price: number;
  quantity: number;
}

/**
 * Looks up a promo code and validates it against order-independent rules
 * (active, not expired, not exhausted, min order). The first-time-only check
 * needs the requesting user's order history, so it's passed in rather than
 * queried here — keeps this function reusable for both server-side
 * validation (create-order) and any future admin/preview tooling.
 *
 * `items` is required for price_to codes (per-item math); percentage/flat
 * codes only need the subtotal.
 */
export async function validatePromoCode(
  rawCode: string,
  subtotal: number,
  hasPriorOrders: boolean,
  items: PromoCartItem[] = []
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

  let rawDiscount: number;
  if (promo.type === "percentage") {
    rawDiscount = Math.round((subtotal * promo.value) / 100);
  } else if (promo.type === "price_to") {
    // Each unit priced above ₹value is reduced to ₹value.
    if (items.length === 0) {
      return { valid: false, reason: "Unable to apply this promo code", discount: 0 };
    }
    rawDiscount = items.reduce(
      (sum, item) => sum + Math.max(0, item.price - promo.value) * item.quantity,
      0
    );
    if (rawDiscount === 0) {
      return {
        valid: false,
        reason: `${promo.code} only applies to items priced above ₹${promo.value.toLocaleString("en-IN")}`,
        discount: 0,
      };
    }
  } else {
    rawDiscount = promo.value;
  }
  const cappedDiscount = promo.max_discount ? Math.min(rawDiscount, promo.max_discount) : rawDiscount;
  const discount = Math.min(cappedDiscount, subtotal);

  return { valid: true, discount, promo };
}

/** Records a redemption. Called only after a paid order is durably saved. */
export async function recordPromoUsage(code: string) {
  const { error } = await getSupabaseAdmin().rpc("increment_promo_usage", { p_code: code });
  if (error) console.error(`Failed to record promo usage for ${code}:`, error.message);
}
