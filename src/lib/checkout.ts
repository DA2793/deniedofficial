import { getProductById } from "@/data/products";

export interface CheckoutItemInput {
  productId: number;
  quantity: number;
  color: string;
  size: string;
}

export interface CanonicalOrderItem extends CheckoutItemInput {
  name: string;
  price: number;
}

export const PROMO_CODES: Record<
  string,
  { type: "percent" | "flat"; value: number }
> = {
  FIRST10: { type: "percent", value: 10 },
  DENIED20: { type: "percent", value: 20 },
  FLAT100: { type: "flat", value: 100 },
};

export function calculateOrder(
  inputItems: CheckoutItemInput[],
  rawPromoCode?: string | null
) {
  if (!Array.isArray(inputItems) || inputItems.length === 0 || inputItems.length > 25) {
    throw new Error("Invalid cart");
  }

  const items: CanonicalOrderItem[] = inputItems.map((item) => {
    const product = getProductById(Number(item.productId));
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("Invalid product or quantity");
    }
    if (!product.details.colors.includes(item.color)) {
      throw new Error(`Invalid colour for ${product.name}`);
    }
    if (!product.details.sizes.includes(item.size)) {
      throw new Error(`Invalid size for ${product.name}`);
    }

    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      color: item.color,
      size: item.size,
    };
  });
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 999 ? 0 : 49;
  const promoCode = rawPromoCode?.trim().toUpperCase() || null;
  const promo = promoCode ? PROMO_CODES[promoCode] : null;

  if (promoCode && !promo) {
    throw new Error("Invalid promo code");
  }

  const calculatedDiscount = promo
    ? promo.type === "percent"
      ? Math.round((subtotal * promo.value) / 100)
      : promo.value
    : 0;
  const promoDiscount = Math.min(calculatedDiscount, subtotal);
  const total = subtotal - promoDiscount + shipping;

  return {
    items,
    subtotal,
    shipping,
    promoCode,
    promoDiscount,
    total,
  };
}
