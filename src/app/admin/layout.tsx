import { noIndexMetadata } from "../seo";

export const metadata = noIndexMetadata;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
