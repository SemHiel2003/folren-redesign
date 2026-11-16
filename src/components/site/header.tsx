"use client";

// Gebaseerd op Header 1 (efferd, via 21st.dev): sticky header met blur na scrollen
// en een mobiel menu met geanimeerd icoon.
import * as React from "react";
import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { LOGIN_URL, SKOOL_URL, nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "./effects";

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function SaleBar() {
  return (
    <a
      href={SKOOL_URL}
      rel="noopener"
      className="group relative z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 border-b border-deal/25 bg-[#17120a] px-4 py-2 text-center text-[13px] text-foreground/90"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-deal">
        Black Friday
      </span>
      <span>
        <strong className="font-semibold text-foreground">$47 a month</strong>{" "}
        <span className="text-muted-foreground">
          instead of <s>$97</s>
        </span>
      </span>
      <span className="hidden text-muted-foreground sm:inline">
        Only for the first 100 members
      </span>
      <span className="inline-flex items-center gap-1 font-medium text-deal">
        Claim the deal
        <ArrowRight
          aria-hidden
          className="size-3.5 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-colors duration-300",
        (scrolled || open) &&
          "border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65",
      )}
    >
      <ScrollProgress />
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-none items-center justify-between px-5 sm:px-8 lg:px-14 2xl:px-24"
      >
        <a href="/" aria-label="Folren home" className="-ml-1 rounded-md p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/folren-logo-white.svg"
            alt=""
            width={104}
            height={28}
            className="h-7 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={LOGIN_URL}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Log in
          </a>
          <Button asChild size="sm">
            <a href={SKOOL_URL} rel="noopener">
              Join on Skool
            </a>
          </Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <MenuToggleIcon open={open} className="size-5" />
        </Button>
      </nav>

      {open && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full flex h-[calc(100dvh-4rem)] flex-col justify-between gap-6 overflow-y-auto border-t border-border bg-background p-5 md:hidden"
          >
            <ul className="grid gap-1">
              {nav.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border py-4 text-lg font-medium"
                  >
                    {link.label}
                    <ArrowRight aria-hidden className="size-4 text-subtle" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="grid gap-2">
              <a
                href={LOGIN_URL}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Log in
              </a>
              <Button asChild size="lg">
                <a href={SKOOL_URL} rel="noopener">
                  Join on Skool
                </a>
              </Button>
            </div>
          </div>
        )}
    </header>
  );
}

function MenuToggleIcon({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      strokeWidth={2.5}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 32 32"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "transition-transform duration-300 ease-in-out",
        open && "-rotate-45",
        className,
      )}
    >
      <path
        className={cn(
          "transition-all duration-300 ease-in-out",
          open
            ? "[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]"
            : "[stroke-dasharray:12_63]",
        )}
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  );
}
