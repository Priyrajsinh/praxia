import type { Metadata } from "next";
import { StageSection } from "@/components/stage/stage-section";
import { Marginalia } from "@/components/stage/marginalia";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Praxia terms of use â€” educational resource, no warranties.",
  openGraph: {
    title: "Terms of Use Â· Praxia",
    description: "Praxia terms of use.",
  },
  twitter: {
    card: "summary",
    title: "Terms of Use Â· Praxia",
    description: "Praxia terms of use.",
  },
};

const LAST_UPDATED = "2026-06-12";

export default function TermsPage() {
  return (
    <article>
      <header className="mb-2">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
          Legal
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-3 font-mono text-xs text-faded-ink">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <StageSection id="nature" title="What Praxia is">
        <Marginalia>
          The short version: link to us, quote briefly, don&rsquo;t republish
          the curation. Affiliate links are disclosed. The map is opinion â€”
          use your own judgment.
        </Marginalia>

        {/* TODO: update "free" qualifier when paid gate goes live (Phase 6) */}
        <p>
          Praxia is a free, educational resource â€” a curated map of learning
          paths in Data and AI. It is not a course, a certification programme, a
          professional services provider, or a career consultancy. Nothing on
          this site constitutes professional advice of any kind (legal,
          financial, career, or medical).
        </p>
        <p>
          The recommendations, sequencing, and resource selections on this site
          are editorial opinions. They are provided in good faith and represent
          the views of the author at the time of writing. They may be wrong.
          They will become outdated. Use your own judgement.
        </p>
      </StageSection>

      <StageSection id="content" title="Content and intellectual property">
        <p>
          The Praxia map â€” its sequencing, structure, curation, and editorial
          commentary â€” is original work.{" "}
          <span className="font-mono text-xs">
            Â© {new Date().getFullYear()} Praxia.
          </span>{" "}
          All rights reserved.
        </p>
        <p>
          The linked external resources (books, courses, papers, documentation)
          belong to their respective owners and authors. Praxia does not claim
          any rights over them. We link to them; we do not reproduce them.
          Quotations from external works on this site are brief and clearly
          attributed; they do not substitute for the originals.
        </p>
        <p>
          You may link to any page on this site. You may quote short passages
          with attribution. You may not reproduce the site&rsquo;s curation or
          commentary in bulk without permission.
        </p>
      </StageSection>

      <StageSection id="links" title="External links and affiliate disclosure">
        <p>
          This site links to external resources. Some of those links may in the
          future become affiliate links â€” meaning Praxia would receive a small
          commission if you purchase through the link, at no additional cost to
          you. Any affiliate links are disclosed in the footer and, where
          practical, at the point of the link.
        </p>
        <p>
          Currently, no links on this site are affiliate links. When that
          changes, this page and the footer will be updated to reflect it.
        </p>
        <p>
          The presence of a link is an editorial endorsement, not a commercial
          one. Resources listed here are listed because they are assessed as
          highest-ROI for the stated stage â€” not because of any commercial
          relationship. If a commercial relationship ever affects a listing, it
          will be disclosed explicitly.
        </p>
        <p>
          External links are verified periodically. We cannot guarantee they
          remain accurate, accessible, or unchanged after verification.
        </p>
      </StageSection>

      <StageSection id="no-warranty" title="No warranties">
        <p>
          This site is provided &ldquo;as is,&rdquo; without warranty of any
          kind â€” express or implied. We make no guarantees that:
        </p>
        <ul>
          <li>
            Following this map will result in employment, a particular salary,
            or a specific career outcome.
          </li>
          <li>
            The resources listed are the best available at the time you read
            this.
          </li>
          <li>The time estimates given are accurate for your situation.</li>
          <li>
            External links will remain functional or their content will remain
            unchanged.
          </li>
        </ul>
        <p>
          Use this site to inform your own decisions. Verify information
          independently where it matters. Do not rely on Praxia as your only
          source of guidance.
        </p>
      </StageSection>

      <StageSection id="changes" title="Changes to these terms">
        <p>
          These terms may be updated. The &ldquo;last updated&rdquo; date at the
          top of this page reflects the most recent revision. Continued use of
          the site constitutes acceptance of the current terms.
        </p>
      </StageSection>
    </article>
  );
}
