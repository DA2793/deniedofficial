export interface UnavailableVariantRule {
  productIds: readonly number[];
  color: string;
  sizes: readonly string[];
}

const POLO_PRODUCT_IDS = [4] as const;

// Keep this list synchronized with Business/out-of-stock.xlsx.
export const UNAVAILABLE_VARIANTS: readonly UnavailableVariantRule[] = [
  { productIds: POLO_PRODUCT_IDS, color: "Grey", sizes: ["M"] },
  { productIds: POLO_PRODUCT_IDS, color: "Petrol Blue", sizes: ["L", "XL"] },
];

export function isVariantOutOfStock(productId: number, color: string, size: string): boolean {
  return UNAVAILABLE_VARIANTS.some(
    (rule) =>
      rule.productIds.includes(productId) &&
      rule.color === color &&
      rule.sizes.includes(size)
  );
}
