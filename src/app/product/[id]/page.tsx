import type { Metadata } from "next";
import { getProductById, products } from "@/data/products";
import ProductPageClient from "./ProductPageClient";

const BASE_URL = "https://deniedofficial.com";

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const product = getProductById(Number(params.id));
  if (!product) {
    return { title: "Product Not Found" };
  }

  const description = product.description;
  const image = `${BASE_URL}${product.image}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title: `${product.name} | DENIED.`,
      description,
      url: `/product/${product.id}`,
      siteName: "DENIED.",
      locale: "en_IN",
      type: "website",
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | DENIED.`,
      description,
      images: [image],
    },
  };
}

function buildProductJsonLd(productId: number) {
  const product = getProductById(productId);
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((path) => `${BASE_URL}${path}`),
    url: `${BASE_URL}/product/${product.id}`,
    brand: { "@type": "Brand", name: "DENIED." },
    category: product.category,
    material: product.details.fabric,
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/product/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const jsonLd = buildProductJsonLd(productId);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductPageClient productId={productId} />
    </>
  );
}
