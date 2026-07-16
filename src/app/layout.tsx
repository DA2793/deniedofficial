import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import InstagramFloater from "@/components/InstagramFloater";
import BackToTop from "@/components/BackToTop";
import CartDrawer from "@/components/CartDrawer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deniedofficial.com"),
  title: {
    default: "DENIED. — Not for Everyone",
    template: "%s | DENIED.",
  },
  description:
    "DENIED. creates premium, made-to-order apparel and accessories in limited drops for those who refuse to blend in.",
  applicationName: "DENIED.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "DENIED. — Not for Everyone",
    description:
      "Premium, made-to-order apparel and accessories. Limited drops, intentional design, and no compromises.",
    url: "/",
    siteName: "DENIED.",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/favicon.png",
        width: 3292,
        height: 1052,
        alt: "DENIED. — Not for Everyone",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DENIED. — Not for Everyone",
    description:
      "Premium, made-to-order apparel and accessories. Limited drops, intentional design, and no compromises.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${bebas.variable}`}>
      <body className="bg-black text-white font-body antialiased overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <GrainOverlay />
              <Navbar />
              <CartDrawer />
              <main>{children}</main>
              <Footer />
              <InstagramFloater />
              <BackToTop />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
