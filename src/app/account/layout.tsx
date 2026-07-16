import { noIndexMetadata } from "../seo";

export const metadata = noIndexMetadata;

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
