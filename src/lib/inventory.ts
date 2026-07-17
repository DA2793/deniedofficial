import { getSupabaseAdmin } from "@/lib/supabase/server";

export interface StockRow {
  product_id: number;
  unit_cap: number;
  units_sold: number;
}

/**
 * Returns stock rows for the given product IDs. Products without a
 * product_stock row are not tracked (e.g. The Foundation, Caps) and are
 * simply absent from the result — callers should treat missing rows as
 * "unlimited" stock.
 */
export async function getStockForProducts(productIds: number[]): Promise<StockRow[]> {
  if (productIds.length === 0) return [];
  const { data, error } = await getSupabaseAdmin()
    .from("product_stock")
    .select("product_id, unit_cap, units_sold")
    .in("product_id", productIds);

  if (error) throw new Error(`Stock lookup failed: ${error.message}`);
  return data as StockRow[];
}

/**
 * Checks whether the requested quantities can be fulfilled right now, without
 * reserving anything. Used at checkout-creation time to fail fast with a
 * friendly "sold out" message before a customer pays. This is a point-in-time
 * check only — the authoritative, race-safe check happens at reservation time.
 */
export async function checkStockAvailable(
  items: Array<{ productId: number; quantity: number }>
): Promise<{ ok: true } | { ok: false; productId: number }> {
  const productIds = items.map((i) => i.productId);
  const stockRows = await getStockForProducts(productIds);
  const stockByProduct = new Map(stockRows.map((row) => [row.product_id, row]));

  for (const item of items) {
    const stock = stockByProduct.get(item.productId);
    if (!stock) continue; // Not a tracked (capped) product — unlimited.
    const remaining = stock.unit_cap - stock.units_sold;
    if (item.quantity > remaining) {
      return { ok: false, productId: item.productId };
    }
  }
  return { ok: true };
}

/**
 * Atomically reserves stock for each item via the reserve_product_stock
 * Postgres function, which performs the increment-and-cap-check in a single
 * UPDATE — safe under concurrent checkouts. Products with no product_stock
 * row are untracked (unlimited) and are skipped entirely, since the SQL
 * function has no row to match and would otherwise report a false failure.
 * Returns the list of productIds that failed to reserve (should be empty in
 * normal operation since checkStockAvailable already screened the order
 * before payment; a non-empty result here means two payments landed on the
 * last unit(s) at the same time and needs manual reconciliation).
 */
export async function reserveStockForItems(
  items: Array<{ productId: number; quantity: number }>
): Promise<number[]> {
  const admin = getSupabaseAdmin();
  const productIds = items.map((i) => i.productId);
  const trackedIds = new Set((await getStockForProducts(productIds)).map((row) => row.product_id));
  const failed: number[] = [];

  for (const item of items) {
    if (!trackedIds.has(item.productId)) continue; // Untracked — unlimited stock.

    const { data, error } = await admin.rpc("reserve_product_stock", {
      p_product_id: item.productId,
      p_qty: item.quantity,
    });
    if (error) {
      console.error(`Stock reservation error for product ${item.productId}:`, error.message);
      failed.push(item.productId);
      continue;
    }
    if (data === false) {
      failed.push(item.productId);
    }
  }

  return failed;
}
