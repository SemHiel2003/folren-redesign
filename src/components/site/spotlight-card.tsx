"use client";

// Kaart met een lichtvlek die de muis volgt (naar Feature Grid Spotlight Cards,
// Hirael, via 21st.dev) en de Glowing Effect-rand van Aceternity UI.
import * as React from "react";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative flex h-full flex-col gap-6 rounded-2xl border border-border bg-card/70 px-6 pb-7 pt-7 backdrop-blur-sm",
        "bg-[radial-gradient(60%_80%_at_25%_0%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent)]",
        className,
      )}
      {...props}
    >
      <GlowingEffect />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_240px_at_var(--mx)_var(--my),color-mix(in_oklch,var(--accent)_16%,transparent),transparent_70%)]"
      />
      {children}
    </div>
  );
}
