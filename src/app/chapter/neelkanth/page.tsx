import type { Metadata } from "next";
import NeelkanthChapterClient from "./NeelkanthChapterClient";

export const metadata: Metadata = {
  title: "Neelkanth — The Chapter",
  description:
    "An ode to Mahadev. The stillness, the poison held, the keeper of time. The Neelkanth chapter of DENIED. — coming soon.",
  alternates: { canonical: "/chapter/neelkanth" },
  openGraph: {
    title: "Neelkanth — The Chapter | DENIED.",
    description:
      "An ode to Mahadev. The Neelkanth chapter of DENIED. — coming soon.",
    url: "/chapter/neelkanth",
    siteName: "DENIED.",
    type: "website",
  },
};

export default function NeelkanthChapterPage() {
  return <NeelkanthChapterClient />;
}
