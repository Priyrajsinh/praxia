import type { Metadata } from "next";
import { JourneyMap } from "@/components/map/journey-map";

export const metadata: Metadata = { title: "The Map" };

export default function Page() {
  return (
    <>
      <div className="mb-8">
        <p className="mb-2 font-mono text-[0.625rem] uppercase tracking-widest text-faded-ink">
          The whole territory
        </p>
        <h1 className="font-display text-4xl font-semibold text-ink">
          The Map
        </h1>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-faded-ink">
          Five stages, no optional ones. The route runs from the first
          principles you actually need through to the frontier of AI engineering
          — with a research branch that forks at Stage&nbsp;2 for anyone serious
          about going further. Every node names what Expert and Principal look
          like, not just Competent.
        </p>
      </div>

      <JourneyMap />
    </>
  );
}
