export interface SizeChartRow {
  size: string;
  chest: number;
  length: number;
}

export type ProductTier = "The Foundation" | "The Numbered" | "The Chapter";

export const TIER_DESCRIPTIONS: Record<ProductTier, string> = {
  "The Foundation": "Always in stock. The core styles DENIED. never lets go of.",
  "The Numbered": "Capped drops. Once a design sells out, it's gone for good.",
  "The Chapter": "Seasonal collections, born and retired with the occasion.",
};

export type ProductGender = "Men" | "Women" | "Unisex";

export interface Product {
  id: number;
  name: string;
  category: string;
  tier: ProductTier | null;
  unitCap: number | null;
  gender: ProductGender;
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
    tier: "The Foundation",
    unitCap: null,
    gender: "Unisex",
    price: 1199,
    originalPrice: null,
    badge: "Signature",
    image: "/Products/TShirts/TheFoundation/SignatureOversized/Black/1.png",
    images: [
      "/Products/TShirts/TheFoundation/SignatureOversized/Black/1.png",
      "/Products/TShirts/TheFoundation/SignatureOversized/Black/2.png",
      "/Products/TShirts/TheFoundation/SignatureOversized/Black/3.png",
    ],
    colorImages: {
      "Black": [
        "/Products/TShirts/TheFoundation/SignatureOversized/Black/1.png",
        "/Products/TShirts/TheFoundation/SignatureOversized/Black/2.png",
        "/Products/TShirts/TheFoundation/SignatureOversized/Black/3.png",
      ],
      "Navy Blue": [
        "/Products/TShirts/TheFoundation/SignatureOversized/NavyBlue/1.png",
        "/Products/TShirts/TheFoundation/SignatureOversized/NavyBlue/2.png",
        "/Products/TShirts/TheFoundation/SignatureOversized/NavyBlue/3.png",
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
    tier: "The Numbered",
    unitCap: 100,
    gender: "Unisex",
    price: 1499,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheNumbered/AcidWashed/1.png",
    images: [
      "/Products/TShirts/TheNumbered/AcidWashed/1.png",
      "/Products/TShirts/TheNumbered/AcidWashed/2.png",
      "/Products/TShirts/TheNumbered/AcidWashed/3.png",
    ],
    colorImages: {
      "Acid Wash": [
        "/Products/TShirts/TheNumbered/AcidWashed/1.png",
        "/Products/TShirts/TheNumbered/AcidWashed/2.png",
        "/Products/TShirts/TheNumbered/AcidWashed/3.png",
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
    tier: "The Numbered",
    unitCap: 100,
    gender: "Unisex",
    price: 1499,
    originalPrice: null,
    badge: null,
    image: "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-1.png",
    images: [
      "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-1.png",
      "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-2.png",
      "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-3.png",
      "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-4.png",
    ],
    colorImages: {
      "Black": [
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-1.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-2.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-3.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/Black/black-4.png",
      ],
      "Navy Blue": [
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/NavyBlue/blue-1.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/NavyBlue/blue-2.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/NavyBlue/blue-3.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/NavyBlue/blue-4.png",
      ],
      "White": [
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/White/white-1.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/White/white-2.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/White/white-3.png",
        "/Products/TShirts/TheNumbered/DriveOrRideSupima/White/white-4.png",
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
    tier: "The Foundation",
    unitCap: null,
    gender: "Unisex",
    price: 1199,
    originalPrice: null,
    badge: null,
    image: "/Products/TShirts/TheFoundation/Polo/Black/polo-1.png",
    images: [
      "/Products/TShirts/TheFoundation/Polo/Black/polo-1.png",
      "/Products/TShirts/TheFoundation/Polo/Black/polo-2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/TShirts/TheFoundation/Polo/Black/polo-1.png",
        "/Products/TShirts/TheFoundation/Polo/Black/polo-2.png",
      ],
      "Coffee Brown": [
        "/Products/TShirts/TheFoundation/Polo/CoffeeBrown/polo-1.png",
        "/Products/TShirts/TheFoundation/Polo/CoffeeBrown/polo-2.png",
      ],
      "Navy Blue": [
        "/Products/TShirts/TheFoundation/Polo/NavyBlue/polo-1.png",
        "/Products/TShirts/TheFoundation/Polo/NavyBlue/polo-2.png",
      ],
      "Brick Red": [
        "/Products/TShirts/TheFoundation/Polo/BrickRed/polo-1.png",
        "/Products/TShirts/TheFoundation/Polo/BrickRed/polo-2.png",
      ],
      "Maroon": [
        "/Products/TShirts/TheFoundation/Polo/Maroon/polo-1.png",
        "/Products/TShirts/TheFoundation/Polo/Maroon/polo-2.png",
      ],
      "Royal Blue": [
        "/Products/TShirts/TheFoundation/Polo/RoyalBlue/polo-1.png",
        "/Products/TShirts/TheFoundation/Polo/RoyalBlue/polo-2.png",
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
    tier: null,
    unitCap: null,
    gender: "Unisex",
    price: 799,
    originalPrice: null,
    badge: null,
    image: "/Products/Caps/Ottoman/1.png",
    images: [
      "/Products/Caps/Ottoman/1.png",
      "/Products/Caps/Ottoman/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Caps/Ottoman/1.png",
        "/Products/Caps/Ottoman/2.png",
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
    tier: null,
    unitCap: null,
    gender: "Unisex",
    price: 799,
    originalPrice: null,
    badge: "New",
    image: "/Products/Caps/Snapback/Black/1.png",
    images: [
      "/Products/Caps/Snapback/Black/1.png",
      "/Products/Caps/Snapback/Black/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/Caps/Snapback/Black/1.png",
        "/Products/Caps/Snapback/Black/2.png",
      ],
      "Red": [
        "/Products/Caps/Snapback/Red/1.png",
        "/Products/Caps/Snapback/Red/2.png",
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
    tier: "The Numbered",
    unitCap: 100,
    gender: "Unisex",
    price: 1499,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheNumbered/UniqueOversized/Black/1.png",
    images: [
      "/Products/TShirts/TheNumbered/UniqueOversized/Black/1.png",
      "/Products/TShirts/TheNumbered/UniqueOversized/Black/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/TShirts/TheNumbered/UniqueOversized/Black/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/Black/2.png",
      ],
      "Maroon": [
        "/Products/TShirts/TheNumbered/UniqueOversized/Maroon/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/Maroon/2.png",
      ],
      "Navy Blue": [
        "/Products/TShirts/TheNumbered/UniqueOversized/NavyBlue/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/NavyBlue/2.png",
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
    category: "T-Shirts",
    tier: "The Numbered",
    unitCap: 100,
    gender: "Women",
    price: 1199,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheNumbered/SheIsClassic/Black/1.png",
    images: [
      "/Products/TShirts/TheNumbered/SheIsClassic/Black/1.png",
      "/Products/TShirts/TheNumbered/SheIsClassic/Black/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/TShirts/TheNumbered/SheIsClassic/Black/1.png",
        "/Products/TShirts/TheNumbered/SheIsClassic/Black/2.png",
      ],
      "Bottle Green": [
        "/Products/TShirts/TheNumbered/SheIsClassic/BottleGreen/1.png",
        "/Products/TShirts/TheNumbered/SheIsClassic/BottleGreen/2.png",
      ],
      "Coffee Brown": [
        "/Products/TShirts/TheNumbered/SheIsClassic/CoffeeBrown/1.png",
        "/Products/TShirts/TheNumbered/SheIsClassic/CoffeeBrown/2.png",
      ],
      "Maroon": [
        "/Products/TShirts/TheNumbered/SheIsClassic/Maroon/1.png",
        "/Products/TShirts/TheNumbered/SheIsClassic/Maroon/2.png",
      ],
      "Navy Blue": [
        "/Products/TShirts/TheNumbered/SheIsClassic/NavyBlue/1.png",
        "/Products/TShirts/TheNumbered/SheIsClassic/NavyBlue/2.png",
      ],
      "Red": [
        "/Products/TShirts/TheNumbered/SheIsClassic/Red/1.png",
        "/Products/TShirts/TheNumbered/SheIsClassic/Red/2.png",
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
  {
    id: 9,
    name: "I'm This Old Oversized Tee",
    category: "T-Shirts",
    tier: "The Numbered",
    unitCap: 100,
    gender: "Unisex",
    price: 1499,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheNumbered/ImThisOld/OffWhite/1.png",
    images: [
      "/Products/TShirts/TheNumbered/ImThisOld/OffWhite/1.png",
      "/Products/TShirts/TheNumbered/ImThisOld/OffWhite/2.png",
    ],
    colorImages: {
      "Off White": [
        "/Products/TShirts/TheNumbered/ImThisOld/OffWhite/1.png",
        "/Products/TShirts/TheNumbered/ImThisOld/OffWhite/2.png",
      ],
      "Red": [
        "/Products/TShirts/TheNumbered/ImThisOld/Red/1.png",
        "/Products/TShirts/TheNumbered/ImThisOld/Red/2.png",
      ],
      "White": [
        "/Products/TShirts/TheNumbered/ImThisOld/White/1.png",
        "/Products/TShirts/TheNumbered/ImThisOld/White/2.png",
      ],
    },
    sizeChart: [
      { size: "XS", chest: 39, length: 26 },
      { size: "S", chest: 41, length: 27 },
      { size: "M", chest: 43, length: 28 },
      { size: "L", chest: 45, length: 29 },
      { size: "XL", chest: 47, length: 30 },
      { size: "XXL", chest: 49, length: 31 },
      { size: "XXXL", chest: 51, length: 32 },
    ],
    description: "The DENIED. I'm This Old Oversized Tee. Premium terry-knit texture with a hand-feel that speaks for itself.",
    details: {
      fabric: "90/10 Cotton Polyester, 260 GSM Terry-knit",
      fit: "Unisex oversized fit with drop shoulders – relaxed, roomy, and right on trend",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Off White", "Red", "White"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    },
  },
  {
    id: 10,
    name: "The Game Begins Oversized Tee",
    category: "T-Shirts",
    tier: "The Numbered",
    unitCap: 100,
    gender: "Unisex",
    price: 1499,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheNumbered/TheGameBegins/OffWhite/1.png",
    images: [
      "/Products/TShirts/TheNumbered/TheGameBegins/OffWhite/1.png",
      "/Products/TShirts/TheNumbered/TheGameBegins/OffWhite/2.png",
    ],
    colorImages: {
      "Off White": [
        "/Products/TShirts/TheNumbered/TheGameBegins/OffWhite/1.png",
        "/Products/TShirts/TheNumbered/TheGameBegins/OffWhite/2.png",
      ],
      "Red": [
        "/Products/TShirts/TheNumbered/TheGameBegins/Red/1.png",
        "/Products/TShirts/TheNumbered/TheGameBegins/Red/2.png",
      ],
      "White": [
        "/Products/TShirts/TheNumbered/TheGameBegins/White/1.png",
        "/Products/TShirts/TheNumbered/TheGameBegins/White/2.png",
      ],
    },
    sizeChart: [
      { size: "XS", chest: 39, length: 26 },
      { size: "S", chest: 41, length: 27 },
      { size: "M", chest: 43, length: 28 },
      { size: "L", chest: 45, length: 29 },
      { size: "XL", chest: 47, length: 30 },
      { size: "XXL", chest: 49, length: 31 },
      { size: "XXXL", chest: 51, length: 32 },
    ],
    description: "The DENIED. The Game Begins Oversized Tee. Premium terry-knit texture with a hand-feel that speaks for itself.",
    details: {
      fabric: "90/10 Cotton Polyester, 260 GSM Terry-knit",
      fit: "Unisex oversized fit with drop shoulders – relaxed, roomy, and right on trend",
      care: "Wash inside-out in cold water, dry on low heat. Flip inside out before ironing.",
      colors: ["Off White", "Red", "White"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    },
  },
  {
    id: 11,
    name: "3 Monkeys Oversized Tee",
    category: "T-Shirts",
    tier: "The Numbered",
    unitCap: 100,
    gender: "Unisex",
    price: 1499,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheNumbered/ThreeMonkeys/Black/1.png",
    images: [
      "/Products/TShirts/TheNumbered/ThreeMonkeys/Black/1.png",
      "/Products/TShirts/TheNumbered/ThreeMonkeys/Black/2.png",
    ],
    colorImages: {
      "Black": [
        "/Products/TShirts/TheNumbered/ThreeMonkeys/Black/1.png",
        "/Products/TShirts/TheNumbered/ThreeMonkeys/Black/2.png",
      ],
      "Navy Blue": [
        "/Products/TShirts/TheNumbered/ThreeMonkeys/NavyBlue/1.png",
        "/Products/TShirts/TheNumbered/ThreeMonkeys/NavyBlue/2.png",
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
    description: "The DENIED. 3 Monkeys Oversized Tee. Premium terry-knit texture with a hand-feel that speaks for itself.",
    details: {
      fabric: "90/10 Cotton Polyester, 260 GSM Terry-knit",
      fit: "Unisex oversized fit with drop shoulders – relaxed, roomy, and right on trend",
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
