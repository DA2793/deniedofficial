import { noIndexMetadata } from "../seo";

export const metadata = noIndexMetadata;

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
