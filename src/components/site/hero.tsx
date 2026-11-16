"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShaderBackground } from "@/components/ui/shader-background";
import { TextCycle } from "@/components/ui/text-cycle";
import { heroReel, heroWords, stats } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Parallax, Reveal, ScrollTilt, Stagger, StaggerItem } from "./effects";
import { JoinButton } from "./primitives";

type ReelItem = (typeof heroReel)[number];

function ReelTile({
  item,
  play,
  className,
}: {
  item: ReelItem;
  play: boolean;
  className?: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (play) {
      if (!video.getAttribute("src")) video.src = `/media/hero/${item.id}.mp4`;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [play, item.id]);

  const kind = item.vertical ? "Short" : "film";

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border-strong bg-card",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/media/hero/${item.id}.webp`}
        alt={`A scene from a ${item.name} ${kind} made with Folren`}
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
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
          "absolute inset-0 size-full object-cover transition-opacity duration-500",
          playing ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent"
      />
      <figcaption className="absolute bottom-2.5 left-2.5 flex items-center gap-2 rounded-md border border-white/10 bg-black/55 px-2 py-1 text-[11px] backdrop-blur-md sm:bottom-3 sm:left-3">
        <span className="font-medium text-white">{item.name}</span>
        <span className="hidden font-mono text-[10px] uppercase tracking-wider text-white/60 sm:inline">
          {item.format}
        </span>
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const reelRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(reelRef, { amount: 0.15 });
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData,
    );
    if (reduce || saveData) setPaused(true);
  }, []);

  const play = inView && !paused;
  const verticals = heroReel.filter((item) => item.vertical);
  const horizontals = heroReel.filter((item) => !item.vertical);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Parallax className="absolute inset-x-0 top-0 h-[68rem] [mask-image:linear-gradient(to_bottom,#000_50%,transparent)]">
        <div className="aurora absolute inset-0" />
        <ShaderBackground className="absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_42%_at_50%_26%,rgb(9_8_15/0.72),transparent)]" />
      </Parallax>

      <div className="relative mx-auto max-w-none px-5 pb-10 pt-16 sm:px-8 sm:pt-24 lg:px-14 2xl:px-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal y={36}>
          <h1
            id="hero-title"
            className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[5.25rem]"
          >
            <span className="block">Type one idea.</span>
            <span className="block">Get a finished</span>
            <span className="flex h-[1.12em] items-center justify-center text-accent">
              <TextCycle words={heroWords} />
            </span>
          </h1>
          </Reveal>

          <Reveal delay={0.12} className="flex w-full flex-col items-center">
          <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Press <span className="text-foreground">Make it for me</span>. Folren
            researches, writes, voices, builds, mixes and exports the video
            without stopping. It runs on your own computer with your own Claude
            plan.
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <JoinButton showPrice className="w-full sm:w-auto" />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#styles">See the 13 styles</a>
            </Button>
          </div>

          <p className="mt-5 text-[13px] text-foreground/70">
            <span className="text-deal">Black Friday deal.</span> Only for the
            first 100 members. Cancel any time in Skool. Your Claude plan is
            separate.
          </p>
          </Reveal>
        </div>

        {/* Reel */}
        <div ref={reelRef} className="relative mt-14 sm:mt-20">
          <div
            aria-hidden
            className="absolute -inset-x-5 -top-6 bottom-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent)] blur-2xl"
          />
          <Reveal delay={0.25} y={60}>
          <ScrollTilt>
          <div className="relative grid grid-cols-3 gap-2.5 sm:gap-3 lg:grid-cols-[1fr_1fr_1fr_1.585fr]">
            {verticals.map((item) => (
              <ReelTile
                key={item.id}
                item={item}
                play={play}
                className="aspect-[9/16]"
              />
            ))}
            <div className="col-span-3 grid grid-cols-2 gap-2.5 sm:gap-3 lg:col-span-1 lg:grid-cols-1 lg:grid-rows-2">
              {horizontals.map((item) => (
                <ReelTile
                  key={item.id}
                  item={item}
                  play={play}
                  className="aspect-video lg:aspect-auto"
                />
              ))}
            </div>
          </div>
          </ScrollTilt>
          </Reveal>

          <div className="relative mt-4 flex items-start justify-between gap-6">
            <p className="text-xs leading-relaxed text-subtle">
              Silent clips from real, finished films in these styles. Your own
              videos have voice, music and sound.
            </p>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={!paused}
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {paused ? (
                <Play aria-hidden className="size-3" />
              ) : (
                <Pause aria-hidden className="size-3" />
              )}
              {paused ? "Play clips" : "Pause clips"}
            </button>
          </div>
        </div>
      </div>

      {/* Kerncijfers */}
      <div className="relative border-t border-border">
        <Stagger as="ul" gap={0.1} className="relative mx-auto grid max-w-none grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StaggerItem as="li"
              key={stat.value}
              className={cn(
                "flex flex-col gap-1 px-5 py-6 sm:px-8 lg:px-14 2xl:px-24",
                i % 2 === 1 && "border-l border-border",
                i >= 2 && "border-t border-border md:border-t-0",
                i === 2 && "md:border-l",
              )}
            >
              <span className="text-[15px] font-semibold tracking-tight">
                {stat.value}
              </span>
              <span className="text-[13px] text-muted-foreground">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
