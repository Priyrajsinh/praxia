import type { Metadata } from "next";
import Link from "next/link";
import { StageSection } from "@/components/stage/stage-section";
import { Marginalia } from "@/components/stage/marginalia";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who built Praxia and why — a practitioner who walked this path and built the statistical report to prove it.",
};

export default function AboutPage() {
  return (
    <article>
      <header className="mb-2">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
          About
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Who made this
        </h1>
        <p className="mt-3 max-w-prose font-body text-xl leading-relaxed text-faded-ink">
          Built by a practitioner who walked the path — and is honest about the
          parts that hurt.
        </p>
      </header>

      {/* ── Origin ───────────────────────────────────────────────────────── */}
      <StageSection id="origin" title="Why this exists">
        <Marginalia>
          The map I wished had existed when I started. Not a list of resources —
          anyone can make that — but a sequence with reasons.
        </Marginalia>

        <p>
          Praxia started as a personal document. I was navigating the Data and
          AI landscape without a reliable guide to what to learn, in what order,
          and why the order matters. The resources existed. The sequencing did
          not. Most curricula were either too shallow (a list of trending tools)
          or too academic (a PhD programme without the research context that
          makes a PhD programme coherent).
        </p>

        <p>
          What I needed was an opinionated answer to: if you are starting from
          scratch and want to reach genuine competence across this stack —
          analysis, machine learning, ML engineering, AI systems — what do you
          learn, from which sources, in which order, and how do you know when
          you are done? That question does not have a Wikipedia page. It has,
          instead, a lot of conflicting blog posts and a lot of people who
          learned things in the wrong order and are now teaching that order to
          others.
        </p>

        <p>
          The map is my answer to that question. It is opinionated because the
          alternatives are not neutral — they are just less explicitly
          opinionated. It is curated because comprehensiveness is a trap: a list
          of 400 resources is not a curriculum, it is a to-do list that will
          outlive your motivation.
        </p>
      </StageSection>

      {/* ── Proof of work ────────────────────────────────────────────────── */}
      <StageSection id="proof" title="Proof of work">
        <p>
          The claim that this map reflects real practitioner knowledge — not
          curated theory — needs proof. The proof is the work, not the
          biography.
        </p>

        <p>
          The flagship project on the{" "}
          <Link href="/data-analyst#project">Data Analyst stage page</Link> —
          the 15–20 page rigorous statistical report — is described from direct
          experience. I built it. The specification (five research questions,
          full assumption checks, APA reporting, effect sizes,
          Benjamini-Hochberg correction, multiple regression with residual
          diagnostics, written as if for an applied statistics venue) is not
          aspirational. It is what the project actually required to be done
          correctly.
        </p>

        <p>
          The exit criteria on each stage are calibrated to what the next stage
          genuinely assumes. The mathematics sections describe the minimum and
          research-grade levels because I learned the difference between knowing
          a formula and understanding its derivation the hard way — by getting
          stuck on material that assumed understanding I did not have.
        </p>

        <Marginalia>
          The parts of this map I am most confident about are the ones where I
          made the mistake I am warning you about. The parts I am least
          confident about are the ones I learned from others and not from direct
          error.
        </Marginalia>

        <p>
          The research track is documented from the outside of active research —
          I have read papers, reproduced results, and worked alongside
          researchers, but I am not a research scientist. That boundary is
          marked clearly on the <Link href="/research">research page</Link>: the
          track describes what the path looks like from the perspective of
          someone who has studied it carefully and walked the early rungs, not
          someone who has reached the top.
        </p>
      </StageSection>

      {/* ── Editorial voice ──────────────────────────────────────────────── */}
      <StageSection id="voice" title="Editorial voice">
        <p>
          Praxia is written in a single voice because it reflects a single point
          of view. That means it is sometimes wrong. Where the map says
          &ldquo;this is the right resource&rdquo; or &ldquo;this is the
          important concept,&rdquo; that is an editorial judgment — not a
          consensus of the field, not an optimised algorithm, not a committee
          decision.
        </p>

        <p>
          The editorial stance is: honest over encouraging. The time estimates
          are not aspirational — they reflect what serious, consistent work
          actually takes. The exit criteria are not low bars — they reflect what
          you actually need to know to proceed without struggling. The
          difficulty of Stage 2 mathematics is not softened because many people
          find it hard. It is hard. Knowing that it is hard, and why, is more
          useful than being told it is manageable.
        </p>

        <p>
          Where I am uncertain, I say so. Where a resource may go stale (AI
          tooling in particular), it is flagged with <em>needs review</em> in
          the underlying data. Where I recommend something paid, I say it is
          paid and give the best free alternative.
        </p>
      </StageSection>

      {/* ── What comes next ──────────────────────────────────────────────── */}
      <StageSection id="maintenance" title="Maintenance and contact">
        <p>
          The map is a living document. Resources age; the field moves; the AI
          Engineer stage in particular will require updates as the tooling
          stabilises. The footer carries a &ldquo;links verified as of&rdquo;
          date and an invitation to report broken links. Use it.
        </p>

        <p>
          Substantive feedback — a resource that deserves to be here and is not,
          a concept that is described incorrectly, a stage that is
          misconsequenced — is welcome via the GitHub issue tracker. I cannot
          respond to every suggestion, but I read them, and the map has already
          changed because of them.
        </p>

        <p>
          What is not in scope: requests to add resources because they are
          popular, comprehensive, or free. The curation criterion is highest-ROI
          for someone on that specific stage. Popularity is a weak proxy for
          that; comprehensiveness is sometimes its opposite.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 gap-y-3">
          <Link
            href="/how-to-use"
            className="inline-flex items-center gap-1.5 rounded border border-route-red bg-route-red/5 px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-route-red hover:text-paper"
          >
            How to use this map →
          </Link>
          <Link
            href="/map"
            className="font-mono text-sm text-faded-ink underline decoration-brass underline-offset-2 hover:text-ink"
          >
            View the full map
          </Link>
        </div>
      </StageSection>
    </article>
  );
}
