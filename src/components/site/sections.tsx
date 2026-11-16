import {
  Check,
  Monitor,
  Repeat,
  Wand2,
  Wrench,
  X,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BorderBeam } from "@/components/ui/border-beam";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Meteors } from "@/components/ui/meteors";
import { ShaderBackground } from "@/components/ui/shader-background";
import {
  LOGIN_URL,
  SKOOL_URL,
  comparison,
  costs,
  extras,
  faqs,
  fit,
  footerNote,
  included,
  joinSteps,
  requirements,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { JoinButton, Section, SectionHeading } from "./primitives";
import { SpotlightCard } from "./spotlight-card";
import {
  NumberTicker,
  Reveal,
  ScrollZoom,
  Stagger,
  StaggerItem,
  TextReveal,
} from "./effects";

const EXTRA_ICONS = { wand: Wand2, repeat: Repeat, wrench: Wrench, monitor: Monitor };

/* ------------------------------------------------------------------ */

export function Different() {
  return (
    <Section id="different" labelledBy="different-title">
      <SectionHeading
        id="different-title"
        index="03"
        eyebrow="What makes Folren different"
        title="It does not stop"
        muted="at the picture."
        lead="A video is only finished when it has sound, a title and a place on your channel. This is the work behind every upload, by hand and with Folren."
      />

      <Stagger
        gap={0.08}
        role="table"
        aria-label="The work behind every upload, by hand and with Folren"
        className="mt-14 overflow-hidden rounded-2xl border border-border"
      >
        <div
          role="row"
          className="hidden grid-cols-[1fr_1.3fr_1.5fr] border-b border-border bg-card font-mono text-[10px] uppercase tracking-[0.16em] text-subtle md:grid"
        >
          <span role="columnheader" className="px-6 py-3.5">
            The job
          </span>
          <span role="columnheader" className="px-6 py-3.5">
            By hand
          </span>
          <span
            role="columnheader"
            className="border-l border-primary/40 bg-primary/10 px-6 py-3.5 text-accent"
          >
            With Folren
          </span>
        </div>
        {comparison.map((row) => (
          <StaggerItem
            x={-24}
            y={0}
            role="row"
            key={row.job}
            className="grid border-b border-border last:border-b-0 md:grid-cols-[1fr_1.3fr_1.5fr]"
          >
            <span
              role="rowheader"
              className="px-5 pt-5 text-[15px] font-medium md:px-6 md:py-4.5"
            >
              {row.job}
            </span>
            <span
              role="cell"
              className="flex items-start gap-2.5 px-5 pt-2 text-sm text-subtle md:px-6 md:py-4.5"
            >
              <X aria-hidden className="mt-0.5 size-3.5 shrink-0 md:hidden" />
              <span className="sr-only md:hidden">By hand: </span>
              {row.hand}
            </span>
            <span
              role="cell"
              className="flex items-start gap-2.5 px-5 pb-5 pt-2 text-sm text-foreground md:border-l md:border-primary/40 md:bg-primary/[0.07] md:px-6 md:py-4.5"
            >
              <Check
                aria-hidden
                className="mt-0.5 size-3.5 shrink-0 text-success"
                strokeWidth={3}
              />
              <span className="sr-only md:hidden">With Folren: </span>
              {row.folren}
            </span>
          </StaggerItem>
        ))}
      </Stagger>

      <h3 className="mt-20 max-w-xl text-balance text-2xl font-semibold tracking-tight">
        And four things you will not get from doing it by hand
      </h3>
      <Stagger gap={0.12} className="mt-10 grid gap-8 px-1 sm:grid-cols-2 lg:grid-cols-4">
        {extras.map((item) => {
          const Icon = EXTRA_ICONS[item.icon];
          return (
            <StaggerItem key={item.title} y={40}>
            <SpotlightCard>
              <div className="relative z-10 flex w-fit items-center justify-center rounded-md border border-border bg-raised/60 p-3 transition-colors duration-300 group-hover:border-accent/40">
                <Icon aria-hidden className="size-5 stroke-[1.5] text-accent" />
              </div>
              <div className="relative z-10 flex flex-col gap-2">
                <h4 className="text-base font-medium">{item.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function Costs({ index = "04" }: { index?: string }) {
  return (
    <Section id="costs" labelledBy="costs-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <SectionHeading
          id="costs-title"
          index={index}
          eyebrow="What you pay each month"
          title="The full bill,"
          muted="before you join."
          lead="Folren is not the only cost. The app runs on your own Claude plan, so you pay for that as well. Here is all of it."
        />

        <Reveal y={40} delay={0.1} className="overflow-hidden rounded-2xl border border-border bg-card">
          <ul>
            {costs.map((cost) => (
              <li
                key={cost.name}
                className="grid gap-x-6 gap-y-2 border-b border-border p-6 sm:grid-cols-[1fr_auto]"
              >
                <h3 className="flex flex-wrap items-center gap-2.5 text-base font-medium">
                  {cost.name}
                  <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-subtle">
                    {cost.tag}
                  </span>
                </h3>
                <p className="font-mono text-base tabular-nums sm:text-right">
                  {cost.price}
                  <span className="text-xs text-subtle"> / month</span>
                </p>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:col-span-2">
                  {cost.text}
                </p>
              </li>
            ))}
          </ul>
          <p className="flex items-baseline justify-between gap-6 bg-primary/10 px-6 py-5">
            <span className="text-sm text-muted-foreground">A typical start</span>
            <span className="font-mono text-xl font-medium tabular-nums">
              about <NumberTicker to={67} prefix="$" /> <span className="text-sm text-muted-foreground">a month</span>
            </span>
          </p>
          <p className="border-t border-border px-6 py-4 text-xs leading-relaxed text-subtle">
            Prices in US dollars. Claude and voice prices are set by those
            companies and can change, so check their own pages. Generating new
            music tracks is optional and paid per track; Folren shows the price
            before each request.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

// Prijskaart gebaseerd op Single Plan Pricing Card (ln-dev7, via 21st.dev).
export function Pricing({
  as: Heading = "h2",
}: {
  index?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Section id="pricing" labelledBy="pricing-title" className="overflow-hidden">
      <Meteors number={10} className="opacity-70" />
      <div
        aria-hidden
        className="absolute right-[-10rem] top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--primary)_30%,transparent),transparent)] opacity-60 blur-2xl"
      />
      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <div className="flex max-w-3xl flex-col gap-5">
            <Heading
              id="pricing-title"
              className="text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl"
            >
              One membership.
              <span className="text-subtle"> Everything in it.</span>
            </Heading>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              No tiers, no credits and no export limit. You join on Skool,
              download the app and start your first film the same day.
            </p>
          </div>
          <Stagger as="ol" gap={0.15} className="mt-10 grid gap-0 border-l border-border">
            {joinSteps.map((step, i) => (
              <StaggerItem as="li" x={-16} y={0} key={step} className="relative flex gap-4 py-3.5 pl-7">
                <span
                  aria-hidden
                  className="absolute -left-[13px] top-3 grid size-[26px] place-items-center rounded-full border border-border-strong bg-background font-mono text-[11px] text-accent"
                >
                  {i + 1}
                </span>
                <span className="text-[15px] text-foreground/90">{step}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal y={60} scale={0.95}>
        <div className="relative rounded-3xl border border-border-strong bg-card shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)]">
          <BorderBeam size={260} duration={11} />
          <div className="border-b border-border px-6 py-7 sm:px-8">
            <p className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-deal px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-black">
                Black Friday deal
              </span>
              <span className="inline-flex items-center rounded-md border border-border-strong px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                First 100 members only
              </span>
            </p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="text-6xl font-semibold tracking-tight tabular-nums sm:text-7xl">
                <NumberTicker from={97} to={47} prefix="$" duration={1.8} />
              </span>
              <span className="flex flex-col text-sm">
                <s className="text-subtle">$97</s>
                <span className="text-muted-foreground">a month</span>
              </span>
            </p>
            <p className="mt-4 inline-flex rounded-md bg-success/15 px-2 py-1 text-[13px] font-medium text-success">
              You save $50 every month
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The Black Friday price is for the first 100 members. After that,
              new members pay $97 a month. Your price stays the same for as long
              as you stay a member.
            </p>
            <JoinButton className="mt-6 w-full" />
            <p className="mt-3 text-center text-xs text-subtle">
              Billed monthly by Skool in US dollars. Cancel any time in Skool.
            </p>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-subtle">
              What&apos;s included
            </p>
            <Stagger as="ul" gap={0.06} className="flex flex-col gap-3">
              {included.map((feature) => (
                <StaggerItem as="li" y={12} key={feature} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary/30">
                    <Check aria-hidden className="size-2.5 text-accent" strokeWidth={3.5} />
                  </span>
                  {feature}
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="border-t border-border px-6 py-5 sm:px-8">
            <p className="text-xs leading-relaxed text-subtle">
              Not included: your Claude plan and any paid voice or music service
              you choose to connect.
            </p>
          </div>
        </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function Requirements() {
  return (
    <Section id="requirements" labelledBy="req-title">
      <SectionHeading
        id="req-title"
        index="06"
        eyebrow="Requirements"
        title="What you need"
        muted="to run it."
        lead="Folren is a real program on your computer, not a website. Check this list before you join."
      />
      <Stagger gap={0.12} className="mt-14 grid overflow-hidden rounded-2xl border border-border md:grid-cols-3">
        {requirements.map((req, i) => (
          <StaggerItem
            key={req.name}
            className={cn(
              "bg-card/50 p-6 sm:p-7",
              i > 0 && "border-t border-border md:border-l md:border-t-0",
            )}
          >
            <header className="flex items-center gap-3">
              {req.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={req.logo} alt="" width={20} height={20} className="size-5" />
              ) : (
                <Monitor aria-hidden className="size-5 text-foreground" strokeWidth={1.5} />
              )}
              <h3 className="text-lg font-semibold tracking-tight">{req.name}</h3>
              {req.status && (
                <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-success">
                  <span className="size-1.5 rounded-full bg-success" />
                  {req.status}
                </span>
              )}
            </header>
            <ul className="mt-6 grid gap-3.5">
              {req.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-border-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function Fit() {
  return (
    <Section id="fit" labelledBy="fit-title">
      <SectionHeading
        id="fit-title"
        index="07"
        eyebrow="Is Folren for you?"
        title="Know in"
        muted="twenty seconds."
      />
      <Stagger gap={0.15} className="mt-14 grid gap-4 md:grid-cols-2">
        <StaggerItem x={-30} y={0} className="relative rounded-2xl border border-success/25 bg-success/[0.04] p-6 sm:p-8">
          <GlowingEffect />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-success">
            A good fit if
          </h3>
          <ul className="mt-6 grid gap-4">
            {fit.good.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-success" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </StaggerItem>
        <StaggerItem x={30} y={0} className="relative rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <GlowingEffect />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            Not for you if
          </h3>
          <ul className="mt-6 grid gap-4">
            {fit.bad.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
              >
                <X aria-hidden className="mt-1 size-4 shrink-0 text-subtle" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </StaggerItem>
      </Stagger>

      <figure className="mt-16 grid gap-8 border-t border-border pt-12 md:grid-cols-[auto_1fr] md:gap-14">
        <figcaption className="flex items-center gap-4 md:flex-col md:items-start">
          <span
            aria-hidden
            className="grid size-14 place-items-center rounded-full bg-primary text-xl font-semibold shadow-[inset_0_1px_0_rgb(255_255_255/0.2)]"
          >
            K
          </span>
          <span>
            <span className="block font-medium">Kevin</span>
            <span className="block font-mono text-[11px] uppercase tracking-wider text-subtle">
              Maker of Folren
            </span>
          </span>
        </figcaption>
        <blockquote className="max-w-3xl text-balance text-2xl font-medium leading-snug tracking-tight sm:text-[1.75rem]">
          <TextReveal text="I built Folren for myself. I run my own faceless channels and I was tired of gluing five tools together for every video." />
          <TextReveal
            className="mt-5 text-muted-foreground"
            text="Every style on this page exists because I needed it for a real channel. When something breaks, I am the one who fixes it, and you can reach me in the community."
          />
        </blockquote>
      </figure>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

// Gebaseerd op FAQ Two Column (Hirael, MIT, via 21st.dev).
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title" innerClassName="p-0 sm:p-0 md:py-0 lg:px-0 py-0">
      <div className="grid md:grid-cols-[1fr_1.4fr]">
        <div className="border-b border-border px-5 py-14 sm:px-8 md:border-b-0 md:py-24 lg:px-14 2xl:px-24">
          <div className="md:sticky md:top-28">
            <SectionHeading
              id="faq-title"
              index="08"
              eyebrow="Straight talk"
              title="Honest answers"
              muted="before you pay."
              lead="If one of these is a deal breaker, better to know now."
            />
          </div>
        </div>
        <div className="px-5 py-6 sm:px-8 md:py-20 lg:px-14 2xl:px-24">
          <Reveal y={30}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function FinalCta() {
  return (
    <Section labelledBy="final-title" className="overflow-hidden" innerClassName="md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:linear-gradient(to_top,#000_35%,transparent)]"
      >
        <ShaderBackground className="absolute inset-0" seed={4} speed={0.24} />
        <div className="absolute inset-0 bg-background/45" />
      </div>
      <Meteors number={14} />
      <div
        aria-hidden
        className="absolute bottom-[-24rem] left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--primary)_45%,transparent),transparent)] opacity-70 blur-2xl"
      />
      <ScrollZoom className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          id="final-title"
          className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl"
        >
          Your next video starts with
          <span className="text-accent"> one sentence.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Join on Skool, install Folren and type your first idea today.
        </p>
        <JoinButton showPrice className="mt-9 w-full sm:w-auto" />
        <p className="mt-5 text-[13px] text-subtle">
          Cancel any time in Skool. Already a member?{" "}
          <a
            href={LOGIN_URL}
            className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Log in
          </a>
          . The app download is inside the community.
        </p>
      </ScrollZoom>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

const footerNav = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Styles", href: "/#styles" },
      { label: "What is different", href: "/#different" },
      { label: "Requirements", href: "/#requirements" },
    ],
  },
  {
    title: "Folren",
    links: [
      { label: "Pricing", href: "/pricing/" },
      { label: "FAQ", href: "/#faq" },
      { label: "Join on Skool", href: SKOOL_URL },
      { label: "Member log in", href: LOGIN_URL },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="relative mx-auto max-w-none px-5 pb-10 pt-16 sm:px-8 lg:px-14 2xl:px-24">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <a href="/" aria-label="Folren home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/folren-logo-white.svg"
                alt=""
                width={104}
                height={28}
                className="h-7 w-auto"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Turn one idea into a finished YouTube video.
            </p>
          </div>
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                {group.title}
              </h2>
              <ul className="mt-4 grid gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-border pt-6 text-[13px] text-muted-foreground">
          <p>
            © 2026 Folren.{" "}
            <a href="/privacy/" className="hover:text-foreground">
              Privacy
            </a>{" "}
            ·{" "}
            <a href="/terms/" className="hover:text-foreground">
              Terms
            </a>
          </p>
          <p className="text-subtle">
            Redesign concept by{" "}
            <a
              href="https://hiel.digital/"
              rel="noopener"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Hiel Digital
            </a>
          </p>
        </div>
        <p className="mt-6 max-w-4xl text-xs leading-relaxed text-subtle">
          {footerNote}
        </p>
      </div>
    </footer>
  );
}
