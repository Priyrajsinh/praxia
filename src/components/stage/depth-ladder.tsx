import { cn } from "@/lib/utils";

const RUNGS = [
  { label: "Aware", desc: "You know it exists" },
  { label: "Competent", desc: "You can do it independently" },
  { label: "Production", desc: "You ship it reliably" },
  { label: "Expert", desc: "You debug and teach it" },
  { label: "Principal", desc: "You advance the field" },
] as const;

interface DepthLadderProps {
  /** 0 = Aware … 4 = Principal; validated by Zod schema at call-site. */
  position: number;
  className?: string;
}

export function DepthLadder({ position, className }: DepthLadderProps) {
  return (
    <div
      aria-label="Depth ladder — your target level at this stage"
      className={cn("flex flex-wrap gap-1", className)}
    >
      {RUNGS.map((rung, i) => {
        const isCurrent = i === position;
        const isPast = i < position;
        return (
          <div
            key={rung.label}
            aria-current={isCurrent ? "step" : undefined}
            className={cn(
              "flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono transition-colors",
              isCurrent && "bg-brass text-accent-ink font-semibold shadow-sm",
              isPast && "bg-margin text-faded-ink",
              !isCurrent && !isPast && "border border-margin text-faded-ink",
            )}
          >
            {isCurrent && (
              <span aria-hidden="true" className="text-accent-ink">
                ◆
              </span>
            )}
            {isPast && (
              <span aria-hidden="true" className="text-faded-ink">
                ✓
              </span>
            )}
            <span>
              {rung.label}
              {/* sr-only desc so screen readers get the full meaning */}
              <span className="sr-only"> — {rung.desc}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
