import type { ReactNode } from "react";

/**
 * The three-rail editorial shell (PROJECT_PLAN §3.5) — deliberately NOT a
 * centered single column.
 *
 *   ┌──────┬────────────────────┬───────────────┐
 *   │ SPINE│  READING COLUMN    │  MARGIN RAIL  │
 *   │ (route│ (serif body,       │ ("on this page"│
 *   │  line)│  ~68ch, lh 1.7)    │  + notes)     │
 *   └──────┴────────────────────┴───────────────┘
 *
 * Desktop: three columns. The left spine is a placeholder here — /day2 replaces
 * it with the hand-drawn SVG route. Mobile: rails collapse — the spine drops to
 * a slim left edge (hidden for now) and the margin rail stacks inline below the
 * reading column.
 */
export function ReadingShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-x-10 px-6 lg:grid-cols-[4.5rem_minmax(0,68ch)_minmax(0,1fr)]">
      {/* LEFT — spine rail. Placeholder route line until /day2. Decorative. */}
      <div aria-hidden className="relative hidden lg:block">
        <span className="absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-route-red/30 to-transparent" />
      </div>

      {/* CENTER — the reading column. Skip-link + primary landmark target. */}
      <main id="content" className="reading-column min-w-0 py-10 lg:py-16">
        {children}
      </main>

      {/* RIGHT — margin rail: "on this page" / mentor marginalia. */}
      <aside
        aria-label="On this page"
        className="mt-10 border-t border-margin pt-6 lg:mt-0 lg:self-start lg:border-t-0 lg:border-l lg:py-16 lg:pl-8 lg:sticky lg:top-20"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-faded-ink">
          On this page
        </p>
        <p className="mt-3 max-w-[22ch] font-hand text-lg leading-snug text-faded-ink">
          Section links and the mentor&rsquo;s margin notes live here.
        </p>
      </aside>
    </div>
  );
}
