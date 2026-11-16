"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Check,
  Download,
  FileText,
  Film,
  Lightbulb,
  Mic,
  Music,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";

import {
  pipeline,
  pipelineDoneAfterStep,
  scriptLines,
  shots,
  steps,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { NumberTicker, Reveal } from "./effects";
import { Section, SectionHeading } from "./primitives";

const STEP_MS = 5600;
const ICONS = [Lightbulb, FileText, Mic, Film, Music, Download];
const CLOCK = ["0:00", "0:17", "8:57", "31:30", "32:08", "33:54"];
const STATUS = ["Draft", "Writing", "Voicing", "Building", "Mixing", "Ready"];

// Vaste hoogtes voor de golfvormen, zodat server en browser hetzelfde tekenen.
const WAVE = [38, 62, 84, 51, 72, 95, 44, 66, 88, 57, 35, 78, 92, 48, 69, 83, 41, 60, 75, 53, 90, 46, 71, 58];

function ViewShell({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-5 p-5 sm:p-7 lg:p-9">
      <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="text-sm font-semibold">{title}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
          {sub}
        </span>
      </p>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

function IdeaView() {
  return (
    <div className="flex h-full items-center justify-center p-5 sm:p-7">
      <div className="w-full max-w-lg rounded-xl border border-border-strong bg-raised/70 p-5 lg:p-6 shadow-2xl shadow-black/40">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
          Folren Studio
        </p>
        <p className="mt-1 text-xl font-semibold tracking-tight">New Short</p>
        <p className="mt-4 text-xs text-muted-foreground">
          What&apos;s your film about?
        </p>
        <div className="mt-1.5 rounded-lg border border-border-strong bg-background px-3 py-2.5 text-sm">
          What if Dad joined your Roblox game?
          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-caret bg-accent" />
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["Let Folren choose", "Fable Toon", "Blox Toon", "Craft Toon"].map(
            (style) => (
              <span
                key={style}
                className={cn(
                  "rounded-md border px-2 py-1 text-[11px]",
                  style === "Blox Toon"
                    ? "border-accent/60 bg-primary/20 text-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {style}
              </span>
            ),
          )}
        </div>
        <div className="mt-3 flex gap-4 font-mono text-[11px] text-muted-foreground">
          <span>Format · Short, 9:16</span>
          <span>Length · 0:45</span>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-lg bg-primary px-3.5 py-2.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]">
          <Sparkles aria-hidden className="size-4 shrink-0" />
          <span className="text-sm font-medium">Make it for me</span>
          <span className="ml-auto hidden text-[11px] text-white/70 sm:inline">
            Runs every step without stopping
          </span>
        </div>
      </div>
    </div>
  );
}

function ScriptView() {
  return (
    <ViewShell title="Script" sub="written by Claude on your own plan">
      <ol className="grid gap-2">
        {scriptLines.map((item, i) => (
          <motion.li
            key={item.line}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.22, duration: 0.35 }}
            className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 rounded-lg border border-border bg-raised/50 px-3.5 py-2.5 sm:grid-cols-[5.5rem_1fr]"
          >
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider",
                item.speaker === "Narrator" ? "text-subtle" : "text-accent",
              )}
            >
              {item.speaker}
            </span>
            <span className="text-sm leading-snug">{item.line}</span>
          </motion.li>
        ))}
      </ol>
    </ViewShell>
  );
}

function VoiceView() {
  const words = "What if DAD joined your Roblox game?".split(" ");
  return (
    <ViewShell title="Voiceover" sub="one voice for each character">
      <div className="grid gap-2">
        {["Narrator", "Dad", "Rex"].map((voice, row) => (
          <div
            key={voice}
            className="grid grid-cols-[4.5rem_1fr] items-center gap-3 rounded-lg border border-border bg-raised/50 px-3.5 py-3 sm:grid-cols-[5.5rem_1fr]"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {voice}
            </span>
            <span aria-hidden className="flex h-7 items-center gap-[3px]">
              {WAVE.map((height, i) => (
                <span
                  key={i}
                  className="w-full origin-center animate-wave rounded-full bg-accent/80"
                  style={{
                    height: `${WAVE[(i + row * 7) % WAVE.length]}%`,
                    animationDelay: `${((i * 73 + row * 190) % 1100) - 1100}ms`,
                    opacity: 0.45 + (height % 50) / 100,
                  }}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="text-sm font-semibold">Word timing</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
          every caption lands on its spoken word
        </span>
      </p>
      <p className="mt-3 flex flex-wrap gap-1.5">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ backgroundColor: "rgba(106,90,205,0)", color: "#7d7896" }}
            animate={{ backgroundColor: "rgba(106,90,205,0.28)", color: "#f4f2fb" }}
            transition={{ delay: 0.6 + i * 0.32, duration: 0.25 }}
            className="rounded-md border border-border px-2 py-1 text-sm font-medium"
          >
            {word}
          </motion.span>
        ))}
      </p>
    </ViewShell>
  );
}

function ScenesView() {
  return (
    <ViewShell title="Scenes" sub="a shot for every line, built, then checked">
      <ol className="mx-auto grid grid-cols-4 gap-2 sm:grid-cols-8 xl:max-w-[26rem] xl:grid-cols-4 min-[112rem]:max-w-none min-[112rem]:grid-cols-8">
        {shots.map((caption, i) => (
          <motion.li
            key={caption}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.16, duration: 0.35 }}
            className="relative aspect-[9/16] overflow-hidden rounded-md border border-border-strong bg-raised"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/media/demo-live/shot-${i + 1}.webp`}
              alt={`Shot ${i + 1}: ${caption}`}
              loading="lazy"
              className="size-full object-cover"
            />
            <span className="absolute left-1 top-1 rounded bg-black/65 px-1 font-mono text-[10px] text-white">
              {i + 1}
            </span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6 + i * 0.16, type: "spring", stiffness: 420, damping: 22 }}
              className="absolute bottom-1 right-1 grid size-4 place-items-center rounded-full bg-success text-black"
            >
              <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
            </motion.span>
          </motion.li>
        ))}
      </ol>
      <p className="mt-5 hidden text-sm text-muted-foreground sm:block">
        <span className="font-mono text-[11px] text-subtle">01 </span>
        {shots[0]}
        <span className="mx-3 text-border-strong">/</span>
        <span className="font-mono text-[11px] text-subtle">08 </span>
        {shots[7]}
      </p>
    </ViewShell>
  );
}

function MusicView() {
  const lanes = [
    { name: "Picture", blocks: 21, tone: "bg-accent/70" },
    { name: "Voice", blocks: 9, tone: "bg-success/70" },
    { name: "Effects", blocks: 14, tone: "bg-deal/75" },
    { name: "Music", blocks: 1, tone: "bg-primary" },
  ];
  return (
    <ViewShell title="Music and sound" sub="mixed under the voice">
      <div className="grid gap-2.5 rounded-lg border border-border bg-raised/40 p-3.5">
        {lanes.map((lane, row) => (
          <div
            key={lane.name}
            className="grid grid-cols-[3.75rem_1fr] items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {lane.name}
            </span>
            <motion.span
              aria-hidden
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: 0.2 + row * 0.35, duration: 1.1, ease: "easeOut" }}
              className="flex h-6 gap-[3px]"
            >
              {Array.from({ length: lane.blocks }).map((_, i) => (
                <span
                  key={i}
                  className={cn("h-full rounded-[3px]", lane.tone)}
                  style={{
                    flexGrow: lane.name === "Effects" ? ((i * 5) % 3) + 1 : ((i * 7) % 4) + 2,
                    opacity: lane.name === "Effects" && i % 3 === 1 ? 0.15 : 1,
                  }}
                />
              ))}
            </motion.span>
          </div>
        ))}
      </div>
      <ul className="mt-5 grid gap-2.5 text-sm text-muted-foreground">
        {[
          "Sound effects placed on the exact frame",
          "Music added under the story",
          "Captions in step with the voice",
        ].map((line) => (
          <li key={line} className="flex items-center gap-2.5">
            <Check aria-hidden className="size-3.5 text-success" strokeWidth={3} />
            {line}
          </li>
        ))}
      </ul>
    </ViewShell>
  );
}

function ExportView({ active }: { active: boolean }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) video.play().catch(() => {});
    else video.pause();
  }, [active]);

  return (
    <div className="flex h-full items-center justify-center gap-6 p-5 sm:gap-10 sm:p-7">
      <div className="relative aspect-[9/16] h-full max-h-[22rem] shrink-0 2xl:hidden overflow-hidden rounded-xl border border-border-strong bg-raised shadow-2xl shadow-black/50">
        <video
          ref={videoRef}
          src="/media/hero/bloxtoon.mp4"
          poster="/media/hero/bloxtoon.webp"
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label="The finished Blox Toon Short, silent preview"
          className="size-full object-cover"
        />
      </div>
      <div className="min-w-0 max-w-xs">
        <p className="inline-flex items-center gap-1.5 rounded-md bg-success/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-success">
          <Check aria-hidden className="size-3" strokeWidth={3} />
          Your video is ready
        </p>
        <p className="mt-4 font-mono text-3xl font-medium tracking-tight sm:text-4xl">
          33 min 54 s
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          of working time, from idea to finished Short
        </p>
        <ul className="mt-5 grid gap-2 text-[13px] text-muted-foreground">
          <li>final.mp4, 1080 x 1920, 60 fps</li>
          <li>Title and description</li>
          <li>Tags</li>
        </ul>
        <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border-strong bg-raised px-3 py-2 text-[13px] font-medium">
          <Upload aria-hidden className="size-3.5 text-accent" />
          Upload to YouTube
        </p>
      </div>
    </div>
  );
}

function PipelineSide({ done, step }: { done: number; step: number }) {
  const runningIndex = step > 0 && done < pipeline.length ? done : -1;
  return (
    <aside className="hidden min-h-0 flex-col border-r border-border bg-background/40 p-4 xl:flex">
      <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-subtle">
        <span>Pipeline</span>
        <span className="tabular-nums">
          {done}/{pipeline.length}
        </span>
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-border-strong">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${(done / pipeline.length) * 100}%` }}
        />
      </div>
      <ol className="mt-4 grid gap-0.5">
        {pipeline.map((item, i) => {
          const state = i < done ? "done" : i === runningIndex ? "run" : "todo";
          return (
            <li
              key={item.name}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2 py-2 text-[0.8125rem] transition-colors duration-300",
                state === "run" && "bg-primary/20",
              )}
            >
              <span
                className={cn(
                  "grid size-4 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                  state === "done" && "border-accent bg-accent text-background",
                  state === "run" && "animate-spin border-accent border-t-transparent",
                  state === "todo" && "border-border-strong",
                )}
              >
                {state === "done" && (
                  <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
                )}
              </span>
              <span
                className={cn(
                  "min-w-0 flex-1 truncate transition-colors duration-300",
                  state === "todo" ? "text-subtle" : "text-foreground",
                )}
              >
                {item.name}
              </span>
              <span className="font-mono text-[10px] text-subtle">{item.time}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-wider text-subtle">
        Made on your own computer
      </p>
    </aside>
  );
}

function PreviewSide({ step }: { step: number }) {
  const [shot, setShot] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const building = step === 3 || step === 4;

  React.useEffect(() => {
    if (!building) return;
    const timer = window.setInterval(
      () => setShot((value) => (value + 1) % shots.length),
      1100,
    );
    return () => window.clearInterval(timer);
  }, [building]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (step === 5 && video.offsetParent !== null) video.play().catch(() => {});
    else video.pause();
  }, [step]);

  return (
    <aside className="hidden min-h-0 flex-col border-l border-border bg-background/40 p-4 2xl:flex">
      <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-subtle">
        <span>Preview</span>
        <span>{step === 5 ? "final.mp4" : building ? `Shot ${shot + 1}/8` : "9:16"}</span>
      </p>
      <div className="mt-3 flex min-h-0 flex-1 justify-center">
        <div className="relative aspect-[9/16] h-full overflow-hidden rounded-xl border border-border-strong bg-raised shadow-2xl shadow-black/50">
          {step < 3 && (
            <p className="absolute inset-0 grid place-items-center p-6 text-center text-xs leading-relaxed text-subtle">
              The preview shows up when the scenes are built
            </p>
          )}
          {building && (
            <>
              <AnimatePresence initial={false}>
                <motion.img
                  key={shot}
                  src={`/media/demo-live/shot-${shot + 1}.webp`}
                  alt=""
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
              <span className="absolute inset-x-2 bottom-2 rounded-md bg-black/65 px-2 py-1.5 text-center text-[11px] font-medium leading-snug text-white backdrop-blur">
                {shots[shot]}
              </span>
            </>
          )}
          <video
            ref={videoRef}
            src="/media/hero/bloxtoon.mp4"
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-500",
              step === 5 ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-subtle">
        1080 × 1920 · 60 fps
      </p>
    </aside>
  );
}

export function Demo() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [step, setStep] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [run, setRun] = React.useState(0);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
    }
  }, []);

  const running = inView && !paused;

  // Op desktop stuurt het scrollen de stappen aan: de demo blijft staan
  // terwijl je door de zes stappen scrolt.
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (desktop) setStep(Math.min(steps.length - 1, Math.floor(value * steps.length)));
  });
  const stepProgress = useTransform(scrollYProgress, (value) => {
    const x = Math.min(value, 0.9999) * steps.length;
    return x - Math.floor(x);
  });

  React.useEffect(() => {
    if (!running || desktop) return;
    const timer = window.setTimeout(() => {
      setStep((value) => (value + 1) % steps.length);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, step, run]);

  const go = (index: number) => {
    const track = trackRef.current;
    if (desktop && track) {
      const top = track.getBoundingClientRect().top + window.scrollY;
      const range = track.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + range * ((index + 0.3) / steps.length),
        behavior: "smooth",
      });
      return;
    }
    setStep(index);
    setRun((value) => value + 1);
  };

  const done = pipelineDoneAfterStep[step];
  const views = [
    <IdeaView key="idea" />,
    <ScriptView key="script" />,
    <VoiceView key="voice" />,
    <ScenesView key="scenes" />,
    <MusicView key="music" />,
    <ExportView key="export" active={desktop || running} />,
  ];

  return (
    <Section id="how-it-works" labelledBy="how-title">
      <SectionHeading
        id="how-title"
        index="01"
        eyebrow="Live demo"
        title="Watch a Short get made,"
        muted="from one sentence."
        lead="A sped-up replay of a real film. Press Make it for me and every step runs by itself. Or stop after any step to read, change and approve."
      />

      <div ref={trackRef} className="mt-12 lg:mt-16 lg:h-[400vh]">
      <div
        ref={ref}
        className="grid gap-6 lg:sticky lg:top-24 lg:grid-cols-[19rem_1fr] lg:gap-10"
      >
        {/* Stappen */}
        <ol className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:block lg:self-start lg:overflow-visible lg:border-l lg:border-border lg:px-0 lg:pb-0">
          {steps.map((item, i) => {
            const Icon = ICONS[i];
            const active = i === step;
            return (
              <li key={item.title} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-pressed={active}
                  className={cn(
                    "group relative flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors lg:-ml-px lg:items-start lg:gap-3.5 lg:rounded-none lg:border-0 lg:border-l lg:px-5 lg:py-4",
                    active
                      ? "border-accent/50 bg-primary/15 lg:border-accent lg:bg-transparent"
                      : "border-border lg:border-transparent lg:hover:border-border-strong",
                  )}
                >
                  <Icon
                    aria-hidden
                    className={cn(
                      "size-4 shrink-0 transition-colors lg:mt-0.5",
                      active ? "text-accent" : "text-subtle",
                    )}
                  />
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "flex items-baseline gap-2 whitespace-nowrap text-sm font-medium transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      <span className="hidden font-mono text-[10px] text-subtle lg:inline">
                        0{i + 1}
                      </span>
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "hidden overflow-hidden text-[13px] leading-relaxed text-muted-foreground transition-[grid-template-rows,opacity] duration-300 lg:grid",
                        active
                          ? "mt-1.5 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="min-h-0">{item.text}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Appvenster */}
        <Reveal className="min-w-0" y={50} scale={0.96}>
          <div className="overflow-hidden rounded-2xl border border-border-strong bg-card shadow-[0_40px_120px_-50px_var(--primary)]">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span
                aria-hidden
                className="grid size-6 place-items-center rounded-md bg-primary text-[11px] font-bold"
              >
                f
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium leading-tight">
                  New film
                </span>
                <span className="block truncate font-mono text-[10px] text-subtle">
                  Blox Toon · Short · 9:16
                </span>
              </span>
              <span
                className={cn(
                  "ml-auto rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                  step === 5
                    ? "border-success/40 text-success"
                    : "border-border text-muted-foreground",
                )}
              >
                {STATUS[step]}
              </span>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {CLOCK[step]}
              </span>
            </div>

            <div className="grid h-[27rem] lg:h-[34rem] xl:grid-cols-[15rem_minmax(0,1fr)] 2xl:grid-cols-[15rem_minmax(0,1fr)_19rem]">
            <PipelineSide done={done} step={step} />
            <div className="relative overflow-hidden bg-[radial-gradient(80%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="absolute inset-0"
                >
                  {views[step]}
                </motion.div>
              </AnimatePresence>
            </div>
            <PreviewSide step={step} />
            </div>

            {/* Pipeline */}
            <div className="border-t border-border px-4 py-3.5 xl:hidden">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-subtle">
                <span>Pipeline</span>
                <span className="tabular-nums">
                  {done}/{pipeline.length}
                </span>
              </div>
              <ol className="mt-2.5 grid grid-cols-8 gap-1.5">
                {pipeline.map((item, i) => (
                  <li key={item.name} className="min-w-0">
                    <span
                      className={cn(
                        "block h-1 rounded-full transition-colors duration-500",
                        i < done ? "bg-accent" : "bg-border-strong",
                      )}
                    />
                    <span
                      className={cn(
                        "mt-2 hidden truncate text-[10px] leading-tight transition-colors md:block",
                        i < done ? "text-foreground" : "text-subtle",
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="hidden truncate font-mono text-[9px] text-subtle md:block">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Voortgang van de huidige stap */}
            <div className="h-0.5 bg-border">
              {desktop ? (
                <motion.div
                  style={{ scaleX: stepProgress }}
                  className="h-full origin-left bg-primary"
                />
              ) : (
                <div
                  key={`${step}-${run}`}
                  className="h-full origin-left bg-primary"
                  style={{
                    animation: `demo-progress ${STEP_MS}ms linear forwards`,
                    animationPlayState: running ? "running" : "paused",
                  }}
                />
              )}
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:hidden">
            {steps[step].text}
          </p>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
            <p className="max-w-xl text-xs leading-relaxed text-subtle">
              A replay, sped up, in a simplified drawing of the app. The idea,
              script, frames and step times are from a real Blox Toon Short made
              with Folren: 33 min 54 s of working time on the maker&apos;s PC.
              That film was made step by step. Make it for me runs the same
              steps without stopping.
            </p>
            <p className="hidden font-mono text-[11px] uppercase tracking-wider text-muted-foreground lg:block">
              Scroll to step through
            </p>
            <div className="flex gap-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground lg:hidden">
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                {paused ? (
                  <Play aria-hidden className="size-3" />
                ) : (
                  <Pause aria-hidden className="size-3" />
                )}
                {paused ? "Play" : "Pause"}
              </button>
              <button
                type="button"
                onClick={() => {
                  go(0);
                  setPaused(false);
                }}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <RotateCcw aria-hidden className="size-3" />
                Replay
              </button>
            </div>
          </div>
        </Reveal>
      </div>
      </div>

      {/* Eén echte run */}
      <Reveal className="relative mt-14 grid items-center gap-6 rounded-2xl border border-border bg-card/60 p-6 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-8">
        <GlowingEffect />
        <p className="flex items-baseline gap-3">
          <span className="font-mono text-6xl font-medium tracking-tighter text-accent sm:text-7xl">
            <NumberTicker to={31} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            minutes
          </span>
        </p>
        <div className="sm:border-l sm:border-border sm:pl-10">
          <p className="text-balance text-lg font-medium leading-snug tracking-tight">
            A 2 minute Investigative 3D film, from one sentence to finished
            video, with no manual step.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            One real run on the maker&apos;s own PC. Not a typical time: longer
            films and other styles take longer.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
