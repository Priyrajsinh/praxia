import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MarginaliaProps {
  children: ReactNode;
  className?: string;
}

/**
 * A mentor's aside written in Caveat (the handwritten face) â€” the human touch
 * Â§3.4 calls for. On desktop it floats into the margin; on mobile it collapses
 * to an inline callout (Â§3.5).
 *
 * Uses a negative right margin so it visually pulls toward the margin column on
 * wide viewports. The reading column's overflow is visible by default so this
 * does not clip.
 */
export function Marginalia({ children, className }: MarginaliaProps) {
  return (
    <aside
      aria-label="Mentor's note"
      className={cn(
        // Mobile: a full-width callout with a brass left border
        "my-4 border-l-2 border-brass pl-3",
        // Desktop: float right and pull into margin territory
        "lg:float-right lg:clear-right lg:ml-6 lg:-mr-24 lg:w-52 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-2 lg:my-0",
        className,
      )}
    >
      <p className="font-hand text-base leading-snug text-faded-ink">
        {children}
      </p>
    </aside>
  );
}
