"use client";

// Scroll- en bewegingseffecten. Alles respecteert prefers-reduced-motion.
import * as React from "react";
import {
  MotionConfig,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* Onthulling bij het in beeld komen: omhoog, scherp worden, infaden. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  scale = 1,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

type Tag = "div" | "ul" | "ol" | "li";

/* Kinderen komen na elkaar binnen. */
export function Stagger({
  children,
  className,
  as = "div",
  gap = 0.07,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
} & React.AriaAttributes & { role?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = motion[as] as any;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  x = 0,
  y = 24,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  x?: number;
  y?: number;
} & React.AriaAttributes & { role?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = motion[as] as any;
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, x, y, filter: "blur(8px)" },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* Dunne voortgangslijn onder de header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-to-r from-primary via-accent to-deal"
    />
  );
}

/* Lichtpunten die langs de twee verticale haarlijnen meelopen met het scrollen. */
export function RailBeams() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const top = useTransform(smooth, [0, 1], ["8%", "92%"]);
  const beam =
    "absolute h-48 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-accent to-transparent";
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-1/2 z-30 hidden w-full max-w-none -translate-x-1/2 md:block"
    >
      <motion.span style={{ top }} className={cn(beam, "left-0")} />
      <motion.span style={{ top }} className={cn(beam, "right-0")} />
    </div>
  );
}

/* Lijn bovenaan een sectie die zich uittekent zodra de sectie in beeld komt. */
export function SectionLine() {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
      className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
    />
  );
}

/* Getal dat optelt (of aftelt) zodra het in beeld komt. */
export function NumberTicker({
  from = 0,
  to,
  prefix = "",
  duration = 1.6,
  className,
}: {
  from?: number;
  to: number;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  React.useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate: (value) => {
        node.textContent = prefix + Math.round(value);
      },
    });
    return () => controls.stop();
  }, [inView, from, to, prefix, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {to}
    </span>
  );
}

/* Tekst waarvan de woorden oplichten terwijl je erlangs scrollt. */
function RevealWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

export function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.55"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <RevealWord
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          >
            {word}
          </RevealWord>
        ))}
      </span>
    </p>
  );
}

/* Doorlopende tekstband die versnelt en omkeert met de scrollsnelheid. */
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function MarqueeRow({
  items,
  baseVelocity,
  outline = false,
}: {
  items: string[];
  baseVelocity: number;
  outline?: boolean;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);
  const direction = React.useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (Math.min(delta, 64) / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex shrink-0">
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center">
                <span
                  className={cn(
                    "px-5 text-4xl font-semibold tracking-[-0.03em] sm:px-8 sm:text-6xl",
                    outline
                      ? "text-transparent [-webkit-text-stroke:1px_var(--border-strong)]"
                      : "text-foreground/90",
                  )}
                >
                  {item}
                </span>
                <span className="size-2 rotate-45 bg-primary sm:size-2.5" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityMarquee({
  rows,
}: {
  rows: [string[], string[]];
}) {
  return (
    <div
      aria-hidden
      className="relative flex flex-col gap-3 border-t border-border py-10 sm:gap-5 sm:py-14 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      <MarqueeRow items={rows[0]} baseVelocity={-1.6} />
      <MarqueeRow items={rows[1]} baseVelocity={1.6} outline />
    </div>
  );
}

/* Hero-reel: begint gekanteld en trekt vlak terwijl je scrollt. */
export function ScrollTilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 120, damping: 26 });
  const rotateX = useTransform(smooth, [0, 520], [16, 0], { clamp: true });
  const scale = useTransform(smooth, [0, 520], [0.92, 1], { clamp: true });
  const y = useTransform(smooth, [0, 520], [-18, 0], { clamp: true });
  return (
    <div className={className} style={{ perspective: 1400 }}>
      <motion.div
        style={{ rotateX, scale, y, transformOrigin: "50% 0%" }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Laat een achtergrond trager meebewegen dan de pagina. */
export function Parallax({
  children,
  className,
  distance = 180,
}: {
  children?: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, distance], { clamp: true });
  const opacity = useTransform(scrollY, [0, 900], [1, 0.35], { clamp: true });
  return (
    <motion.div aria-hidden style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/* Element dat groeit en scherp wordt naarmate het het midden van het scherm nadert. */
export function ScrollZoom({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);
  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/* Kaart die licht meekantelt met de muis. */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
