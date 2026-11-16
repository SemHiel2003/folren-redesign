import { legal } from "@/content/legal";
import { Header } from "./header";
import { Footer } from "./sections";

export function LegalPage({ page }: { page: "privacy" | "terms" }) {
  return (
    <>
      <Header />
      <main id="main">
        <div className="mx-auto max-w-none px-5 py-16 sm:px-8 md:py-24 lg:px-14 2xl:px-24">
          {/* De tekst is één-op-één overgenomen van de huidige site. */}
          <article
            className="legal mx-auto max-w-2xl"
            dangerouslySetInnerHTML={{ __html: legal[page] }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
