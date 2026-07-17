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

/**
 * Validates cart items and computes subtotal/shipping. Promo code validation
 * is handled separately (see src/lib/promo.ts) since it requires an async
 * Supabase lookup and the caller's order history — this function stays
 * synchronous and DB-free so it can be reused anywhere cart math is needed.
 */
export function calculateOrder(inputItems: CheckoutItemInput[]) {
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

  return { items, subtotal, shipping };
}
