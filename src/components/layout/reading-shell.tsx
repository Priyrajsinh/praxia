import type { ReactNode } from "react";
import { RouteSpine } from "@/components/spine/route-spine";
import { CrossCuttingSidebar } from "@/components/stage/cross-cutting-sidebar";

/**
 * The three-rail editorial shell (PROJECT_PLAN §3.5) — deliberately NOT a
 * centered single column.
 *
 *   ┌──────┬────────────────────┬───────────────┐
 *   │ SPINE│  READING COLUMN    │  MARGIN RAIL  │
 *   │ (route│ (serif body,       │ cross-cutting │
 *   │  line)│  ~68ch, lh 1.7)    │  skills §11)  │
 *   └──────┴────────────────────┴───────────────┘
 *
 * Desktop: three columns, the left rail holding the hand-drawn route spine.
 * Mobile (below lg): rails collapse — the spine is hidden and the margin rail
 * stacks inline below the reading column.
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

      {/* RIGHT — cross-cutting skills sidebar (PROJECT_PLAN §11). Sticky on
          desktop; stacks below the reading column on mobile. */}
      <aside
        aria-label="Cross-cutting skills"
        className="mt-10 border-t border-margin pt-6 lg:mt-0 lg:self-start lg:border-t-0 lg:border-l lg:py-16 lg:pl-8 lg:sticky lg:top-20"
      >
        <CrossCuttingSidebar />
      </aside>
    </div>
  );
}
