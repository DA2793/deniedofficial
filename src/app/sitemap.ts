import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const baseUrl = "https://deniedofficial.com";

const publicRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/collection", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/inner-sanctum", changeFrequency: "monthly", priority: 0.6 },
  { path: "/policies", changeFrequency: "monthly", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...productRoutes];
}
