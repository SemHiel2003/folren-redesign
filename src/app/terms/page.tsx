import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return <LegalPage page="terms" />;
}
