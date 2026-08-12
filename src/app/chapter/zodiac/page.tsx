import type { Metadata } from "next";
import ZodiacChapterClient from "./ZodiacChapterClient";

export const metadata: Metadata = {
  title: "Zodiac — The Chapter",
  description:
    "Your Sign. Your Energy. Your Statement. Twelve signs, drawn in celestial detail with brush calligraphy across the back. A chapter of DENIED.",
  alternates: { canonical: "/chapter/zodiac" },
  openGraph: {
    title: "Zodiac — The Chapter | DENIED.",
    description:
      "Your Sign. Your Energy. Your Statement. Twelve signs in celestial detail — a chapter of DENIED.",
    url: "/chapter/zodiac",
    siteName: "DENIED.",
    type: "website",
  },
};

export default function ZodiacChapterPage() {
  return <ZodiacChapterClient />;
}
