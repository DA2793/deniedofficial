export interface SizeChartRow {
  size: string;
  chest: number;
  length: number;
}

export type ProductTier = "The Foundation" | "The Numbered" | "The Chapter";

export const TIER_DESCRIPTIONS: Record<ProductTier, string> = {
  "The Foundation": "Always in stock. The core styles DENIED. never lets go of.",
  "The Numbered": "Capped drops. Once a design sells out, it's gone for good.",
  "The Chapter": "Complete themed worlds. Each chapter tells one story — explore it, claim your piece of it.",
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
    features?: string;
    care: string;
    /** Label for the variant selector; defaults to "Colour". */
    variantLabel?: string;
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
      { size: "XXXL", chest: 51, length: 32 },
    ],
    description: "The DENIED. Signature Oversized Tee. Premium terry-knit texture with a hand-feel that speaks for itself.",
    details: {
      fabric: "Crafted from a 90% Cotton, 10% Polyester blend with a 260 GSM French Terry construction. Pre-shrunk for lasting shape retention, featuring soft looped inners that deliver exceptional comfort with a premium heavyweight feel.",
      fit: "Unisex oversized fit with drop shoulders, designed for a relaxed, contemporary streetwear silhouette.",
      features: "260 GSM French Terry • 90% Cotton, 10% Polyester • Pre-Shrunk • Looped Inners • Lycra Ribbed Neck • Drop Shoulder",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out on low heat. Do not bleach or iron directly on the print.",
      colors: ["Black", "Navy Blue"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
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
      fabric: "Crafted from 100% Super Combed Cotton with a 240 GSM heavyweight construction. Pre-shrunk and finished with a unique acid wash treatment for a soft, lived-in feel and lasting comfort.",
      fit: "Unisex oversized fit with dropped shoulders, delivering a relaxed streetwear silhouette.",
      features: "240 GSM Heavyweight • 100% Super Combed Cotton • Pre-Shrunk • Acid-Washed Finish • Lycra Ribbed Neck • Double-Stitched Construction • Every piece is uniquely washed, making no two tees exactly alike.",
      care: "Machine wash cold, inside out with similar colours. Hang dry or tumble dry on low. Iron inside out on low heat. Do not bleach or iron directly on the print.",
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
      fabric: "Crafted from 100% Supima® Cotton with a 160 GSM lightweight construction. Pre-shrunk for a consistent fit and engineered to deliver an exceptionally soft feel with premium everyday comfort.",
      fit: "Unisex regular fit designed for a clean, timeless silhouette that's lightweight, breathable, and effortless to wear.",
      features: "160 GSM Fabric • 100% Supima® Cotton • Pre-Shrunk • Softer Feel • Lycra Ribbed Neck • Unisex Regular Fit",
      care: "Machine wash cold, inside out with similar colours. Hang dry or tumble dry on low. Iron inside out on low heat. Do not bleach or iron directly on the print.",
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
      "Grey": [
        "/Products/TShirts/TheFoundation/Polo/Grey/1.png",
        "/Products/TShirts/TheFoundation/Polo/Grey/2.png",
      ],
      "Petrol Blue": [
        "/Products/TShirts/TheFoundation/Polo/PetrolBlue/1.png",
        "/Products/TShirts/TheFoundation/Polo/PetrolBlue/2.png",
      ],
      "White": [
        "/Products/TShirts/TheFoundation/Polo/White/1.png",
        "/Products/TShirts/TheFoundation/Polo/White/2.png",
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
      fabric: "Crafted from 100% Super Combed Cotton with a 220 GSM Airtex knit. Pre-shrunk and bio-washed for superior comfort, breathability, and shape retention.",
      fit: "Regular fit with a structured collar and ribbed cuffs for a clean, polished look.",
      features: "220 GSM Airtex • Super Combed Cotton • Pre-Shrunk • Bio-Washed • Ribbed Collar & Cuffs • Double-Stitched Construction",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out. Do not iron directly on the print.",
      colors: ["Black", "Coffee Brown", "Navy Blue", "Brick Red", "Maroon", "Royal Blue", "Grey", "Petrol Blue", "White"],
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
    description: "6-panel mid-profile construction with a classic baseball silhouette, designed for a clean, timeless look.",
    details: {
      fabric: "Crafted from premium Ottoman fabric, offering a lightweight feel with a textured finish that's comfortable and built for everyday wear.",
      fit: "6-panel mid-profile construction with an adjustable Candy Velcro closure, providing a secure and universal fit.",
      features: "Ottoman Fabric • 6-Panel Construction • Mid Profile • Candy Velcro Closure • Lightweight • 6 Eyelets for Enhanced Breathability",
      care: "Spot clean with a damp cloth. Hand wash only when required. Air dry naturally. Do not machine wash, bleach, tumble dry, or iron.",
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
    description: "6-panel construction with a flat visor, delivering a clean, structured silhouette inspired by classic streetwear.",
    details: {
      fabric: "Crafted from 100% Cotton for a soft, breathable feel and all-day comfort.",
      fit: "6-panel structured construction with a flat visor and adjustable plastic snap closure for a secure, universal fit.",
      features: "100% Cotton • 6-Panel Construction • Flat Visor • Plastic Snap Closure • 6 Eyelets for Breathability • Universal Fit",
      care: "Spot clean with a damp cloth. Hand wash only when required. Air dry naturally. Do not machine wash, bleach, tumble dry, or iron.",
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
      "Bottle Green": [
        "/Products/TShirts/TheNumbered/UniqueOversized/BottleGreen/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/BottleGreen/2.png",
      ],
      "Maroon": [
        "/Products/TShirts/TheNumbered/UniqueOversized/Maroon/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/Maroon/2.png",
      ],
      "Navy Blue": [
        "/Products/TShirts/TheNumbered/UniqueOversized/NavyBlue/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/NavyBlue/2.png",
      ],
      "Olive Green": [
        "/Products/TShirts/TheNumbered/UniqueOversized/OliveGreen/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/OliveGreen/2.png",
      ],
      "Petrol Blue": [
        "/Products/TShirts/TheNumbered/UniqueOversized/PetrolBlue/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/PetrolBlue/2.png",
      ],
      "Red": [
        "/Products/TShirts/TheNumbered/UniqueOversized/Red/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/Red/2.png",
      ],
      "Royal Blue": [
        "/Products/TShirts/TheNumbered/UniqueOversized/RoyalBlue/1.png",
        "/Products/TShirts/TheNumbered/UniqueOversized/RoyalBlue/2.png",
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
    description: "The DENIED. Unique Oversized Tee. A bold statement graphic on heavyweight cotton, cut for an effortless oversized silhouette.",
    details: {
      fabric: "Crafted from 100% Super Combed Cotton with a 240 GSM heavyweight construction. Pre-shrunk and bio-washed for superior softness, durability, and lasting shape retention.",
      fit: "Unisex oversized fit with dropped shoulders, offering a relaxed streetwear silhouette.",
      features: "240 GSM Heavyweight • Super Combed Cotton • Pre-Shrunk • Bio-Washed • Lycra Ribbed Neck • Double-Stitched Construction",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out. Do not iron directly on the print.",
      colors: ["Black", "Bottle Green", "Maroon", "Navy Blue", "Olive Green", "Petrol Blue", "Red", "Royal Blue"],
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
      fabric: "Crafted from 100% Super Combed Cotton with a 180 GSM construction. Pre-shrunk and bio-washed for enhanced softness, comfort, and lasting shape retention.",
      fit: "Women's regular fit designed for a flattering everyday silhouette.",
      features: "180 GSM Fabric • Super Combed Cotton • Pre-Shrunk • Bio-Washed • Folded Neck • Double-Stitched Construction",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out. Do not iron directly on the print.",
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
      { size: "XS", chest: 39, length: 27 },
      { size: "S", chest: 41, length: 28 },
      { size: "M", chest: 43, length: 29 },
      { size: "L", chest: 45, length: 30 },
      { size: "XL", chest: 47, length: 31 },
      { size: "XXL", chest: 49, length: 32 },
    ],
    description: "The DENIED. I'm This Old Oversized Tee. Heavyweight 100% cotton with a soft, breathable feel and an effortless oversized silhouette.",
    details: {
      fabric: "Crafted from 100% Super Combed Cotton with a 240 GSM heavyweight construction. Pre-shrunk and bio-washed for superior softness, durability, and lasting shape retention.",
      fit: "Unisex oversized fit with dropped shoulders, offering a relaxed streetwear silhouette.",
      features: "240 GSM Heavyweight • Super Combed Cotton • Pre-Shrunk • Bio-Washed • Lycra Ribbed Neck • Double-Stitched Construction",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out. Do not iron directly on the print.",
      colors: ["Off White", "Red", "White"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
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
      { size: "XS", chest: 39, length: 27 },
      { size: "S", chest: 41, length: 28 },
      { size: "M", chest: 43, length: 29 },
      { size: "L", chest: 45, length: 30 },
      { size: "XL", chest: 47, length: 31 },
      { size: "XXL", chest: 49, length: 32 },
    ],
    description: "The DENIED. The Game Begins Oversized Tee. Heavyweight 100% cotton with a soft, breathable feel and an effortless oversized silhouette.",
    details: {
      fabric: "Crafted from 100% Super Combed Cotton with a 240 GSM heavyweight construction. Pre-shrunk and bio-washed for superior softness, durability, and lasting shape retention.",
      fit: "Unisex oversized fit with dropped shoulders, offering a relaxed streetwear silhouette.",
      features: "240 GSM Heavyweight • Super Combed Cotton • Pre-Shrunk • Bio-Washed • Lycra Ribbed Neck • Double-Stitched Construction",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out. Do not iron directly on the print.",
      colors: ["Off White", "Red", "White"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
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
      { size: "XS", chest: 39, length: 27 },
      { size: "S", chest: 41, length: 28 },
      { size: "M", chest: 43, length: 29 },
      { size: "L", chest: 45, length: 30 },
      { size: "XL", chest: 47, length: 31 },
      { size: "XXL", chest: 49, length: 32 },
    ],
    description: "The DENIED. 3 Monkeys Oversized Tee. Heavyweight 100% cotton with a soft, breathable feel and an effortless oversized silhouette.",
    details: {
      fabric: "Crafted from 100% Super Combed Cotton with a 240 GSM heavyweight construction. Pre-shrunk and bio-washed for superior softness, durability, and lasting shape retention.",
      fit: "Unisex oversized fit with dropped shoulders, offering a relaxed streetwear silhouette.",
      features: "240 GSM Heavyweight • Super Combed Cotton • Pre-Shrunk • Bio-Washed • Lycra Ribbed Neck • Double-Stitched Construction",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out. Do not iron directly on the print.",
      colors: ["Black", "Navy Blue"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
  },
  {
    id: 12,
    name: "Moody Floaty Oversized Tee",
    category: "T-Shirts",
    tier: "The Foundation",
    unitCap: null,
    gender: "Women",
    price: 1199,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheFoundation/MoodyFloaty/BabyBlue/1.png",
    images: [
      "/Products/TShirts/TheFoundation/MoodyFloaty/BabyBlue/1.png",
      "/Products/TShirts/TheFoundation/MoodyFloaty/BabyBlue/2.png"
    ],
    colorImages: {
      "Baby Blue": [
        "/Products/TShirts/TheFoundation/MoodyFloaty/BabyBlue/1.png",
        "/Products/TShirts/TheFoundation/MoodyFloaty/BabyBlue/2.png"
      ],
      Flamingo: [
        "/Products/TShirts/TheFoundation/MoodyFloaty/Flamingo/1.png",
        "/Products/TShirts/TheFoundation/MoodyFloaty/Flamingo/2.png"
      ],
      Jade: [
        "/Products/TShirts/TheFoundation/MoodyFloaty/Jade/1.png",
        "/Products/TShirts/TheFoundation/MoodyFloaty/Jade/2.png"
      ],
      Lavender: [
        "/Products/TShirts/TheFoundation/MoodyFloaty/Lavender/1.png",
        "/Products/TShirts/TheFoundation/MoodyFloaty/Lavender/2.png"
      ],
      "Light Baby Pink": [
        "/Products/TShirts/TheFoundation/MoodyFloaty/LightBabyPink/1.png",
        "/Products/TShirts/TheFoundation/MoodyFloaty/LightBabyPink/2.png"
      ],
      "Off White": [
        "/Products/TShirts/TheFoundation/MoodyFloaty/OffWhite/1.png",
        "/Products/TShirts/TheFoundation/MoodyFloaty/OffWhite/2.png"
      ]
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
    description: "The DENIED. Moody Floaty Oversized Tee. Soft colour meets heavyweight structure in a relaxed silhouette made to move at her pace.",
    details: {
      fabric: "Crafted from a 90% Cotton, 10% Polyester blend with a 260 GSM French Terry construction. Pre-shrunk for lasting shape retention, featuring soft looped inners that deliver exceptional comfort with a premium heavyweight feel.",
      fit: "Unisex oversized fit with drop shoulders, designed for a relaxed, contemporary streetwear silhouette.",
      features: "260 GSM French Terry • 90% Cotton, 10% Polyester • Pre-Shrunk • Looped Inners • Lycra Ribbed Neck • Drop Shoulder",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out on low heat. Do not bleach or iron directly on the print.",
      colors: [
        "Baby Blue",
        "Flamingo",
        "Jade",
        "Lavender",
        "Light Baby Pink",
        "Off White"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
    }
  },
  {
    id: 13,
    name: "To Do List Oversized Tee",
    category: "T-Shirts",
    tier: "The Numbered",
    unitCap: 100,
    gender: "Women",
    price: 1499,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheNumbered/ToDoList/Black/1.png",
    images: [
      "/Products/TShirts/TheNumbered/ToDoList/Black/1.png",
      "/Products/TShirts/TheNumbered/ToDoList/Black/2.png"
    ],
    colorImages: {
      Black: [
        "/Products/TShirts/TheNumbered/ToDoList/Black/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/Black/2.png"
      ],
      "Bottle Green": [
        "/Products/TShirts/TheNumbered/ToDoList/BottleGreen/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/BottleGreen/2.png"
      ],
      "Coral Red": [
        "/Products/TShirts/TheNumbered/ToDoList/CoralRed/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/CoralRed/2.png"
      ],
      Maroon: [
        "/Products/TShirts/TheNumbered/ToDoList/Maroon/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/Maroon/2.png"
      ],
      "Navy Blue": [
        "/Products/TShirts/TheNumbered/ToDoList/NavyBlue/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/NavyBlue/2.png"
      ],
      "Olive Green": [
        "/Products/TShirts/TheNumbered/ToDoList/OliveGreen/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/OliveGreen/2.png"
      ],
      "Petrol Blue": [
        "/Products/TShirts/TheNumbered/ToDoList/PetrolBlue/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/PetrolBlue/2.png"
      ],
      Purple: [
        "/Products/TShirts/TheNumbered/ToDoList/Purple/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/Purple/2.png"
      ],
      Red: [
        "/Products/TShirts/TheNumbered/ToDoList/Red/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/Red/2.png"
      ],
      "Royal Blue": [
        "/Products/TShirts/TheNumbered/ToDoList/RoyalBlue/1.png",
        "/Products/TShirts/TheNumbered/ToDoList/RoyalBlue/2.png"
      ]
    },
    sizeChart: [
      { size: "XS", chest: 39, length: 27 },
      { size: "S", chest: 41, length: 28 },
      { size: "M", chest: 43, length: 29 },
      { size: "L", chest: 45, length: 30 },
      { size: "XL", chest: 47, length: 31 },
      { size: "XXL", chest: 49, length: 32 },
    ],
    description: "The DENIED. To Do List Oversized Tee. A bold statement graphic on heavyweight cotton, built for an effortless streetwear silhouette.",
    details: {
      fabric: "Crafted from 100% Super Combed Cotton with a 240 GSM heavyweight construction. Pre-shrunk and bio-washed for superior softness, durability, and lasting shape retention.",
      fit: "Unisex oversized fit with dropped shoulders, offering a relaxed streetwear silhouette.",
      features: "240 GSM Heavyweight • Super Combed Cotton • Pre-Shrunk • Bio-Washed • Lycra Ribbed Neck • Double-Stitched Construction",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out. Do not iron directly on the print.",
      colors: [
        "Black",
        "Bottle Green",
        "Coral Red",
        "Maroon",
        "Navy Blue",
        "Olive Green",
        "Petrol Blue",
        "Purple",
        "Red",
        "Royal Blue"
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    }
  },
  {
    id: 14,
    name: "Infinite Classic Tee",
    category: "T-Shirts",
    tier: "The Numbered",
    unitCap: 100,
    gender: "Women",
    price: 1199,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheNumbered/InfiniteClassic/Black/1.png",
    images: [
      "/Products/TShirts/TheNumbered/InfiniteClassic/Black/1.png",
      "/Products/TShirts/TheNumbered/InfiniteClassic/Black/2.png"
    ],
    colorImages: {
      Black: [
        "/Products/TShirts/TheNumbered/InfiniteClassic/Black/1.png",
        "/Products/TShirts/TheNumbered/InfiniteClassic/Black/2.png"
      ],
      "Bottle Green": [
        "/Products/TShirts/TheNumbered/InfiniteClassic/BottleGreen/1.png",
        "/Products/TShirts/TheNumbered/InfiniteClassic/BottleGreen/2.png"
      ],
      "Coffee Brown": [
        "/Products/TShirts/TheNumbered/InfiniteClassic/CoffeeBrown/1.png",
        "/Products/TShirts/TheNumbered/InfiniteClassic/CoffeeBrown/2.png"
      ],
      Maroon: [
        "/Products/TShirts/TheNumbered/InfiniteClassic/Maroon/1.png",
        "/Products/TShirts/TheNumbered/InfiniteClassic/Maroon/2.png"
      ],
      "Navy Blue": [
        "/Products/TShirts/TheNumbered/InfiniteClassic/NavyBlue/1.png",
        "/Products/TShirts/TheNumbered/InfiniteClassic/NavyBlue/2.png"
      ],
      Purple: [
        "/Products/TShirts/TheNumbered/InfiniteClassic/Purple/1.png",
        "/Products/TShirts/TheNumbered/InfiniteClassic/Purple/2.png"
      ],
      Red: [
        "/Products/TShirts/TheNumbered/InfiniteClassic/Red/1.png",
        "/Products/TShirts/TheNumbered/InfiniteClassic/Red/2.png"
      ],
      "Royal Blue": [
        "/Products/TShirts/TheNumbered/InfiniteClassic/RoyalBlue/1.png",
        "/Products/TShirts/TheNumbered/InfiniteClassic/RoyalBlue/2.png"
      ]
    },
    sizeChart: [
      {
        size: "XS",
        chest: 32,
        length: 23
      },
      {
        size: "S",
        chest: 34,
        length: 24
      },
      {
        size: "M",
        chest: 36,
        length: 25
      },
      {
        size: "L",
        chest: 38,
        length: 26
      },
      {
        size: "XL",
        chest: 40,
        length: 27
      },
      {
        size: "XXL",
        chest: 42,
        length: 28
      }
    ],
    description: "The DENIED. Infinite Classic Tee. A confident statement on soft, breathable cotton, shaped for effortless everyday comfort.",
    details: {
      fabric: "Crafted from 100% Super Combed Cotton with a 180 GSM construction. Pre-shrunk and bio-washed for enhanced softness, comfort, and lasting shape retention.",
      fit: "Women's regular fit designed for a flattering everyday silhouette.",
      features: "180 GSM Fabric • Super Combed Cotton • Pre-Shrunk • Bio-Washed • Folded Neck • Double-Stitched Construction",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out. Do not iron directly on the print.",
      colors: [
        "Black",
        "Bottle Green",
        "Coffee Brown",
        "Maroon",
        "Navy Blue",
        "Purple",
        "Red",
        "Royal Blue"
      ],
      sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ]
    }
  },
  {
    id: 15,
    name: "Zodiac Ringer Tee",
    category: "T-Shirts",
    tier: "The Chapter",
    unitCap: 100,
    gender: "Unisex",
    price: 1499,
    originalPrice: null,
    badge: "Zodiac",
    image: "/Products/TShirts/TheChapter/Zodiac/Capricorn/1.webp",
    images: [
      "/Products/TShirts/TheChapter/Zodiac/Capricorn/1.webp",
      "/Products/TShirts/TheChapter/Zodiac/Capricorn/2.webp",
      "/Products/TShirts/TheChapter/Zodiac/Capricorn/3.webp",
    ],
    colorImages: Object.fromEntries(
      [
        "Capricorn", "Aries", "Taurus", "Gemini", "Cancer", "Leo",
        "Virgo", "Libra", "Scorpio", "Sagittarius", "Aquarius", "Pisces",
      ].map((sign) => [
        sign,
        [1, 2, 3].map((n) => `/Products/TShirts/TheChapter/Zodiac/${sign}/${n}.webp`),
      ])
    ),
    sizeChart: [
      { size: "XS", chest: 36, length: 25 },
      { size: "S", chest: 38, length: 26 },
      { size: "M", chest: 40, length: 27 },
      { size: "L", chest: 42, length: 28 },
      { size: "XL", chest: 44, length: 29 },
      { size: "XXL", chest: 46, length: 30 },
    ],
    description:
      "The Stars have finally aligned. Your sign on the chest in celestial detail, its Chinese calligraphy across the back — printed in white on a black ringer tee with contrast trim. Choose your sign.",
    details: {
      fabric:
        "Crafted from 100% Cotton with a 180 GSM construction. Pre-shrunk and bio-washed for enhanced softness, breathable comfort, and lasting shape retention.",
      fit: "Unisex regular fit designed for a relaxed, versatile silhouette that's easy to style for everyday wear.",
      features:
        "180 GSM Fabric • 100% Cotton • Pre-Shrunk • Bio-Washed • Contrast Rib Neck • Self-Turned Sleeves • Unisex Style",
      care: "Machine wash cold, inside out with similar colours. Tumble dry low or hang dry. Iron inside out on low heat. Do not bleach or iron directly on the print.",
      variantLabel: "Sign",
      colors: [
        "Capricorn", "Aries", "Taurus", "Gemini", "Cancer", "Leo",
        "Virgo", "Libra", "Scorpio", "Sagittarius", "Aquarius", "Pisces",
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
  },
  // id 16 is reserved for the Neelkanth Oversized Tee (launching separately).
  {
    id: 17,
    name: "Legends are Always Late Supima Tee",
    category: "T-Shirts",
    tier: "The Foundation",
    unitCap: null,
    gender: "Unisex",
    price: 1499,
    originalPrice: null,
    badge: "New",
    image: "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Maroon/1.webp",
    images: [
      "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Maroon/1.webp",
      "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Maroon/2.webp",
      "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Maroon/3.webp",
    ],
    colorImages: {
      "Maroon": [
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Maroon/1.webp",
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Maroon/2.webp",
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Maroon/3.webp",
      ],
      "Black": [
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Black/1.webp",
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Black/2.webp",
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/Black/3.webp",
      ],
      "Navy Blue": [
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/NavyBlue/1.webp",
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/NavyBlue/2.webp",
        "/Products/TShirts/TheFoundation/LegendsAlwaysLate/NavyBlue/3.webp",
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
    description:
      "Legends are Always Late. The statement that needs no apology — printed on featherlight Supima cotton with a clean, timeless silhouette.",
    details: {
      fabric:
        "Crafted from 100% Supima® Cotton with a 160 GSM lightweight construction. Pre-shrunk for a consistent fit and engineered to deliver an exceptionally soft feel with premium everyday comfort.",
      fit: "Unisex regular fit designed for a clean, timeless silhouette that's lightweight, breathable, and effortless to wear.",
      features:
        "160 GSM Fabric • 100% Supima® Cotton • Pre-Shrunk • Softer Feel • Lycra Ribbed Neck • Unisex Regular Fit",
      care: "Machine wash cold, inside out with similar colours. Hang dry or tumble dry on low. Iron inside out on low heat. Do not bleach or iron directly on the print.",
      colors: ["Maroon", "Black", "Navy Blue"],
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
