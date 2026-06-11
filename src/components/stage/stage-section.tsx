import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Wraps ` · ` separators in aria-hidden spans so VoiceOver/NVDA do not
// announce "middle dot" for decorative punctuation in eyebrow labels.
function renderEyebrow(raw: string): ReactNode {
  const parts = raw.split(" · ");
  if (parts.length === 1) return raw;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          {part}
        </span>
      ))}
    </>
  );
}

interface StageSectionProps {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export function StageSection({
  id,
  title,
  eyebrow,
  children,
  className,
}: StageSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "mt-12 border-t border-margin pt-8 first:mt-0 first:border-t-0 first:pt-0",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-faded-ink">
          {renderEyebrow(eyebrow)}
        </p>
      )}
      <h2
        id={`${id}-heading`}
        className="mb-5 font-display text-2xl font-semibold text-ink"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
