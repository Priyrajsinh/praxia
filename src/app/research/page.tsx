import type { Metadata } from "next";
import Link from "next/link";
import { getResourcesByStage } from "@/lib/resources";
import { validateTopics } from "@/lib/schema";
import { TopicChecklist } from "@/components/stage/topic-checklist";
import { ResourceGroups } from "@/components/stage/resource-group";
import { Marginalia } from "@/components/stage/marginalia";
import { StageSection } from "@/components/stage/stage-section";

export const metadata: Metadata = {
  title: "Research Track",
  description:
    "The research branch of the Praxia map — from reading papers to creating new knowledge. Covers the 5-rung ladder, research skills, the math depth required, and the project arc from reproduction to publication.",
};

// ── Research ladder (different from the standard depth ladder) ──────────────
const RESEARCH_RUNGS = [
  {
    label: "Reader",
    desc: "Summarise and critique any paper in your area",
    tealActive: false,
  },
  {
    label: "Reproducer",
    desc: "Reimplement a published result and match the numbers",
    tealActive: false,
  },
  {
    label: "Contributor",
    desc: "A defensible novel increment — workshop or short paper",
    tealActive: true,
  },
  {
    label: "Lead",
    desc: "Drive a coherent multi-paper research agenda",
    tealActive: false,
  },
  {
    label: "Principal / Faculty",
    desc: "Define directions, advise, set the field",
    tealActive: false,
  },
] as const;

// ── Core research skills (§7 section 3) — Zod-validated at build time ───────
const skills = validateTopics([
  {
    concept: "The 3-pass paper reading method",
    whyItMatters:
      "Reading papers front-to-back once is the wrong strategy — it is slow, you miss the contribution, and you retain almost nothing. Keshav's 3-pass method (skim title/abstract/conclusion → read carefully skip proofs → study proofs with paper and pen) is the professional standard. Apply it to every paper from day one.",
    depth: "Production",
  },
  {
    concept: "Literature survey and synthesis",
    whyItMatters:
      "A research question already answered is not a research question. The literature survey is the first act of every serious project — finding the canonical papers, tracing their citations, identifying the gap your work addresses. This skill compounds: the more papers you have read, the faster you recognise novelty.",
    depth: "Expert",
  },
  {
    concept: "Reproducibility and honest benchmarking",
    whyItMatters:
      "ML has a reproducibility crisis. Reported numbers often depend on undisclosed hyperparameter sweeps, cherry-picked seeds, or mismatched baselines. Matching a paper's numbers exactly (same data split, same seed, same metric) is surprisingly hard — and the discipline of doing it exposes exactly where results are fragile.",
    depth: "Expert",
  },
  {
    concept: "Experimental design and ablations",
    whyItMatters:
      "A result without ablations is a demonstration, not a finding. Ablations answer 'which component actually caused the gain?' — they isolate variables the same way a controlled experiment does. A well-designed ablation table is often more valuable than the headline result.",
    depth: "Expert",
  },
  {
    concept: "Statistical rigour in evaluation",
    whyItMatters:
      "Reporting a single mean across three seeds is not rigour. The standard is: report mean and standard deviation across ≥5 seeds, compare against the strongest relevant baseline, and use a significance test if the margins are tight. Without this, you cannot distinguish signal from luck.",
    depth: "Expert",
  },
  {
    concept: "Scientific writing and the LaTeX toolchain",
    whyItMatters:
      "The clearest ideas in the worst prose get rejected. Academic writing has specific conventions — abstract structure, related work framing, contribution list, limitations section — that you learn by reading many papers and writing under review. LaTeX, BibTeX, and Overleaf are the required toolchain; learn them before you need them.",
    depth: "Production",
  },
  {
    concept: "The peer review process",
    whyItMatters:
      "Understanding how your work will be reviewed changes how you write it. Reviews are typically double-blind; reviewers allocate 1–3 hours to a paper; a paper that does not clearly state its contribution in the first two pages will not recover. Reviewing other papers yourself — as a sub-reviewer — is the fastest way to learn this.",
    depth: "Competent",
  },
  {
    concept: "Conference and journal venue landscape",
    whyItMatters:
      "Not all venues are equal. In ML: NeurIPS, ICML, ICLR are the top conferences; JMLR and TMLR are the top journals (TMLR is open, rolling). Subfield venues: ACL/EMNLP (NLP), CVPR/ECCV (vision), AAAI, UAI. Workshop papers are a legitimate entry point. Choosing the right venue for a contribution matters — over-targeting wastes time, under-targeting limits visibility.",
    depth: "Competent",
  },
  {
    concept: "Research ethics and the sociology of science",
    whyItMatters:
      "Fabrication and p-hacking end careers and set back entire fields. Practical ethics: never tune on the test set, always run ablations against the right baseline, attribute correctly, disclose negative results in papers. The harder questions — bias in datasets, dual-use implications, who benefits — are increasingly expected in published work.",
    depth: "Production",
  },
  {
    concept: "Building a research identity",
    whyItMatters:
      "Research is a social enterprise. An arXiv preprint, a GitHub repo that others cite, a presence at the right workshops — these compound over years. Start early: put code on GitHub, put preprints on arXiv, engage with the community. An advisor matters enormously — choose for research agenda fit and mentorship quality, not prestige alone.",
    depth: "Competent",
  },
]);

// ── Resources ────────────────────────────────────────────────────────────────
const stageResources = getResourcesByStage("research");

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <article className="space-y-0">
      {/* ── Stage header ─────────────────────────────────────────────────── */}
      <header className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded border border-teal/30 bg-teal/10 px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-ink">
            Research Track
          </span>
          <span className="inline-flex items-center rounded border border-teal/20 bg-teal/5 px-2 py-0.5 font-mono text-xs text-faded-ink">
            Branches after Stage 2
          </span>
        </div>

        <h1 className="mb-2 font-display text-4xl font-bold text-ink">
          Research Track
        </h1>
        <p className="mb-5 font-body text-xl text-faded-ink">
          You create new knowledge, not just apply it.
        </p>

        {/* Research ladder */}
        <ol
          aria-label="Research ladder — five rungs from reader to principal"
          className="mb-5 flex list-none flex-wrap gap-1.5 p-0"
        >
          {RESEARCH_RUNGS.map((rung, i) => (
            <li
              key={rung.label}
              className="flex items-center gap-1.5 rounded border border-teal/25 bg-teal/5 px-2.5 py-1 text-xs font-mono text-ink"
            >
              <span aria-hidden="true" className="font-semibold text-faded-ink">
                {i + 1}.
              </span>
              <span>
                {rung.label}
                <span className="sr-only"> — {rung.desc}</span>
              </span>
            </li>
          ))}
        </ol>

        <dl className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm text-faded-ink">
          <div className="flex gap-1.5">
            <dt className="text-ink">Branches from</dt>
            <dd>
              <Link href="/data-scientist" className="underline hover:text-ink">
                Data Scientist (Stage 2)
              </Link>
            </dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="text-ink">Timeline</dt>
            <dd>2+ years, pursued alongside or after Stage 2</dd>
          </div>
        </dl>
      </header>

      {/* ── 1. What this track actually is ───────────────────────────────── */}
      <StageSection id="what-it-is" title="What this track actually is">
        <Marginalia>
          Most practitioners read papers. Very few can reproduce them. Fewer
          still extend them. This is the difference between consuming knowledge
          and creating it.
        </Marginalia>

        <p className="mb-4 leading-relaxed text-faded-ink">
          The research track is not a job title. It is a{" "}
          <strong className="text-ink">mode of operation</strong> — a
          disposition toward open questions, rigorous evaluation, and the slow
          accumulation of genuine understanding. It branches from Stage 2
          because that is the first point where you have enough mathematical and
          methodological foundation to read the primary literature seriously.
        </p>
        <p className="mb-4 leading-relaxed text-faded-ink">
          Unlike the engineering stages, where progress is measured by systems
          shipped, research progress is measured by understanding produced. The
          artefacts look different: papers, proofs, reproductions, ablation
          tables, and eventually novel results. The time horizon is different
          too — a PhD is typically four to six years, and a single publishable
          result may take six months of failed attempts.
        </p>
        <p className="leading-relaxed text-faded-ink">
          The track runs in{" "}
          <strong className="text-ink">parallel with engineering</strong>, not
          after it. Many productive ML researchers are also capable engineers;
          many ML engineers develop genuine research taste. You do not have to
          choose. You do, however, have to be honest about the difference
          between building things and understanding things — and invest in both
          deliberately.
        </p>
      </StageSection>

      {/* ── 2. Core research skills ──────────────────────────────────────── */}
      <StageSection
        id="core-skills"
        title="Core research skills"
        eyebrow="§7 · Section 3"
      >
        <p className="mb-6 leading-relaxed text-faded-ink">
          These are the{" "}
          <strong className="text-ink">craft skills of research</strong> — the
          things every productive researcher does, regardless of subfield. The
          depth tags below indicate the minimum level required to contribute
          work to the research community.
        </p>
        <TopicChecklist topics={skills} />
      </StageSection>

      {/* ── 3. Mathematics: the non-negotiable gate ──────────────────────── */}
      <StageSection
        id="mathematics"
        title="Mathematics: the non-negotiable gate"
        eyebrow="§7 · Section 4"
      >
        <Marginalia>
          This is where most practitioners stop. The math required for serious
          research is real — but it is learnable. Treat it as a long-term
          parallel investment, not a prerequisite you must complete first.
        </Marginalia>

        <p className="mb-6 leading-relaxed text-faded-ink">
          The site is deliberately blunt about this:{" "}
          <strong className="text-ink">
            math depth is the gate between applying ML and understanding it
          </strong>
          . The{" "}
          <Link
            href="/mathematics"
            className="underline decoration-brass hover:text-ink"
          >
            /mathematics
          </Link>{" "}
          curriculum covers the full ladder. Below is what this track
          specifically requires, beyond what Stages 0–4 already demand.
        </p>

        <div className="space-y-6">
          {/* Minimum for research */}
          <div className="rounded border border-margin bg-paper/60 p-5">
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">
              Minimum: solid through the core trio
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              You need{" "}
              <Link
                href="/mathematics#linear-algebra"
                className="underline decoration-brass hover:text-ink"
              >
                linear algebra
              </Link>{" "}
              through SVD and eigendecompositions;{" "}
              <Link
                href="/mathematics#calculus-optimization"
                className="underline decoration-brass hover:text-ink"
              >
                calculus and matrix calculus
              </Link>{" "}
              through Jacobians and the chain rule in vector form;{" "}
              <Link
                href="/mathematics#probability-statistics"
                className="underline decoration-brass hover:text-ink"
              >
                probability
              </Link>{" "}
              through MLE, MAP, Bayesian inference, and conditional
              distributions. Without these, you cannot read the proofs in PRML
              or follow a theory talk at a top conference.
            </p>
          </div>

          {/* Research-grade depth */}
          <div className="rounded border border-teal/30 bg-teal/5 p-5">
            <h3 className="mb-3 font-display text-lg font-semibold text-ink">
              Research-grade: the advanced tier
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-faded-ink">
              These are the topics in{" "}
              <Link
                href="/mathematics#tier-3"
                className="underline decoration-brass hover:text-ink"
              >
                Tier 3 of the math curriculum
              </Link>
              . Build them in parallel with your research work — you will need
              each one as it becomes relevant to your subfield:
            </p>
            <ul className="space-y-2 text-sm text-faded-ink">
              {[
                [
                  "Real analysis essentials",
                  "Sequences, continuity, convergence — the foundation of everything that says 'this converges' or 'this is smooth.'",
                ],
                [
                  "Measure-theoretic probability",
                  "Needed for theory papers involving expectation over function classes, ergodic arguments, or concentration inequalities.",
                ],
                [
                  "Information theory",
                  "Entropy, KL divergence, mutual information — ubiquitous in deep learning theory, VAEs, RL, and compression.",
                ],
                [
                  "Statistical learning theory",
                  "PAC learning, VC dimension, Rademacher complexity, generalization bounds — the mathematical language for asking 'why does this generalise?'",
                ],
                [
                  "Advanced optimization",
                  "Duality, non-convex landscapes, saddle points, second-order methods — needed for understanding why gradient descent works, when it does not, and what the alternatives are.",
                ],
                [
                  "Probabilistic graphical models",
                  "Bayesian networks, Markov random fields, variational inference — the language of structured uncertainty; PRML and Murphy are the references.",
                ],
              ].map(([term, def]) => (
                <li key={term} className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-ink" aria-hidden="true">
                    ▸
                  </span>
                  <span>
                    <strong className="text-ink">{term}:</strong> {def}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </StageSection>

      {/* ── 4. Tools and scientific craft ────────────────────────────────── */}
      <StageSection
        id="tools"
        title="Tools and scientific craft"
        eyebrow="§7 · Section 5"
      >
        <p className="mb-5 leading-relaxed text-faded-ink">
          Research has its own tool stack. These are the ones that matter
          regardless of subfield.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              tool: "LaTeX + Overleaf",
              desc: "The mandatory writing toolchain. LaTeX for typesetting; BibTeX/natbib for citations; Overleaf for collaboration. Learn it before you need to submit a paper — the learning curve at deadline time is brutal.",
              level: "Production",
            },
            {
              tool: "arXiv + Google Scholar + Semantic Scholar",
              desc: "The three-tool literature stack. arXiv for preprints (most important ML work appears here first); Google Scholar for citations and 'cited by'; Semantic Scholar for influence graphs and related-work discovery.",
              level: "Production",
            },
            {
              tool: "Papers With Code",
              desc: "The fastest way to check SOTA and find reproducible implementations. Benchmark tables with linked code — use it before starting any baselines work.",
              level: "Production",
            },
            {
              tool: "Git + DVC",
              desc: "Git for code; DVC (Data Version Control) or similar for tracking experimental configurations, datasets, and model checkpoints. A reproducible experiment requires versioning both code and data.",
              level: "Production",
            },
            {
              tool: "Jupyter + Python scripts",
              desc: "Jupyter for exploration and visualisation; Python scripts for reproducible experiments (notebooks are not reproducible — scripts with fixed seeds are). The workflow: explore in a notebook, crystallise into a script, run sweeps from the script.",
              level: "Production",
            },
            {
              tool: "Zotero or similar",
              desc: "A reference manager for your personal paper library. Start using one immediately — the cost of not having an organised library compounds painfully once you are trying to write a related-work section.",
              level: "Competent",
            },
          ].map(({ tool, desc, level }) => (
            <div
              key={tool}
              className="rounded border border-margin bg-paper/60 p-4"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="font-body font-semibold text-ink">{tool}</span>
                <span
                  className={
                    level === "Production"
                      ? "inline-flex items-center rounded border border-route-red/20 bg-route-red/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink"
                      : "inline-flex items-center rounded border border-margin bg-margin px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-faded-ink"
                  }
                >
                  {level}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-faded-ink">{desc}</p>
            </div>
          ))}
        </div>
      </StageSection>

      {/* ── 5. The project ────────────────────────────────────────────────── */}
      <StageSection
        id="project"
        title="The project: reproduce → extend → write"
        eyebrow="§7 · Section 6"
      >
        <Marginalia>
          Reproduction sounds humble. It is not. Most published results do not
          fully reproduce on first attempt — and the gap between the paper and
          the numbers is where you learn the most.
        </Marginalia>

        <p className="mb-6 leading-relaxed text-faded-ink">
          The canonical research project arc has three acts. Each act is a
          legitimate endpoint — not everyone who starts research reaches the
          third.
        </p>

        <div className="space-y-5">
          {[
            {
              act: "Act 1 — Reproduce",
              duration: "4–8 weeks",
              badge: "Reader → Reproducer",
              description:
                "Choose a paper in your area with publicly available code and data. Your goal: match the reported numbers exactly — same evaluation metric, same test split, same model configuration. Do not stop at 'close.' If your numbers differ, find out why.",
              seniors:
                "Reproduce without using the authors' code — implement from the paper description only. Then compare your implementation against theirs and document every discrepancy.",
            },
            {
              act: "Act 2 — Extend",
              duration: "8–16 weeks",
              badge: "Reproducer → Contributor",
              description:
                "Take your working reproduction and introduce one well-motivated modification: a different architecture, a better baseline, a new evaluation dimension, an application to a new domain. Run a full ablation table. Write up the extension with a proper related-work section.",
              seniors:
                "Submit the extension to an appropriate workshop (NeurIPS/ICML/ICLR workshops, domain-specific workshops). A rejection with reviewer feedback is highly valuable — treat it as free expert mentorship.",
            },
            {
              act: "Act 3 — Write and submit",
              duration: "8–16 weeks",
              badge: "Contributor → Lead",
              description:
                "If Act 2 produced a defensible novel result, write it up to full-paper standard using the venue's template. Get feedback from at least two people outside your immediate team before submission. Submit to the appropriate venue.",
              seniors:
                "Build a coherent agenda: a set of 2–3 related papers that together address a larger question. This is what transitions a contributor into a lead — a multi-paper arc, not isolated results.",
            },
          ].map(({ act, duration, badge, description, seniors }) => (
            <div
              key={act}
              className="rounded border border-teal/25 bg-teal/5 p-5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {act}
                </h3>
                <span
                  className="inline-flex items-center rounded border border-teal/30 bg-teal/10 px-1.5 py-0.5 font-mono text-xs text-ink"
                  aria-label={badge.replace(" → ", " to ")}
                >
                  {badge}
                </span>
                <span className="font-mono text-xs text-faded-ink">
                  {duration}
                </span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-faded-ink">
                {description}
              </p>
              <div className="border-t border-teal/20 pt-3">
                <span className="inline-flex items-center rounded border border-teal/20 bg-teal/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                  Senior extension
                </span>
                <p className="mt-1 text-sm leading-relaxed text-faded-ink">
                  {seniors}
                </p>
              </div>
            </div>
          ))}
        </div>
      </StageSection>

      {/* ── 6. Resources ──────────────────────────────────────────────────── */}
      <StageSection id="resources" title="Resources" eyebrow="§7 · Section 7">
        <p className="mb-6 leading-relaxed text-faded-ink">
          Research draws on resources from every prior stage — the books below
          are the research-grade step up from ISLR and d2l. The key papers are
          the ones you must have read before claiming familiarity with the
          relevant area. The tools and practice resources are how you stay
          current.{" "}
          <strong className="text-ink">
            MML then ESL then PRML is the canonical reading sequence
          </strong>{" "}
          before tackling Murphy; Goodfellow is the reference for deep learning
          theory.
        </p>
        <ResourceGroups resources={stageResources} />
      </StageSection>

      {/* ── 7. How you know you're done (exit criteria per rung) ─────────── */}
      <StageSection
        id="done"
        title="How you know you're done — exit criteria per rung"
        eyebrow="§7 · Section 8"
      >
        <p className="mb-6 leading-relaxed text-faded-ink">
          Unlike the engineering stages, there is no single &ldquo;done.&rdquo;
          There are rungs — and each rung has concrete, testable criteria.
        </p>

        <div className="space-y-4">
          {[
            {
              rung: "Reader",
              criteria: [
                "You can read a paper in your area and accurately summarise its contribution, methodology, and limitations — without looking at someone else's summary.",
                "You can identify what is novel versus what is incremental in a paper.",
                "You can apply the 3-pass method reliably: first pass ≤ 10 minutes, full read ≤ 2 hours.",
              ],
              selfTest:
                "Pick a paper from a top venue published in the last 6 months. Without reading any blog post or summary: what is the core claim? What is the key experiment? What would have to be true for the claim to fail?",
            },
            {
              rung: "Reproducer",
              criteria: [
                "You have matched the headline numbers of at least one paper within expected variance (typically ±1–2% for classification metrics).",
                "You have documented every decision needed to reproduce the result: data split, random seed, hyperparameter choices, evaluation protocol.",
                "You have identified at least one thing the paper does not tell you that turned out to matter.",
              ],
              selfTest:
                "Hand your reproduction code and README to someone unfamiliar with the paper. Can they reproduce your numbers without asking you any questions?",
            },
            {
              rung: "Contributor",
              criteria: [
                "You have produced at least one result that is novel — not just better numbers on a known benchmark, but a genuinely new finding or a well-motivated new setting.",
                "You have run a full ablation table that isolates the contribution of each design choice.",
                "You have a written draft at workshop-paper length (4–6 pages) that someone outside your lab has read and critiqued.",
              ],
              selfTest:
                "If a reviewer asked 'why does your modification help?' — can you answer with evidence from your ablations, not intuition?",
            },
            {
              rung: "Lead",
              criteria: [
                "You can articulate a research agenda — a set of 2–3 connected questions where answering one opens the next.",
                "You have mentored at least one more junior researcher through Act 1 or Act 2.",
                "You have a publication record at recognisable venues.",
              ],
              selfTest:
                "In a 5-minute chalk talk: what is the open problem you are working on, why is it important, and what is your plan for the next 12 months?",
            },
            {
              rung: "Principal / Faculty",
              criteria: [
                "Others cite your work. Others build on it.",
                "You can attract talented people to your agenda.",
                "You have shaped the framing of a problem in your area — not just answered questions, but changed which questions are asked.",
              ],
              selfTest:
                "Could you write a compelling 2-page research statement that a hiring committee at a strong research institution would take seriously?",
            },
          ].map(({ rung, criteria, selfTest }) => (
            <div
              key={rung}
              className="rounded border border-teal/20 bg-teal/5 p-5"
            >
              <h3 className="mb-3 font-display text-lg font-semibold text-ink">
                {rung}
              </h3>
              <ul className="mb-4 space-y-1.5 text-sm text-faded-ink">
                {criteria.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className="mt-0.5 shrink-0 text-ink"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-teal/20 pt-3">
                <span className="inline-flex items-center rounded border border-teal/20 bg-teal/10 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
                  Self-test
                </span>
                <p className="mt-1 text-sm leading-relaxed text-faded-ink italic">
                  {selfTest}
                </p>
              </div>
            </div>
          ))}
        </div>
      </StageSection>

      {/* ── 8. Bridge ─────────────────────────────────────────────────────── */}
      <StageSection id="bridge" title="From here" eyebrow="§7 · Section 9">
        <p className="mb-6 leading-relaxed text-faded-ink">
          The research track has no defined terminal stage — Principal/Faculty
          is a career endpoint, not a curriculum one. From the Contributor rung
          onward, your development is driven by the field itself:{" "}
          <strong className="text-ink">
            follow the conferences, read arXiv regularly, and build community
          </strong>
          . The map below connects back to the full journey.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/mathematics"
            className="inline-flex items-center gap-1.5 rounded border border-teal/20 bg-teal/5 px-3 py-1.5 font-mono text-sm text-ink transition-colors hover:bg-teal hover:text-paper"
          >
            Mathematics curriculum →
          </Link>
          <Link
            href="/data-scientist"
            className="inline-flex items-center gap-1.5 rounded border border-teal/20 bg-teal/5 px-3 py-1.5 font-mono text-sm text-ink transition-colors hover:bg-teal hover:text-paper"
          >
            ← Back to Stage 2
          </Link>
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 rounded border border-margin bg-paper px-3 py-1.5 font-mono text-sm text-ink transition-colors hover:bg-margin"
          >
            View full map
          </Link>
        </div>
      </StageSection>
    </article>
  );
}
