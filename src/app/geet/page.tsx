import type { Metadata } from "next";
import GeetClient from "./GeetClient";

export const metadata: Metadata = {
  title: "The Geet Collection | DENIED.",
  description:
    "Designed by Her, for Her. Crafted for the woman who needs no introduction. The women's world of DENIED. — launching soon.",
  alternates: { canonical: "/geet" },
  openGraph: {
    title: "The Geet Collection | DENIED.",
    description:
      "Designed by Her, for Her. Crafted for the woman who needs no introduction. The women's world of DENIED.",
    url: "/geet",
    siteName: "DENIED.",
    type: "website",
  },
};

export default function GeetPage() {
  return <GeetClient />;
}
