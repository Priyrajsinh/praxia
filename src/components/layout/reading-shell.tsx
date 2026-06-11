import type { ReactNode } from "react";
import { RouteSpine } from "@/components/spine/route-spine";

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
 * Desktop: three columns, the left rail holding the hand-drawn route spine.
 * Mobile (below lg): rails collapse — the spine is hidden and the margin rail
 * stacks inline below the reading column. (The slim-mobile-edge route per §3.5
 * lands in a later pass; the spine is desktop-only for now.)
 */
export function ReadingShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-x-10 px-6 lg:grid-cols-[4.5rem_minmax(0,68ch)_minmax(0,1fr)]">
      {/* LEFT — the signature hand-drawn route spine (§3.4). Desktop only. */}
      <div className="relative hidden lg:block">
        <RouteSpine />
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
