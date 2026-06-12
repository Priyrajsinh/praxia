/**
 * Client-side search across all Praxia content.
 *
 * No external library — simple substring scoring over a ~120-entry corpus is
 * sub-1ms on any device. Pagefind (post-build HTML indexing) and FlexSearch
 * (complex TS types in v1) were both considered and rejected.
 *
 * Corpus: resources.ts + glossary.ts + static page entries.
 * Called from SearchDialog (client component) — module is bundled client-side.
 */
import { resources } from "./resources";
import { glossaryTerms } from "./glossary";

export type SearchKind = "resource" | "glossary" | "stage";

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  snippet: string;
  href: string;
  kind: SearchKind;
};

const STAGE_ENTRIES: SearchResult[] = [
  {
    id: "page-foundations",
    title: "Foundations",
    subtitle: "Stage 0",
    snippet:
      "The prerequisite bedrock — Python, Git, SQL, the terminal, algorithmic thinking, and the mathematics you need before everything else.",
    href: "/foundations",
    kind: "stage",
  },
  {
    id: "page-data-analyst",
    title: "Data Analyst",
    subtitle: "Stage 1",
    snippet:
      "Turn questions into evidence — hypothesis testing, inference, confidence intervals, visualisation, dashboards, A/B experiments.",
    href: "/data-analyst",
    kind: "stage",
  },
  {
    id: "page-data-scientist",
    title: "Data Scientist",
    subtitle: "Stage 2",
    snippet:
      "Build models that predict and explain — classical ML, deep learning, uncertainty quantification, interpretability, causal inference.",
    href: "/data-scientist",
    kind: "stage",
  },
  {
    id: "page-ml-engineer",
    title: "Machine Learning Engineer",
    subtitle: "Stage 3",
    snippet:
      "Make models work reliably in production — MLOps, PyTorch, serving, monitoring, containers, distributed training.",
    href: "/machine-learning-engineer",
    kind: "stage",
  },
  {
    id: "page-ai-engineer",
    title: "AI Engineer",
    subtitle: "Stage 4",
    snippet:
      "Build systems on foundation models — LLMs, RAG, agents, evaluation, fine-tuning, safety, production realities.",
    href: "/ai-engineer",
    kind: "stage",
  },
  {
    id: "page-research",
    title: "Research Track",
    subtitle: "Branches from Stage 2",
    snippet:
      "Create new knowledge — reading papers, reproducibility, writing, the conference landscape, choosing a thesis direction.",
    href: "/research",
    kind: "stage",
  },
  {
    id: "page-mathematics",
    title: "Mathematics",
    subtitle: "Cross-stage curriculum",
    snippet:
      "Linear algebra, calculus, probability, statistics, optimization — sequenced from Foundations through to research-grade depth.",
    href: "/mathematics",
    kind: "stage",
  },
  {
    id: "page-glossary",
    title: "Glossary",
    subtitle: "Term reference",
    snippet:
      "Every term used across the Praxia map, defined in the site's own words with links to where each concept is taught in depth.",
    href: "/glossary",
    kind: "stage",
  },
  {
    id: "page-how-to-use",
    title: "How to Use",
    subtitle: "Study methodology",
    snippet:
      "How to navigate the map — primary sources over tutorials, spaced practice, projects, teaching-to-learn, honest framing.",
    href: "/how-to-use",
    kind: "stage",
  },
  {
    id: "page-about",
    title: "About",
    subtitle: "The site",
    snippet:
      "The practitioner's story behind Praxia — who made it, why, and the statistical report as proof of the work.",
    href: "/about",
    kind: "stage",
  },
  {
    id: "page-resources",
    title: "Resources",
    subtitle: "Master library",
    snippet:
      "Every recommended book, course, paper, and doc — with filters, search, honest verdicts, and free picks flagged.",
    href: "/resources",
    kind: "stage",
  },
];

let _corpus: SearchResult[] | null = null;

export function buildCorpus(): SearchResult[] {
  if (_corpus) return _corpus;

  const resourceEntries: SearchResult[] = resources.map((r) => ({
    id: `resource-${r.id}`,
    title: r.title,
    subtitle: `${r.type} · ${r.cost} · ${r.level}`,
    snippet: r.verdict,
    href: `/resources#${r.id}`,
    kind: "resource" as const,
  }));

  const glossaryEntries: SearchResult[] = glossaryTerms.map((g) => ({
    id: `glossary-${g.term}`,
    title: g.term,
    subtitle: "Glossary",
    snippet: g.definition.slice(0, 140),
    href: `/glossary#letter-${g.term.charAt(0).toUpperCase()}`,
    kind: "glossary" as const,
  }));

  _corpus = [...STAGE_ENTRIES, ...resourceEntries, ...glossaryEntries];
  return _corpus;
}

function scoreEntry(query: string, entry: SearchResult): number {
  const q = query.toLowerCase();
  const title = entry.title.toLowerCase();
  const subtitle = entry.subtitle.toLowerCase();
  const snippet = entry.snippet.toLowerCase();

  if (title === q) return 20;
  if (title.startsWith(q)) return 15;
  if (title.includes(q)) return 10;
  if (subtitle.includes(q)) return 5;
  if (snippet.includes(q)) return 3;
  return 0;
}

export function search(query: string, limit = 14): SearchResult[] {
  if (!query.trim()) return [];
  const corpus = buildCorpus();
  return corpus
    .map((entry) => ({ entry, s: scoreEntry(query, entry) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ entry }) => entry);
}
