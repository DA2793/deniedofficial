import type { Metadata } from "next";
import NeelkanthChapterClient from "./NeelkanthChapterClient";

export const metadata: Metadata = {
  title: "Neelkanth — The Chapter",
  description:
    "An ode to Mahadev. Eight stories — Kaal Har, Amarnath, Halahal, Ananta, Tandav, Mahakaal, Aghora, Trishul — each limited to 100 pieces. A chapter of DENIED.",
  alternates: { canonical: "/chapter/neelkanth" },
  openGraph: {
    title: "Neelkanth — The Chapter | DENIED.",
    description:
      "An ode to Mahadev. Eight stories on heavyweight cotton, each limited to 100 pieces. A chapter of DENIED.",
    url: "/chapter/neelkanth",
    siteName: "DENIED.",
    type: "website",
  },
};

export default function NeelkanthChapterPage() {
  return <NeelkanthChapterClient />;
}
