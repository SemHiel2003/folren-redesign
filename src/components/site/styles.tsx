"use client";

import * as React from "react";
import { Play } from "lucide-react";

import { longStyles, shortStyles, type Style } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem, Tilt, VelocityMarquee } from "./effects";
import { Section, SectionHeading } from "./primitives";

function StyleCard({
  style,
  vertical = false,
  featured = false,
  className,
}: {
  style: Style;
  vertical?: boolean;
  featured?: boolean;
  className?: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [active, setActive] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      if (!video.getAttribute("src")) video.src = `/media/styles/${style.id}.mp4`;
      video.play().catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [active, style.id]);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-border-strong",
        className,
      )}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(false)}
    >
      <button
        type="button"
        onClick={() => setActive((value) => !value)}
        onBlur={() => setActive(false)}
        aria-pressed={active}
        aria-label={`${active ? "Stop" : "Play"} the silent preview of ${style.name}`}
        className={cn(
          "relative block w-full overflow-hidden bg-raised focus-visible:outline-offset-[-2px]",
          vertical ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/media/styles/${style.id}.webp`}
          alt={style.alt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-300",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md transition-opacity duration-300",
            playing && "opacity-0",
          )}
        >
          <Play aria-hidden className="size-2.5 fill-current" />
          Preview
        </span>
      </button>
      <div className={cn("flex flex-1 flex-col gap-1.5 p-4", featured && "sm:p-5")}>
        <h4
          className={cn(
            "font-semibold tracking-tight",
            featured ? "text-lg" : "text-[15px]",
          )}
        >
          {style.name}
        </h4>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          {style.line}
        </p>
      </div>
    </article>
  );
}

function GroupHeading({
  id,
  title,
  meta,
}: {
  id: string;
  title: string;
  meta: string;
}) {
  return (
    <h3 id={id} className="flex items-baseline gap-3">
      <span className="text-xl font-semibold tracking-tight">{title}</span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-subtle">
        {meta}
      </span>
      <span aria-hidden className="h-px flex-1 self-center bg-border" />
    </h3>
  );
}

export function Styles() {
  return (
    <>
    <VelocityMarquee
      rows={[
        longStyles.slice(0, 5).map((style) => style.name),
        [...longStyles.slice(5), ...shortStyles].map((style) => style.name),
      ]}
    />
    <Section id="styles" labelledBy="styles-title">
      <SectionHeading
        id="styles-title"
        index="02"
        eyebrow="The styles"
        title="13 styles."
        muted="Every clip is from a real, finished film."
        lead="Pick a look for a film or give a whole channel its own. Hover or tap a card to watch a silent preview."
      />

      <div className="mt-14">
        <GroupHeading id="styles-long" title="Long-form" meta="10 styles, 16:9" />
        <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {longStyles.map((style, i) => (
            <StaggerItem
              key={style.id}
              className={i < 2 ? "lg:col-span-2" : undefined}
            >
              <StyleCard style={style} featured={i < 2} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
        <Reveal>
          <GroupHeading id="styles-short" title="Shorts" meta="3 styles, 9:16" />
          <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
            Vertical cartoon stories of about a minute, with word-by-word
            captions, sound on every beat and a fast cut.
          </p>
        </Reveal>
        <Stagger gap={0.12} className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {shortStyles.map((style) => (
            <StaggerItem key={style.id} y={50}>
              <Tilt className="h-full">
                <StyleCard style={style} vertical className="h-full" />
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <p className="mt-8 text-xs text-subtle">
        Small silent previews for this page. Your own films export at full
        quality with sound.
      </p>
    </Section>
    </>
  );
}
