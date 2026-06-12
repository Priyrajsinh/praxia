import type { Metadata } from "next";
import Link from "next/link";
import { StageSection } from "@/components/stage/stage-section";
import { Marginalia } from "@/components/stage/marginalia";

export const metadata: Metadata = {
  title: "How to Use This Map",
  description:
    "How to navigate Praxia and the study methodology that makes it stick — primary sources over tutorials, spaced practice, projects, and teaching to learn.",
};

export default function HowToUsePage() {
  return (
    <article>
      <header className="mb-2">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
          Read this first
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          How to Use This Map
        </h1>
        <p className="mt-3 max-w-prose font-body text-xl leading-relaxed text-faded-ink">
          The map is complete. The walking is years of real work. Here is how to
          navigate it without fooling yourself.
        </p>
      </header>

      {/* ── What this is ─────────────────────────────────────────────────── */}
      <StageSection id="what-this-is" title="What Praxia is — and is not">
        <Marginalia>
          A map that shows the route from base camp to the summit is not the
          climb. Reading it carefully is useful. Confusing it for the climb is
          dangerous.
        </Marginalia>

        <p>
          Praxia is an opinionated, curated route through the Data and AI
          landscape. It tells you what to learn, in what order, and from which
          sources — sequenced the way you would actually need to know things,
          not alphabetically or by how popular the topic was in 2023.
        </p>

        <p>
          What it is not: a course. A bootcamp. A certification. A shortcut. The
          map describes a journey that takes most people three to five years of
          sustained, deliberate practice — from Foundations through AI Engineer
          — if they are working seriously alongside it. Someone who approaches
          it as a checklist to tick will reach the end of the list having
          learned the vocabulary but not the craft.
        </p>

        <p>
          The <Link href="/research">research track</Link> is a branch, not a
          destination. Most people using this map are building toward
          practitioner roles — Data Analyst, Data Scientist, ML Engineer, AI
          Engineer. The research branch is for those who want to contribute new
          knowledge, not just apply existing knowledge. It requires everything
          the main track builds, plus depth in mathematics that most
          practitioners never need.
        </p>
      </StageSection>

      {/* ── Navigating the map ───────────────────────────────────────────── */}
      <StageSection id="navigating" title="Navigating the map">
        <p>
          <strong>
            Start at the <Link href="/map">overview map</Link>.
          </strong>{" "}
          It shows all five stages in sequence, with the research branch forking
          off Stage 2. Each node is a link. The left-rail route line (on
          desktop) shows where you are in the journey as you scroll — and you
          can mark stages complete to track progress.
        </p>

        <p>
          <strong>Each stage page has nine sections</strong>, in a fixed order:
          what the role does, core concepts, mathematics required, tools and
          engineering, the project, resources, exit criteria, self-test
          questions, and a bridge to the next stage. Read the sections in order
          the first time. Return to individual sections as reference.
        </p>

        <p>
          <strong>The mathematics curriculum</strong> lives at{" "}
          <Link href="/mathematics">/mathematics</Link> and is organised in
          three tiers. Tier 1 covers what you need for Foundations and early
          Stage 1. Tier 2 covers what you need for Stages 2 and 3. Tier 3 is
          research-grade depth. Stage pages link to specific sections — those
          links are not decorative. When a stage page says &ldquo;understand
          this derivation,&rdquo; follow the link.
        </p>

        <p>
          <strong>Resources</strong> are never listed to be comprehensive. They
          are listed because they are the highest-ROI option for that stage, in
          a specific order. Read that order as a recommendation, not as items to
          eventually check off. The{" "}
          <Link href="/resources">resources page</Link> lets you filter across
          all stages by type, cost, and stage.
        </p>

        <p>
          <strong>
            The <Link href="/glossary">glossary</Link>
          </strong>{" "}
          defines every term the map uses. If you encounter an unfamiliar term
          on a stage page, look it up there first. Each glossary definition
          links back to the stage where the concept is taught in depth.
        </p>
      </StageSection>

      {/* ── Study methodology ────────────────────────────────────────────── */}
      <StageSection id="methodology" title="The study methodology">
        <p>
          The method matters as much as the material. Watching a video course
          and feeling like you understood it is not learning. Learning is the
          capacity to do something you could not do before — under time
          pressure, without the worked example in front of you, in a context the
          tutorial did not cover. The following four practices are how that
          capacity builds.
        </p>

        <h3>Primary sources over tutorials</h3>

        <Marginalia>
          Every time you read a secondary source instead of the primary, you are
          paying someone else&rsquo;s understanding tax. The primary source is
          harder. It is also richer, more accurate, and the thing you will
          remember.
        </Marginalia>

        <p>
          A tutorial explains a paper. A textbook explains a field. Neither
          replaces the paper or the field. Praxia lists tutorials and courses
          because they are valuable entry points — they give you the mental
          model to understand the primary source. But the ceiling of tutorial
          learning is the ceiling of the tutorial author&rsquo;s understanding.
          Reading the primary source — the textbook, the original paper, the
          official documentation — removes that ceiling.
        </p>

        <p>
          Concretely: if a stage page recommends a course alongside a textbook,
          the course is for intuition-building, the textbook is for substance.
          Do not finish the course and call the topic done. Return to the
          textbook. The chapters that were confusing during the course will have
          become accessible.
        </p>

        <h3>Spaced practice</h3>

        <p>
          Spaced repetition is not optional; it is how biological memory works.
          A concept encountered once, understood once, is mostly forgotten
          within a week. The same concept encountered again at increasing
          intervals — one day, three days, a week, a month — is consolidated.
          This is not pop psychology; it is well-replicated cognitive science.
        </p>

        <p>
          In practice: use Anki or a similar tool for definitions and formulas
          you need to recall quickly. More importantly, return to earlier
          material as you progress. The data analyst who revisits probability
          distributions while studying machine learning finds them three times
          as comprehensible as they did the first time. The repetition is not a
          signal that you are slow — it is the mechanism.
        </p>

        <h3>Projects before you feel ready</h3>

        <p>
          The project sections on each stage page describe what to build. Build
          them — not because they are fun (some are not), but because project
          work is the only mechanism that converts declarative knowledge
          (&ldquo;I know what a t-test is&rdquo;) into procedural knowledge
          (&ldquo;I can run a t-test correctly on data I have not seen
          before&rdquo;).
        </p>

        <p>
          Do not wait until you feel ready. You will never feel ready. The
          confusion that arises when you start a project is not a sign that you
          are not prepared; it is the confusion that produces learning. Sit with
          it. Debug it. The resolution is the lesson.
        </p>

        <p>
          The projects are sequenced: each one requires skills from the
          previous. Do not skip them. Do not do them symbolically — a notebook
          that is half-finished, with a handful of cells and a README that says
          &ldquo;in progress,&rdquo; is not a portfolio piece and is not
          learning. Finish what you start.
        </p>

        <h3>Teaching to learn</h3>

        <Marginalia>
          If you cannot explain it simply, you do not understand it. The
          explanation reveals the gap; the gap is where the learning is.
        </Marginalia>

        <p>
          Explain what you are learning — to a colleague, to a rubber duck, in a
          blog post, in a study group. The act of explanation forces precision:
          you cannot wave your hands when someone asks &ldquo;wait, why does the
          gradient have to point downhill?&rdquo; You either know or you
          discover that you do not.
        </p>

        <p>
          The Feynman technique — explain a concept in plain language until you
          can do it without notes — is not a study hack. It is a diagnostic
          tool. The places where your explanation becomes vague are exactly the
          places where your understanding has gaps. Those gaps are what to go
          back and fix.
        </p>
      </StageSection>

      {/* ── Exit criteria ────────────────────────────────────────────────── */}
      <StageSection id="exit-criteria" title="When to move on">
        <p>
          Each stage page has an exit criteria section with a checklist and
          self-test questions. These are the gate, not the time estimate. The
          time estimates (3–6 months, 6–12 months) are honest averages for
          people who are working seriously — they will vary by prior background,
          available hours, and how hard the material hits you personally.
        </p>

        <p>
          <strong>Do not move on because you are bored.</strong> Do not move on
          because you have covered all the material once. Move on when you can
          answer the self-test questions without notes and build the stage
          project without following a walkthrough. That is the bar. It is not
          arbitrary — it is calibrated to what the next stage will assume.
        </p>

        <p>
          <strong>Do not stay because you are not confident.</strong> Confidence
          at this level of difficulty is a lagging indicator, not a leading one.
          If you meet the exit criteria, move on regardless of how uncertain you
          feel. The uncertainty is normal. It does not go away with more review
          of the previous stage; it goes away with exposure to the next one.
        </p>
      </StageSection>

      {/* ── Honest framing ───────────────────────────────────────────────── */}
      <StageSection id="honest-framing" title="Honest framing">
        <p>
          Praxia is not the fastest path to a job. If the goal is a job as
          quickly as possible, the fastest route is a focused bootcamp plus
          application practice plus networking — and there is nothing wrong with
          that goal.
        </p>

        <p>
          This map is the path to genuine competence. The kind where you can sit
          across from a senior engineer and hold your own. Where you can
          identify the right statistical test without looking it up, debug a
          failing model without a tutorial, read a paper and understand what the
          authors actually did. That level of competence takes time — measured
          in years, not weeks.
        </p>

        <p>
          The map can accelerate the journey by eliminating the wasted detours:
          the wrong resources, the wrong sequence, the rabbit holes that felt
          productive but led nowhere. It cannot eliminate the journey itself.
          Nobody learns this material by reading a map of it. They learn it by
          doing the work.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 gap-y-3">
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 rounded border border-route-red bg-route-red/5 px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-route-red hover:text-paper"
          >
            View the map →
          </Link>
          <Link
            href="/foundations"
            className="font-mono text-sm text-faded-ink underline decoration-brass underline-offset-2 hover:text-ink"
          >
            Start at Foundations
          </Link>
        </div>
      </StageSection>
    </article>
  );
}
