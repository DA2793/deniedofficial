export interface UnavailableVariantRule {
  productIds: readonly number[];
  color: string;
  sizes: readonly string[];
}

const POLO_PRODUCT_IDS = [4] as const;
const ACID_WASHED_PRODUCT_IDS = [2] as const;
const MOODY_FLOATY_PRODUCT_IDS = [12] as const;
const NUMBERED_OVERSIZED_PRODUCT_IDS = [7, 9, 10, 11, 13] as const;

// Keep this list synchronized with Business/out-of-stock.xlsx.
// Workbook label mappings: Acid Washed "Black" -> "Acid Wash"; Foundation
// Oversized rows are Moody Floaty, whose "White" is the "Off White" shade.
export const UNAVAILABLE_VARIANTS: readonly UnavailableVariantRule[] = [
  { productIds: POLO_PRODUCT_IDS, color: "Black", sizes: ["3XL"] },
  { productIds: POLO_PRODUCT_IDS, color: "Coffee Brown", sizes: ["L"] },
  { productIds: ACID_WASHED_PRODUCT_IDS, color: "Acid Wash", sizes: ["S", "M"] },
  { productIds: NUMBERED_OVERSIZED_PRODUCT_IDS, color: "Maroon", sizes: ["M"] },
  { productIds: NUMBERED_OVERSIZED_PRODUCT_IDS, color: "Olive Green", sizes: ["XS", "S", "L"] },
  { productIds: MOODY_FLOATY_PRODUCT_IDS, color: "Light Baby Pink", sizes: ["M"] },
  { productIds: MOODY_FLOATY_PRODUCT_IDS, color: "Lavender", sizes: ["M"] },
  { productIds: MOODY_FLOATY_PRODUCT_IDS, color: "Off White", sizes: ["M", "XL"] },
];

export function isVariantOutOfStock(productId: number, color: string, size: string): boolean {
  return UNAVAILABLE_VARIANTS.some(
    (rule) =>
      rule.productIds.includes(productId) &&
      rule.color === color &&
      rule.sizes.includes(size)
  );
}
