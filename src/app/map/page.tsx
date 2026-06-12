import type { Metadata } from "next";
import { JourneyMap } from "@/components/map/journey-map";

export const metadata: Metadata = {
  title: "The Map",
  description:
    "The full Praxia progression in one view â€” five stages from Foundations to AI Engineer, with the Research track branching at Stage 2. Every node is a link into the full stage curriculum.",
  openGraph: {
    title: "The Map Â· Praxia",
    description:
      "Five stages, no optional ones. Foundations â†’ Data Analyst â†’ Data Scientist â†’ ML Engineer â†’ AI Engineer, with a Research track.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Map Â· Praxia",
    description:
      "Five stages, no optional ones. Foundations â†’ Data Analyst â†’ Data Scientist â†’ ML Engineer â†’ AI Engineer, with a Research track.",
  },
};

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
          â€” with a research branch that forks at Stage&nbsp;2 for anyone
          serious about going further. Every node names what Expert and
          Principal look like, not just Competent.
        </p>
      </div>

      <JourneyMap />
    </>
  );
}
