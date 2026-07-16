import { noIndexMetadata } from "../seo";

export const metadata = noIndexMetadata;

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
