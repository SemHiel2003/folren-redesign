import { Demo } from "@/components/site/demo";
import { Header, SaleBar } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import {
  Costs,
  Different,
  Faq,
  FinalCta,
  Fit,
  Footer,
  Pricing,
  Requirements,
} from "@/components/site/sections";
import { Styles } from "@/components/site/styles";

export default function Home() {
  return (
    <>
      <SaleBar />
      <Header />
      <main id="main">
        <Hero />
        <Demo />
        <Styles />
        <Different />
        <Costs />
        <Pricing />
        <Requirements />
        <Fit />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
