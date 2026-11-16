import type { Metadata } from "next";

import { Header, SaleBar } from "@/components/site/header";
import { Costs, Faq, FinalCta, Footer, Pricing } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One Folren membership with everything in it. No tiers, no credits and no export limit. See the full monthly bill before you join.",
};

export default function PricingPage() {
  return (
    <>
      <SaleBar />
      <Header />
      <main id="main" className="[&>section:first-child]:border-t-0">
        <Pricing index="01" as="h1" />
        <Costs index="02" />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
