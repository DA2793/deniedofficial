import type { MetadataRoute } from "next";

const privateRoutes = [
  "/admin",
  "/account",
  "/cart",
  "/checkout",
  "/invoice",
  "/order-success",
  "/reset-password",
  "/wishlist",
  "/api",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: privateRoutes,
    },
    sitemap: "https://deniedofficial.com/sitemap.xml",
    host: "https://deniedofficial.com",
  };
}
