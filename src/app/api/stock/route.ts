import { NextRequest, NextResponse } from "next/server";
import { getStockForProducts } from "@/lib/inventory";

export const dynamic = "force-dynamic";

// Public, read-only stock lookup so product pages can show "X left" or
// "Sold out" for capped (Numbered) designs. Products without a product_stock
// row are untracked (Foundation, Caps) and simply won't appear in the result.
export async function GET(req: NextRequest) {
  try {
    const idsParam = req.nextUrl.searchParams.get("ids") || "";
    const productIds = idsParam
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => Number.isInteger(id) && id > 0);

    if (productIds.length === 0) {
      return NextResponse.json({ stock: [] });
    }

    const stock = await getStockForProducts(productIds);
    return NextResponse.json({
      stock: stock.map((row) => ({
        productId: row.product_id,
        remaining: Math.max(0, row.unit_cap - row.units_sold),
        unitCap: row.unit_cap,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stock lookup failed";
    console.error("Stock lookup error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
