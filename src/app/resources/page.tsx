import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "@/lib/resources";
import { ResourcesClient } from "@/components/resources/resources-client";
import { StageSection } from "@/components/stage/stage-section";
import { Marginalia } from "@/components/stage/marginalia";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Every recommended book, course, paper, and doc across the Praxia map â€” ranked, with honest verdicts and free picks flagged.",
  openGraph: {
    title: "Resources Â· Praxia",
    description:
      "Every recommended book, course, paper, and doc â€” ranked within each topic, honest verdicts, free picks flagged. Filter by type, level, cost, or stage.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources Â· Praxia",
    description:
      "Every recommended book, course, paper, and doc â€” ranked within each topic, honest verdicts, free picks flagged. Filter by type, level, cost, or stage.",
  },
};

export default function ResourcesPage() {
  return (
    <article>
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
          Master library
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Resources
        </h1>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-faded-ink">
          Every recommended book, course, paper, and doc across the map â€”
          ranked, with honest verdicts and a clear &ldquo;start here.&rdquo; No
          dead weight. Hover any card to read the full verdict.
        </p>
      </header>

      <StageSection id="how-resources-work" title="How this list works">
        <Marginalia>
          Rank 1 in a topic + Free = the canonical free pick. Those are the ones
          to start with if budget or time is tight.
        </Marginalia>

        <p>
          Each entry is ranked within its topic â€” rank 1 is the recommended
          starting point. Resources that appear in multiple stages are listed
          once with all their stages tagged; filter by stage to see what belongs
          where.
        </p>
        <p>
          Free picks with rank 1 are flagged with a{" "}
          <span className="inline-block rounded bg-teal/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
            â˜… Free pick
          </span>{" "}
          badge â€” those are the highest-ROI starting points if you are budget-
          or time-constrained. &ldquo;Needs review&rdquo; entries are in
          fast-moving areas (particularly Stage&nbsp;4); treat their details as
          a snapshot, not a guarantee.
        </p>
        <p>
          Resources are a single source of truth: every stage page&rsquo;s
          resource section pulls from this same list. Nothing is duplicated. The{" "}
          <Link href="/glossary">glossary</Link> defines every concept these
          resources teach.
        </p>
      </StageSection>

      {/* Client component â€” filters, search, card grid */}
      <ResourcesClient resources={resources} />
    </article>
  );
}
