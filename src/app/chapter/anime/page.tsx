import type { Metadata } from "next";
import AnimeChapterClient from "./AnimeChapterClient";

export const metadata: Metadata = {
  title: "Anime — The Chapter",
  description:
    "The stories that raised us, worn like they mattered. A chapter of DENIED. — one page, every saga.",
  alternates: { canonical: "/chapter/anime" },
  openGraph: {
    title: "Anime — The Chapter | DENIED.",
    description:
      "The stories that raised us, worn like they mattered. A chapter of DENIED. — one page, every saga.",
    url: "/chapter/anime",
    siteName: "DENIED.",
    type: "website",
  },
};

export default function AnimeChapterPage() {
  return <AnimeChapterClient />;
}
