import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
          {eyebrow}
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
