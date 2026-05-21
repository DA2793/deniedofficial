export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  image: string | null;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Signature Tee",
    category: "T-Shirts",
    price: 1599,
    originalPrice: null,
    badge: "Signature",
    image: null, // Add image path when ready: "/Products/Signature/front.jpg"
  },
];

// Helper functions
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge);
}
