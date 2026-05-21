export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  image: string;
  images: string[];
  description: string;
  details: {
    fabric: string;
    fit: string;
    care: string;
    colors: string[];
    sizes: string[];
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Signature Oversized Tee",
    category: "T-Shirts",
    price: 1199,
    originalPrice: null,
    badge: "Signature",
    image: "/Products/Signature/Oversized/black_front.png",
    images: [
      "/Products/Signature/Oversized/black_front.png",
      "/Products/Signature/Oversized/black_back.png",
      "/Products/Signature/Oversized/model_1.png",
      "/Products/Signature/Oversized/model_2.png",
    ],
    description: "The DENIED. Signature Oversized Tee. Premium terry-knit texture with a hand-feel that speaks for itself.",
    details: {
      fabric: "90/10 Cotton Polyester, 260 GSM Terry-knit",
      fit: "Unisex oversized fit with drop shoulders",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black", "Navy Blue"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
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
