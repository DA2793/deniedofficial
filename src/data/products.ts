export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  image: string;
  images: string[];
  colorImages: Record<string, string[]>;
  sizeChart: string | null;
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
    image: "/Products/Signature/Oversized/Black/sig over-1.png",
    images: [
      "/Products/Signature/Oversized/Black/sig over-1.png",
      "/Products/Signature/Oversized/Black/sig over-2.png",
      "/Products/Signature/Oversized/Black/sig over-3.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Signature/Oversized/Black/sig over-1.png",
        "/Products/Signature/Oversized/Black/sig over-2.png",
        "/Products/Signature/Oversized/Black/sig over-3.png",
      ],
      "Navy Blue": [
        "/Products/Signature/Oversized/NavyBlue/sig over-1.png",
        "/Products/Signature/Oversized/NavyBlue/sig over-2.png",
        "/Products/Signature/Oversized/NavyBlue/sig over-3.png",
      ],
    },
    sizeChart: "/Products/Signature/Oversized/size-chart.jpg",
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
    image: "/Products/AcidWashed/Black/acid-1.png",
    images: [
      "/Products/AcidWashed/Black/acid-1.png",
      "/Products/AcidWashed/Black/acid-2.png",
      "/Products/AcidWashed/Black/acid-3.png",
    ],
    colorImages: {
      "Black": [
        "/Products/AcidWashed/Black/acid-1.png",
        "/Products/AcidWashed/Black/acid-2.png",
        "/Products/AcidWashed/Black/acid-3.png",
      ],
    },
    sizeChart: "/Products/AcidWashed/size-chart.jpg",
    description: "Unique acid wash effect — each piece has subtle variations for a one-of-a-kind look. Heavyweight yet breathable with a lived-in finish.",
    details: {
      fabric: "100% Cotton, 240 GSM heavyweight with acid-washed finish",
      fit: "Unisex oversized fit – relaxed shoulders, dropped sleeves for a streetwear-ready silhouette",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black"],
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
    image: "/Products/Gear/Black/gear-1.png",
    images: [
      "/Products/Gear/Black/gear-1.png",
      "/Products/Gear/Black/gear-2.png",
      "/Products/Gear/Black/gear-3.png",
      "/Products/Gear/Black/gear-4.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Gear/Black/gear-1.png",
        "/Products/Gear/Black/gear-2.png",
        "/Products/Gear/Black/gear-3.png",
        "/Products/Gear/Black/gear-4.png",
      ],
      "Navy Blue": [
        "/Products/Gear/NavyBlue/gear-1.png",
        "/Products/Gear/NavyBlue/gear-2.png",
        "/Products/Gear/NavyBlue/gear-3.png",
        "/Products/Gear/NavyBlue/gear-4.png",
      ],
      "White": [
        "/Products/Gear/White/gear-1.png",
        "/Products/Gear/White/gear-2.png",
        "/Products/Gear/White/gear-3.png",
        "/Products/Gear/White/gear-4.png",
      ],
    },
    sizeChart: "/Products/Gear/size-chart.jpg",
    description: "Supima cotton luxury. Soft, breathable, and designed for all-day comfort with a classic silhouette.",
    details: {
      fabric: "100% Supima Cotton, 160 GSM – luxury feel, soft and breathable",
      fit: "Unisex regular fit – classic, flattering silhouette",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black", "Navy Blue", "White"],
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
    image: "/Products/Polo/CoffeeBrown/polo-1.png",
    images: [
      "/Products/Polo/CoffeeBrown/polo-1.png",
      "/Products/Polo/CoffeeBrown/polo-2.png",
    ],
    colorImages: {
      "Coffee Brown": [
        "/Products/Polo/CoffeeBrown/polo-1.png",
        "/Products/Polo/CoffeeBrown/polo-2.png",
      ],
    },
    sizeChart: "/Products/Polo/size-chart.jpg",
    description: "Textured Airtex finish with embroidered print. Structured collar and cuff — polished style for any day, any plan.",
    details: {
      fabric: "100% Cotton, 220 GSM Airtex – textured finish with embroidered print",
      fit: "Regular fit with structured collar and cuff – polished style for any occasion",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Coffee Brown"],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    },
  },
  {
    id: 5,
    name: "Ottoman Baseball Cap",
    category: "Caps",
    price: 599,
    originalPrice: null,
    badge: null,
    image: "/Products/Cap/Ottoman/Black/1.png",
    images: [
      "/Products/Cap/Ottoman/Black/1.png",
      "/Products/Cap/Ottoman/Black/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Cap/Ottoman/Black/1.png",
        "/Products/Cap/Ottoman/Black/2.png",
      ],
    },
    sizeChart: null,
    description: "6-panel mid-profile cap with a classic athletic shape. Crafted from durable Ottoman fabric for a premium feel.",
    details: {
      fabric: "Ottoman fabric – durable and premium",
      fit: "Adjustable Velcro strap ensures a custom fit",
      care: "Spot clean with damp cloth. Air dry only.",
      colors: ["Black"],
      sizes: ["One Size"],
    },
  },
  {
    id: 6,
    name: "Snapback Cap",
    category: "Caps",
    price: 599,
    originalPrice: null,
    badge: "New",
    image: "/Products/Cap/Snapback/Black/1.png",
    images: [
      "/Products/Cap/Snapback/Black/1.png",
      "/Products/Cap/Snapback/Black/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Cap/Snapback/Black/1.png",
        "/Products/Cap/Snapback/Black/2.png",
      ],
      "Red": [
        "/Products/Cap/Snapback/Red/1.png",
        "/Products/Cap/Snapback/Red/2.png",
      ],
    },
    sizeChart: null,
    description: "6-panel design with a flat visor for a sleek, urban look. Classic plastic snapback closure for the perfect fit.",
    details: {
      fabric: "100% Cotton – comfortable and breathable",
      fit: "Unisex fit with snapback closure, perfect for all head sizes",
      care: "Spot clean with damp cloth. Air dry only.",
      colors: ["Black", "Red"],
      sizes: ["One Size"],
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
