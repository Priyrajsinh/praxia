import type { ReactNode } from "react";

type PagePlaceholderProps = {
  /** Small handwritten eyebrow above the title (e.g. "Stage 1"). */
  eyebrow?: string;
  title: string;
  /** One-line identity / promise for the page, in the site's opinionated voice. */
  lede: string;
  /** Which build phase fills this page in — keeps the scaffold honest. */
  arrives?: string;
  children?: ReactNode;
};

/**
 * Shared scaffold for Phase 1 route placeholders. Every page renders exactly one
 * <h1> in the display face on paper. This is scaffolding, not curriculum — the
 * real content (kept in MDX/data, never hardcoded) lands in later phases.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  lede,
  arrives,
  children,
}: PagePlaceholderProps) {
  return (
    <article className="max-w-[68ch]">
      {eyebrow ? (
        <p className="font-hand text-xl text-route-red">{eyebrow}</p>
      ) : null}
      <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-lg text-faded-ink">{lede}</p>
      {children}
      <p className="mt-10 font-mono text-xs uppercase tracking-wider text-faded-ink">
        Placeholder{arrives ? ` — authored in ${arrives}` : ""}
      </p>
    </article>
  );
}
