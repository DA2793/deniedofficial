export interface SizeChartRow {
  size: string;
  chest: number;
  length: number;
}

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
  sizeChart: SizeChartRow[] | null;
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
    image: "/Products/Oversized/Signature/Black/1.png",
    images: [
      "/Products/Oversized/Signature/Black/1.png",
      "/Products/Oversized/Signature/Black/2.png",
      "/Products/Oversized/Signature/Black/3.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Oversized/Signature/Black/1.png",
        "/Products/Oversized/Signature/Black/2.png",
        "/Products/Oversized/Signature/Black/3.png",
      ],
      "Navy Blue": [
        "/Products/Oversized/Signature/NavyBlue/1.png",
        "/Products/Oversized/Signature/NavyBlue/2.png",
        "/Products/Oversized/Signature/NavyBlue/3.png",
      ],
    },
    sizeChart: [
      { size: "XS", chest: 39, length: 26 },
      { size: "S", chest: 41, length: 27 },
      { size: "M", chest: 43, length: 28 },
      { size: "L", chest: 45, length: 29 },
      { size: "XL", chest: 47, length: 30 },
      { size: "XXL", chest: 49, length: 31 },
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
    name: "Few Survive Acid Washed Tee",
    category: "T-Shirts",
    price: 1499,
    originalPrice: null,
    badge: "New",
    image: "/Products/AcidWashed/FewSurvive/1.png",
    images: [
      "/Products/AcidWashed/FewSurvive/1.png",
      "/Products/AcidWashed/FewSurvive/2.png",
      "/Products/AcidWashed/FewSurvive/3.png",
    ],
    colorImages: {
      "Acid Wash": [
        "/Products/AcidWashed/FewSurvive/1.png",
        "/Products/AcidWashed/FewSurvive/2.png",
        "/Products/AcidWashed/FewSurvive/3.png",
      ],
    },
    sizeChart: [
      { size: "XS", chest: 39, length: 27 },
      { size: "S", chest: 41, length: 28 },
      { size: "M", chest: 43, length: 29 },
      { size: "L", chest: 45, length: 30 },
      { size: "XL", chest: 47, length: 31 },
      { size: "XXL", chest: 49, length: 32 },
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
    name: "Drive or Ride Supima Tee",
    category: "T-Shirts",
    price: 1499,
    originalPrice: null,
    badge: null,
    image: "/Products/Supima/DriveOrRide/Black/black-1.png",
    images: [
      "/Products/Supima/DriveOrRide/Black/black-1.png",
      "/Products/Supima/DriveOrRide/Black/black-2.png",
      "/Products/Supima/DriveOrRide/Black/black-3.png",
      "/Products/Supima/DriveOrRide/Black/black-4.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Supima/DriveOrRide/Black/black-1.png",
        "/Products/Supima/DriveOrRide/Black/black-2.png",
        "/Products/Supima/DriveOrRide/Black/black-3.png",
        "/Products/Supima/DriveOrRide/Black/black-4.png",
      ],
      "Navy Blue": [
        "/Products/Supima/DriveOrRide/NavyBlue/blue-1.png",
        "/Products/Supima/DriveOrRide/NavyBlue/blue-2.png",
        "/Products/Supima/DriveOrRide/NavyBlue/blue-3.png",
        "/Products/Supima/DriveOrRide/NavyBlue/blue-4.png",
      ],
      "White": [
        "/Products/Supima/DriveOrRide/White/white-1.png",
        "/Products/Supima/DriveOrRide/White/white-2.png",
        "/Products/Supima/DriveOrRide/White/white-3.png",
        "/Products/Supima/DriveOrRide/White/white-4.png",
      ],
    },
    sizeChart: [
      { size: "XS", chest: 36, length: 25 },
      { size: "S", chest: 38, length: 26 },
      { size: "M", chest: 40, length: 27 },
      { size: "L", chest: 42, length: 28 },
      { size: "XL", chest: 44, length: 29 },
      { size: "XXL", chest: 46, length: 30 },
    ],
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
    image: "/Products/Polo/Black/polo-1.png",
    images: [
      "/Products/Polo/Black/polo-1.png",
      "/Products/Polo/Black/polo-2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Polo/Black/polo-1.png",
        "/Products/Polo/Black/polo-2.png",
      ],
      "Coffee Brown": [
        "/Products/Polo/CoffeeBrown/polo-1.png",
        "/Products/Polo/CoffeeBrown/polo-2.png",
      ],
      "Navy Blue": [
        "/Products/Polo/NavyBlue/polo-1.png",
        "/Products/Polo/NavyBlue/polo-2.png",
      ],
      "Brick Red": [
        "/Products/Polo/BrickRed/polo-1.png",
        "/Products/Polo/BrickRed/polo-2.png",
      ],
      "Maroon": [
        "/Products/Polo/Maroon/polo-1.png",
        "/Products/Polo/Maroon/polo-2.png",
      ],
      "Royal Blue": [
        "/Products/Polo/RoyalBlue/polo-1.png",
        "/Products/Polo/RoyalBlue/polo-2.png",
      ],
    },
    sizeChart: [
      { size: "S", chest: 38, length: 26 },
      { size: "M", chest: 40, length: 27 },
      { size: "L", chest: 42, length: 28 },
      { size: "XL", chest: 44, length: 29 },
      { size: "XXL", chest: 46, length: 30 },
      { size: "3XL", chest: 48, length: 31 },
    ],
    description: "Textured Airtex finish with embroidered print. Structured collar and cuff — polished style for any day, any plan.",
    details: {
      fabric: "100% Cotton, 220 GSM Airtex – textured finish with embroidered print",
      fit: "Regular fit with structured collar and cuff – polished style for any occasion",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black", "Coffee Brown", "Navy Blue", "Brick Red", "Maroon", "Royal Blue"],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    },
  },
  {
    id: 5,
    name: "Ottoman Baseball Cap",
    category: "Caps",
    price: 999,
    originalPrice: null,
    badge: null,
    image: "/Products/Cap/Ottoman/1.png",
    images: [
      "/Products/Cap/Ottoman/1.png",
      "/Products/Cap/Ottoman/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Cap/Ottoman/1.png",
        "/Products/Cap/Ottoman/2.png",
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
    price: 999,
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
  {
    id: 7,
    name: "Unique Oversized Tee",
    category: "T-Shirts",
    price: 1399,
    originalPrice: null,
    badge: "New",
    image: "/Products/Oversized/Unique/Black/1.png",
    images: [
      "/Products/Oversized/Unique/Black/1.png",
      "/Products/Oversized/Unique/Black/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Oversized/Unique/Black/1.png",
        "/Products/Oversized/Unique/Black/2.png",
      ],
      "Maroon": [
        "/Products/Oversized/Unique/Maroon/1.png",
        "/Products/Oversized/Unique/Maroon/2.png",
      ],
      "Navy Blue": [
        "/Products/Oversized/Unique/NavyBlue/1.png",
        "/Products/Oversized/Unique/NavyBlue/2.png",
      ],
    },
    sizeChart: [
      { size: "XS", chest: 39, length: 26 },
      { size: "S", chest: 41, length: 27 },
      { size: "M", chest: 43, length: 28 },
      { size: "L", chest: 45, length: 29 },
      { size: "XL", chest: 47, length: 30 },
      { size: "XXL", chest: 49, length: 31 },
    ],
    description: "The DENIED. Unique Oversized Tee. A bold statement graphic on heavyweight terry-knit, cut for an effortless oversized silhouette.",
    details: {
      fabric: "90/10 Cotton Polyester, 260 GSM Terry-knit",
      fit: "Unisex oversized fit with drop shoulders – relaxed, roomy, and right on trend",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black", "Maroon", "Navy Blue"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
  },
  {
    id: 8,
    name: "SHE IS Classic Tee",
    category: "Women",
    price: 1199,
    originalPrice: null,
    badge: "New",
    image: "/Products/Women/Classic/SheIs/Black/1.png",
    images: [
      "/Products/Women/Classic/SheIs/Black/1.png",
      "/Products/Women/Classic/SheIs/Black/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Women/Classic/SheIs/Black/1.png",
        "/Products/Women/Classic/SheIs/Black/2.png",
      ],
      "Bottle Green": [
        "/Products/Women/Classic/SheIs/BottleGreen/1.png",
        "/Products/Women/Classic/SheIs/BottleGreen/2.png",
      ],
      "Coffee Brown": [
        "/Products/Women/Classic/SheIs/CoffeeBrown/1.png",
        "/Products/Women/Classic/SheIs/CoffeeBrown/2.png",
      ],
      "Maroon": [
        "/Products/Women/Classic/SheIs/Maroon/1.png",
        "/Products/Women/Classic/SheIs/Maroon/2.png",
      ],
      "Navy Blue": [
        "/Products/Women/Classic/SheIs/NavyBlue/1.png",
        "/Products/Women/Classic/SheIs/NavyBlue/2.png",
      ],
      "Red": [
        "/Products/Women/Classic/SheIs/Red/1.png",
        "/Products/Women/Classic/SheIs/Red/2.png",
      ],
    },
    sizeChart: [
      { size: "XS", chest: 32, length: 23 },
      { size: "S", chest: 34, length: 24 },
      { size: "M", chest: 36, length: 25 },
      { size: "L", chest: 38, length: 26 },
      { size: "XL", chest: 40, length: 27 },
      { size: "XXL", chest: 42, length: 28 },
    ],
    description: "The DENIED. SHE IS Classic Tee. Soft, breathable cotton cut in a flattering everyday silhouette for effortless comfort.",
    details: {
      fabric: "Pre-shrunk 100% Cotton, 180 GSM – soft, breathable, and made to stay true to size",
      fit: "Women's regular fit – tailored for a flattering everyday silhouette without compromising comfort",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Black", "Bottle Green", "Coffee Brown", "Maroon", "Navy Blue", "Red"],
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
