export interface UnavailableVariantRule {
  productIds: readonly number[];
  color: string;
  sizes: readonly string[];
}

const POLO_PRODUCT_IDS = [4] as const;
const NUMBERED_OVERSIZED_PRODUCT_IDS = [7, 9, 10, 11, 13] as const;
const FOUNDATION_OVERSIZED_PRODUCT_IDS = [1, 12] as const;

export const UNAVAILABLE_VARIANTS: readonly UnavailableVariantRule[] = [
  { productIds: POLO_PRODUCT_IDS, color: "Coffee Brown", sizes: ["L"] },
  { productIds: POLO_PRODUCT_IDS, color: "Brick Red", sizes: ["M", "L", "XL"] },
  { productIds: NUMBERED_OVERSIZED_PRODUCT_IDS, color: "Bottle Green", sizes: ["S"] },
  { productIds: NUMBERED_OVERSIZED_PRODUCT_IDS, color: "Royal Blue", sizes: ["L", "XXL"] },
  { productIds: NUMBERED_OVERSIZED_PRODUCT_IDS, color: "Olive Green", sizes: ["XS", "S", "L"] },
  { productIds: FOUNDATION_OVERSIZED_PRODUCT_IDS, color: "Navy Blue", sizes: ["M"] },
];

export function isVariantOutOfStock(productId: number, color: string, size: string): boolean {
  return UNAVAILABLE_VARIANTS.some(
    (rule) =>
      rule.productIds.includes(productId) &&
      rule.color === color &&
      rule.sizes.includes(size)
  );
}
