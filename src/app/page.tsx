import type { Metadata } from "next";
import Link from "next/link";
import {
  MAP_VIEWBOX,
  RESEARCH_CONT_END_Y,
  RESEARCH_CONT_START_Y,
  mapNodes,
  mapRoute,
  researchBranch,
  researchNode,
} from "@/lib/map-journey";

export const metadata: Metadata = {
  title: "Praxia â€” The route from first principles to the frontier",
  description:
    "An opinionated, end-to-end map of the journey through Data and AI â€” Foundations, Data Analyst, Data Scientist, ML Engineer, AI Engineer, and a Research track. Curated resources, sequenced the way you'd actually learn them.",
  openGraph: {
    title: "Praxia â€” The route from first principles to the frontier",
    description:
      "One hand-drawn map of the whole territory. Curated, ranked, sequenced: what to learn, in what order, to what depth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Praxia â€” The route from first principles to the frontier",
    description:
      "One hand-drawn map of the whole territory. Curated, ranked, sequenced: what to learn, in what order, to what depth.",
  },
};

const VBW = MAP_VIEWBOX.width;
const VBH = MAP_VIEWBOX.height;

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

/** Static map illustration â€” no JS, no hydration. */
function RouteMinimap() {
  return (
    <figure aria-label="Route overview: five stages from Foundations to AI Engineer, with a Research track branching at Stage 2">
      {/* Hidden accessible description */}
      <figcaption className="sr-only">
        A hand-drawn route with five stage nodes: Stage 0 Foundations, Stage 1
        Data Analyst, Stage 2 Data Scientist, Stage 3 ML Engineer, Stage 4 AI
        Engineer. A teal Research track branches right from Stage 2.
      </figcaption>

      <div
        className="relative w-full max-w-xs"
        style={{ aspectRatio: `${VBW} / ${VBH}` }}
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          {/* Ghost full route */}
          <path
            d={mapRoute}
            fill="none"
            stroke="var(--route-red)"
            strokeOpacity={0.13}
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Main route */}
          <path
            d={mapRoute}
            fill="none"
            stroke="var(--route-red)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Research branch â€” teal */}
          <path
            d={researchBranch}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Dashed teal continuation */}
          <path
            d={`M ${researchNode.x} ${RESEARCH_CONT_START_Y} L ${researchNode.x} ${RESEARCH_CONT_END_Y}`}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={1.8}
            strokeDasharray="5 4"
            strokeLinecap="round"
            strokeOpacity={0.55}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M ${researchNode.x - 4} ${RESEARCH_CONT_END_Y - 9} L ${researchNode.x} ${RESEARCH_CONT_END_Y} L ${researchNode.x + 4} ${RESEARCH_CONT_END_Y - 9}`}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.65}
            vectorEffect="non-scaling-stroke"
          />

          {/* Stage node marks */}
          {mapNodes.map((node) => (
            <g key={node.href}>
              <circle
                cx={node.x}
                cy={node.y}
                r={11}
                fill="var(--paper)"
                stroke="var(--route-red)"
                strokeWidth={1.8}
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={node.x}
                y1={node.y - 8}
                x2={node.x}
                y2={node.y - 5.5}
                stroke="var(--route-red)"
                strokeWidth={1.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={node.x}
                y1={node.y + 5.5}
                x2={node.x}
                y2={node.y + 8}
                stroke="var(--route-red)"
                strokeWidth={1.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={node.x - 8}
                y1={node.y}
                x2={node.x - 5.5}
                y2={node.y}
                stroke="var(--route-red)"
                strokeWidth={1.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={node.x + 5.5}
                y1={node.y}
                x2={node.x + 8}
                y2={node.y}
                stroke="var(--route-red)"
                strokeWidth={1.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={2.2}
                fill="var(--route-red)"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}

          {/* Research node mark â€” teal */}
          <circle
            cx={researchNode.x}
            cy={researchNode.y}
            r={11}
            fill="color-mix(in srgb, var(--teal) 10%, var(--paper))"
            stroke="var(--teal)"
            strokeWidth={1.8}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={researchNode.x}
            y1={researchNode.y + 5}
            x2={researchNode.x}
            y2={researchNode.y - 4}
            stroke="var(--teal)"
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M ${researchNode.x - 3.5} ${researchNode.y - 0.5} L ${researchNode.x} ${researchNode.y - 5.5} L ${researchNode.x + 3.5} ${researchNode.y - 0.5}`}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Node labels â€” positioned over the SVG */}
        <div className="pointer-events-none absolute inset-0 select-none">
          {mapNodes.map((node) => (
            <div
              key={node.href}
              className="absolute"
              style={{
                left: pct(node.x, VBW),
                top: pct(node.y, VBH),
              }}
            >
              <div className="absolute left-0 top-0 -translate-y-1/2 pl-6 whitespace-nowrap">
                <p className="text-[0.5rem] leading-none font-mono uppercase tracking-widest text-faded-ink">
                  {node.stage}
                </p>
                <p className="mt-0.5 text-[0.625rem] font-semibold leading-tight text-ink">
                  {node.label}
                </p>
              </div>
            </div>
          ))}
          {/* Research label */}
          <div
            className="absolute"
            style={{
              left: pct(researchNode.x, VBW),
              top: pct(researchNode.y, VBH),
            }}
          >
            <div className="absolute left-0 top-0 -translate-y-1/2 pl-5 whitespace-nowrap">
              <p className="text-[0.5rem] leading-none font-mono uppercase tracking-widest text-faded-ink">
                Track R
              </p>
              <p className="mt-0.5 text-[0.625rem] font-semibold leading-tight text-faded-ink">
                Research
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

const stages = [
  {
    stage: "Stage 0",
    title: "Foundations",
    href: "/foundations",
    summary:
      "The bedrock before any role. Python, Git, SQL, the command line, and a reproducible notebook you can defend.",
    free: true,
  },
  {
    stage: "Stage 1",
    title: "Data Analyst",
    href: "/data-analyst",
    summary:
      "Rigorous analysis, SQL at production scale, statistical inference, and an A/B test you'd defend in a post-mortem.",
    free: true,
  },
  {
    stage: "Stage 2",
    title: "Data Scientist",
    href: "/data-scientist",
    summary:
      "Classical ML, probabilistic thinking, experiment design, and the difference between models you build and ones you use.",
    free: false,
  },
  {
    stage: "Stage 3",
    title: "ML Engineer",
    href: "/machine-learning-engineer",
    summary:
      "Training infrastructure, deployment, monitoring. The gap between a notebook that works and a system that ships.",
    free: false,
  },
  {
    stage: "Stage 4",
    title: "AI Engineer",
    href: "/ai-engineer",
    summary:
      "Foundation models, RAG, agents. The frontier as it stands â€” every volatile entry is dated and flagged for review.",
    free: false,
  },
] as const;

const differentiators = [
  {
    label: "Ranked, not listed",
    body: "Every resource has a rank within its topic. Rank 1 is where you start; the deeper picks are for when you need more. No list of forty 'must-read' books with no ordering.",
  },
  {
    label: "Sequenced by dependency, not hype",
    body: "The route runs in learning-dependency order: linear algebra before ML theory, numpy before pandas, evaluation metrics before model selection. You can't skip stages â€” the map names exactly why.",
  },
  {
    label: "Honest about depth and time",
    body: "Exit criteria name precisely what 'done' looks like at each stage. Time estimates are honest ranges, not aspirational minimums. The research track is described from the outside of active research.",
  },
] as const;

export default function LandingPage() {
  return (
    <article>
      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section aria-label="Introduction">
        <p className="font-hand text-xl text-route-red">
          A field guide, not a roadmap clone
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-balance leading-[1.08] sm:text-6xl">
          The route from first principles to the frontier.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-faded-ink max-w-prose">
          One hand-drawn map of the whole territory â€” Foundations through AI
          Engineering, with a research track branching off the moment you can
          build models. Curated, ranked, sequenced: what to learn, in what
          order, to what depth. The walking is still years of real work; this
          just makes sure you never wander.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/map"
            className="rounded-sm bg-route-red px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            See the map
          </Link>
          <Link
            href="/foundations"
            className="rounded-sm border border-margin px-4 py-2.5 font-medium text-ink transition-colors hover:bg-margin"
          >
            Start at Foundations â†’
          </Link>
        </div>
      </section>

      {/* â”€â”€ Route overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        aria-label="Journey overview"
        className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10"
      >
        <div className="shrink-0">
          <RouteMinimap />
        </div>
        <div className="min-w-0">
          <p className="font-hand text-base text-faded-ink leading-relaxed">
            Five stages, no optional ones.
          </p>
          <p className="mt-2 text-base leading-relaxed text-faded-ink">
            Each stage names what Competent, Expert, and Principal look like â€”
            not just a list of topics. The depth ladder runs from <em>Aware</em>{" "}
            to <em>Principal / Researcher</em>. The map is honest about what
            separates a good data scientist from a senior one.
          </p>
          <p className="mt-3 text-base leading-relaxed text-faded-ink">
            The teal branch is the Research track. It forks from Stage 2 for
            anyone serious about MSc, PhD, or contributing to the literature â€”
            and it runs in parallel with the practical stages, not after them.
          </p>
          <p className="mt-4">
            <Link
              href="/map"
              className="text-sm font-medium text-ink underline decoration-brass underline-offset-4 hover:text-faded-ink"
            >
              Open the interactive map â†’
            </Link>
          </p>
        </div>
      </section>

      {/* â”€â”€ Stage cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section aria-labelledby="stages-heading" className="mt-16">
        <h2
          id="stages-heading"
          className="font-display text-2xl font-semibold text-ink"
        >
          What each stage covers
        </h2>
        <p className="mt-2 text-base text-faded-ink">
          Start free at Stages 0 and 1. Deeper stages follow in sequence.
        </p>

        <ol className="mt-6 space-y-3" aria-label="The five stages">
          {stages.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex items-start gap-4 rounded-sm border border-margin bg-paper px-4 py-4 transition-colors hover:bg-margin/40"
              >
                <div className="shrink-0 pt-0.5">
                  <div
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-margin"
                  >
                    <span className="font-mono text-[0.625rem] text-faded-ink">
                      {s.stage.replace("Stage ", "")}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-mono text-[0.625rem] uppercase tracking-widest text-faded-ink">
                      {s.stage}
                    </p>
                    {s.free && (
                      <span className="rounded-sm bg-teal/10 border border-teal/20 px-1.5 py-0.5 text-[0.5625rem] font-medium text-ink">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-display text-base font-semibold text-ink">
                    {s.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-faded-ink">
                    {s.summary}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="shrink-0 pt-3 text-faded-ink group-hover:text-ink transition-colors"
                >
                  â†’
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-sm text-faded-ink">
          Plus:{" "}
          <Link
            href="/research"
            className="font-medium text-ink underline decoration-teal underline-offset-4"
          >
            Research track
          </Link>{" "}
          (branches from Stage 2) Â·{" "}
          <Link
            href="/mathematics"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            Mathematics curriculum
          </Link>{" "}
          (Tiers 1â€“3, cross-linked to every stage)
        </p>
      </section>

      {/* â”€â”€ Differentiators â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        aria-labelledby="different-heading"
        className="mt-16 border-t border-margin pt-10"
      >
        <h2
          id="different-heading"
          className="font-display text-2xl font-semibold text-ink"
        >
          What makes this different
        </h2>

        <dl className="mt-6 space-y-6">
          {differentiators.map((d) => (
            <div key={d.label} className="grid gap-1 sm:grid-cols-[12rem_1fr]">
              <dt className="font-hand text-lg text-ink">{d.label}</dt>
              <dd className="text-base leading-relaxed text-faded-ink">
                {d.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* â”€â”€ Resources aside â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        aria-labelledby="resources-heading"
        className="mt-16 border-t border-margin pt-10"
      >
        <h2
          id="resources-heading"
          className="font-display text-2xl font-semibold text-ink"
        >
          Every resource in one place
        </h2>
        <p className="mt-2 max-w-prose text-base leading-relaxed text-faded-ink">
          Books, courses, papers, and docs â€” ranked within each topic, with
          honest verdicts, free picks flagged, and no dead weight. Filter by
          type, level, cost, or stage.
        </p>
        <p className="mt-4">
          <Link
            href="/resources"
            className="rounded-sm border border-margin px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-margin inline-block"
          >
            Browse all resources â†’
          </Link>
        </p>
      </section>

      {/* â”€â”€ Final CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        aria-label="Get started"
        className="mt-16 rounded-sm border border-margin bg-margin/20 px-6 py-10 text-center"
      >
        <p className="font-hand text-xl text-faded-ink">Ready to begin?</p>
        <h2 className="mt-1 font-display text-3xl font-semibold text-ink">
          Start free at Foundations
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-faded-ink">
          Stage 0 takes 4â€“8 weeks (2 if you already code). It has no
          prerequisites. Every person on the map started here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/foundations"
            className="rounded-sm bg-route-red px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Begin at Foundations â†’
          </Link>
          <Link
            href="/how-to-use"
            className="rounded-sm border border-margin px-4 py-2.5 font-medium text-ink transition-colors hover:bg-margin"
          >
            How to use the map
          </Link>
        </div>
      </section>
    </article>
  );
}
