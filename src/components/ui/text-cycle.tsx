"use client";

// Text Cycle (wensity, via 21st.dev): wisselende woorden met een blur per letter.
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface TextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  charClassName?: string;
}

export function TextCycle({
  words,
  interval = 2600,
  className,
  charClassName,
}: TextCycleProps) {
  const [index, setIndex] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (reduceMotion || words.length <= 1) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((prev) => (prev + 1) % words.length);
    }, Math.max(400, interval));
    return () => window.clearInterval(timer);
  }, [interval, reduceMotion, words.length]);

  const current = words[index % words.length] ?? "";

  if (reduceMotion) {
    return <span className={cn("inline-flex", className)}>{current}</span>;
  }

  return (
    <span className={cn("inline-flex", className)}>
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          className="inline-flex whitespace-nowrap"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          {Array.from(current).map((char, i) => (
            <motion.span
              key={`${index}-${i}`}
              className={cn("inline-block", charClassName)}
              initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
              transition={{ delay: i * 0.025, duration: 0.3 }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
