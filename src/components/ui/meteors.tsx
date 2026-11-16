// Meteors (Aceternity UI, via 21st.dev): lichtstrepen die schuin door een vlak vallen.
// Posities en timing zijn vast, zodat server en browser hetzelfde tekenen.
import { cn } from "@/lib/utils";

export function Meteors({
  number = 16,
  className,
}: {
  number?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {Array.from({ length: number }).map((_, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            left: `${((i * 61) % 100) + 8}%`,
            animationDelay: `${((i * 0.83) % 6).toFixed(2)}s`,
            animationDuration: `${4 + ((i * 7) % 6)}s`,
          }}
        />
      ))}
    </div>
  );
}
