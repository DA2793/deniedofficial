import type { Metadata } from "next";
import OnePieceChapterClient from "./OnePieceChapterClient";

export const metadata: Metadata = {
  title: "One Piece — The Chapter",
  description:
    "Freedom isn't given. It's claimed. A chapter of DENIED. for those still chasing their own One Piece.",
  alternates: { canonical: "/chapter/one-piece" },
  openGraph: {
    title: "One Piece — The Chapter | DENIED.",
    description:
      "Freedom isn't given. It's claimed. A chapter of DENIED. for those still chasing their own One Piece.",
    url: "/chapter/one-piece",
    siteName: "DENIED.",
    type: "website",
  },
};

export default function OnePieceChapterPage() {
  return <OnePieceChapterClient />;
}
