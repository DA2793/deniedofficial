export interface UnavailableVariantRule {
  productIds: readonly number[];
  color: string;
  sizes: readonly string[];
}

const POLO_PRODUCT_IDS = [4] as const;
const NUMBERED_OVERSIZED_PRODUCT_IDS = [7, 9, 10, 11, 13] as const;

// Keep this list synchronized with Business/out-of-stock.xlsx.
export const UNAVAILABLE_VARIANTS: readonly UnavailableVariantRule[] = [
  { productIds: POLO_PRODUCT_IDS, color: "Navy Blue", sizes: ["XL", "XXL"] },
  { productIds: POLO_PRODUCT_IDS, color: "Maroon", sizes: ["XL"] },
  { productIds: NUMBERED_OVERSIZED_PRODUCT_IDS, color: "Bottle Green", sizes: ["XS"] },
  { productIds: NUMBERED_OVERSIZED_PRODUCT_IDS, color: "Maroon", sizes: ["M"] },
];

export function isVariantOutOfStock(productId: number, color: string, size: string): boolean {
  return UNAVAILABLE_VARIANTS.some(
    (rule) =>
      rule.productIds.includes(productId) &&
      rule.color === color &&
      rule.sizes.includes(size)
  );
}
