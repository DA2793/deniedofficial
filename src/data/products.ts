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
    image: "/Products/Signature/Oversized/1.png",
    images: [
      "/Products/Signature/Oversized/1.png",
      "/Products/Signature/Oversized/2.png",
      "/Products/Signature/Oversized/3.png",
    ],
    description: "The DENIED. Signature Oversized Tee. Premium terry-knit texture with a hand-feel that speaks for itself.",
    details: {
      fabric: "90/10 Cotton Polyester, 260 GSM Terry-knit",
      fit: "Unisex oversized fit with drop shoulders – relaxed, roomy, and right on trend",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black", "Navy Blue"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
  },
  {
    id: 2,
    name: "Acid Washed Tee",
    category: "T-Shirts",
    price: 1399,
    originalPrice: null,
    badge: "New",
    image: "/Products/AcidWashed/1.png",
    images: [
      "/Products/AcidWashed/1.png",
      "/Products/AcidWashed/2.png",
      "/Products/AcidWashed/3.png",
    ],
    description: "Unique acid wash effect — each piece has subtle variations for a one-of-a-kind look. Heavyweight yet breathable with a lived-in finish.",
    details: {
      fabric: "100% Cotton, 240 GSM heavyweight with acid-washed finish",
      fit: "Unisex oversized fit – relaxed shoulders, dropped sleeves for a streetwear-ready silhouette",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Acid Wash"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
  },
  {
    id: 3,
    name: "Gear Tee",
    category: "T-Shirts",
    price: 1399,
    originalPrice: null,
    badge: null,
    image: "/Products/Gear/1.png",
    images: [
      "/Products/Gear/1.png",
      "/Products/Gear/2.png",
      "/Products/Gear/3.png",
      "/Products/Gear/4.png",
    ],
    description: "Supima cotton luxury. Soft, breathable, and designed for all-day comfort with a classic silhouette.",
    details: {
      fabric: "100% Supima Cotton, 160 GSM – luxury feel, soft and breathable",
      fit: "Unisex regular fit – classic, flattering silhouette",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
  },
  {
    id: 4,
    name: "Polo Tee",
    category: "T-Shirts",
    price: 1199,
    originalPrice: null,
    badge: null,
    image: "/Products/Polo/1.png",
    images: [
      "/Products/Polo/1.png",
      "/Products/Polo/2.png",
    ],
    description: "Textured Airtex finish with embroidered print. Structured collar and cuff — polished style for any day, any plan.",
    details: {
      fabric: "100% Cotton, 220 GSM Airtex – textured finish with embroidered print",
      fit: "Regular fit with structured collar and cuff – polished style for any occasion",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black"],
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
