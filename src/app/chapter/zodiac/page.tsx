import type { Metadata } from "next";
import ZodiacChapterClient from "./ZodiacChapterClient";

export const metadata: Metadata = {
  title: "Zodiac — The Chapter 001",
  description:
    "The stars have finally aligned. Twelve signs, drawn in celestial detail with brush calligraphy across the back. Chapter 001 of DENIED.",
  alternates: { canonical: "/chapter/zodiac" },
  openGraph: {
    title: "Zodiac — The Chapter 001 | DENIED.",
    description:
      "Your Sign. Your Energy. Your Statement. Twelve signs in celestial detail — Chapter 001 of DENIED.",
    url: "/chapter/zodiac",
    siteName: "DENIED.",
    type: "website",
  },
};

export default function ZodiacChapterPage() {
  return <ZodiacChapterClient />;
}
