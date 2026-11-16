import { ArrowRight } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { SKOOL_URL } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal, SectionLine } from "./effects";

/** Maatkruisje op de kruising van twee haarlijnen. */
export function Cross({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={cn(
        "pointer-events-none absolute z-10 size-3.5 text-subtle",
        className,
      )}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

/** Sectie binnen de doorlopende verticale haarlijnen van de pagina. */
export function Section({
  id,
  className,
  innerClassName,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative border-t border-border", className)}
    >
      <SectionLine />
      <div
        className={cn(
          "relative mx-auto max-w-none px-5 py-20 sm:px-8 md:py-28 lg:px-14 2xl:px-24",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent",
        className,
      )}
    >
      {index && <span className="text-subtle">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-border-strong" />}
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  title,
  muted,
  lead,
  align = "left",
  className,
}: {
  id?: string;
  /** Niet meer getoond; blijft staan zodat aanroepen niet breken. */
  index?: string;
  eyebrow?: string;
  title: string;
  /** Tweede deel van de kop, in een rustigere tint. */
  muted?: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <h2
        id={id}
        className="text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl"
      >
        {title}
        {muted && <span className="text-subtle"> {muted}</span>}
      </h2>
      {lead && (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

export function JoinButton({
  showPrice = false,
  className,
  size = "lg",
  ...props
}: ButtonProps & { showPrice?: boolean }) {
  return (
    <Button asChild size={size} className={className} {...props}>
      <a href={SKOOL_URL} rel="noopener">
        Join on Skool
        {showPrice && (
          <span className="flex items-baseline gap-1.5 border-l border-white/25 pl-3 font-mono text-[13px]">
            <s className="text-white/55">$97</s>
            <span>$47 a month</span>
          </span>
        )}
        <ArrowRight aria-hidden />
      </a>
    </Button>
  );
}
