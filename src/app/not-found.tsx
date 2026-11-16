import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/sections";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <div className="mx-auto flex min-h-[60dvh] max-w-none flex-col items-start justify-center gap-6 px-5 py-24 sm:px-8 lg:px-14 2xl:px-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            404
          </p>
          <h1 className="text-5xl font-semibold tracking-[-0.03em]">
            This page does not exist.
          </h1>
          <Button asChild size="lg">
            <a href="/">Back to the homepage</a>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
