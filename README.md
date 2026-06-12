# Praxia

**A curated, opinionated roadmap for the Data → AI career and research journey.**

**[→ priyrajsinh-praxia.vercel.app](https://priyrajsinh-praxia.vercel.app)**

---

[![Version](https://img.shields.io/badge/version-0.1.0-informational)](https://github.com/Priyrajsinh/praxia/releases/tag/v0.1.0)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](<https://img.shields.io/badge/license-MIT%20(code)-green>)](LICENSE)
[![Live](https://img.shields.io/badge/live-vercel-black?logo=vercel)](https://priyrajsinh-praxia.vercel.app)

---

[![Praxia — route map and stage view](docs/screenshot.png)](https://priyrajsinh-praxia.vercel.app)

---

## What this is

Most learning roadmaps in this field are either vague link dumps or shallow "get hired in 3 months" guides. Praxia is neither. It maps the complete progression — Foundations → Data Analyst → Data Scientist → ML Engineer → AI Engineer, with a parallel Research track — and for each stage specifies exactly what to learn, in what order, to what depth, with an honest verdict on every resource.

The product's value is **sequencing and curation, not raw links**. It tells a motivated person not just _what_ to study, but _why that order_ and _when they can move on_. It treats the reader as capable of doing the real work.

I built this because I was the target user. Navigating this field without a clear map costs months — you overcorrect toward tutorials, miss the math you'll need later, and can't distinguish "good enough to use" from "good enough to know deeply." This is the map I wish I'd had. I'm still walking it, which means the curation stays honest: I'm not claiming mastery, I'm sharing the sequence that actually makes sense from inside the work.

> **Why trust this curation?** The value isn't the links — those are publicly findable. It's the judgments: which book to start with versus which one to read second, what to skip entirely, where the free option beats the paid one, and where the apparent shortcut creates a gap you'll hit two stages later. Every resource has a one-sentence verdict and a "use this if…" clause. Paid resources are labelled. Anything that might go stale is flagged for review. Opinionated because vague recommendations aren't recommendations.

---

## Features

**The product**

- Five-stage progression — Foundations → Data Analyst → Data Scientist → ML Engineer → AI Engineer — each with concepts, mathematics, tools, a portfolio project, and exit criteria
- Parallel Research track branching from Stage 2, running to Principal/Faculty
- ~50 curated resources across all stages; every entry has a cost label, honest verdict, and "use this if…" guidance
- Full mathematics curriculum (Tiers 1–3) with KaTeX-rendered notation, cross-referenced from every stage
- 60+ term glossary, A–Z with jump nav, every term cross-linked to where it is taught in depth

**The interface**

- Hand-drawn SVG route spine — a slightly irregular ink path (not a CSS line) that self-draws as you scroll, with a brass "you are here" marker that tracks position
- `/map` — interactive full-journey overview with the teal Research branch forking off Stage 2
- Stage progress persistence via `localStorage` — mark stages complete; state is shared between the spine and the map
- `Cmd+K` full-text search across all resources, glossary terms, and pages — no external library, sub-1ms on the full corpus
- `/resources` master library — filter by type, cost, level, and stage simultaneously; hover-reveal cards showing the honest verdict

**Quality**

- WCAG AA contrast verified; keyboard-navigable end-to-end; `prefers-reduced-motion` respected
- Dark/light mode — warm ink-on-paper in both; never the cold navy AI default
- 21 routes fully static; KaTeX CSS scoped to `/mathematics` only; dynamic OG image via edge runtime
- Per-page title, meta description, OpenGraph, Twitter card, JSON-LD `Course` schema, `sitemap.xml`, `robots.txt`

---

## Tech stack

| Layer       | Choice                                                            | Why                                                                           |
| ----------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Framework   | Next.js 16.2.9 (App Router)                                       | Static generation for all 21 routes; edge runtime for OG image                |
| Language    | TypeScript 5                                                      | End-to-end type safety; Zod 4 for runtime schema validation at build time     |
| Styling     | Tailwind CSS v4                                                   | CSS-first config; all design tokens as CSS custom properties in `globals.css` |
| Content     | Stage `.tsx` files + `resources.ts`                               | Editable data files with no CMS overhead; Zod-validated at build time         |
| Math        | MDX + remark-math + rehype-katex                                  | KaTeX rendering scoped to `/mathematics` — no cost on other routes            |
| Search      | Hand-rolled substring scoring                                     | ~170-entry corpus is sub-1ms; zero bundle weight vs FlexSearch/Pagefind       |
| Fonts       | `next/font/google` — Fraunces, Newsreader, Caveat, JetBrains Mono | Self-hosted via Next.js; no external font requests                            |
| Persistence | `localStorage`                                                    | Progress tracking with no backend, no auth, no friction                       |
| Hosting     | Vercel                                                            | Automatic deploys on push to `main`; edge network for OG image route          |

---

## Getting started

**Prerequisites**

- Node.js ≥ 24.16.0 — see `.nvmrc`. With nvm: `nvm use`
- npm (the repo ships a `package-lock.json`)

**Clone, install, run**

```bash
git clone https://github.com/Priyrajsinh/praxia.git
cd praxia
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack.

**Production build**

```bash
npm run build   # typecheck + compile + prerender all 21 routes
npm start       # serve the built output locally
```

---

## Project structure

```
src/
  app/
    page.tsx              # Landing page
    layout.tsx            # Root layout — shell, fonts, metadata, JSON-LD Course schema
    [stage]/page.tsx      # Stage routes: foundations, data-analyst, data-scientist,
                          #   machine-learning-engineer, ai-engineer, research
    mathematics/          # Full math curriculum — page.mdx (KaTeX-rendered)
    resources/            # Master resource library — filterable, client-side
    glossary/             # Glossary A–Z with letter jump nav
    map/                  # Interactive full-journey SVG overview
    sitemap.ts            # → /sitemap.xml
    robots.ts             # → /robots.txt
    opengraph-image.tsx   # Dynamic 1200×630 OG image — edge runtime
    icon.svg              # SVG favicon

  components/
    layout/               # Header, footer, reading-shell, theme toggle
    spine/                # Hand-drawn SVG route line + scroll-driven brass marker
    stage/                # StageSection, DepthLadder, ResourceCard, TopicChecklist,
                          #   Marginalia, CrossCuttingSidebar
    resources/            # /resources client — filter pills + flip cards
    search/               # Cmd+K dialog — native <dialog>, keyboard-accessible
    gate/                 # Gate stub — GateWall + GateDemoToggle (cosmetic, v1)
    map/                  # /map SVG component

  lib/
    resources.ts          # ← single source of truth for all ~50 resources
    schema.ts             # Zod schemas — Resource, Topic, StageMeta
    search.ts             # Search index + substring scoring
    journey.ts            # SVG path geometry — shared by spine + map
    nav.ts                # Navigation structure

public/
  sketches/               # Ink-sketch SVG illustrations
```

---

## Scripts

| Command                | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Next.js dev server with Turbopack and hot reload      |
| `npm run build`        | Full build — typecheck, compile, prerender all routes |
| `npm start`            | Serve the built `.next/` output locally               |
| `npm run lint`         | ESLint                                                |
| `npm run typecheck`    | `tsc --noEmit` — type errors only, no emit            |
| `npm run format`       | Prettier — rewrite all files in place                 |
| `npm run format:check` | Prettier — check only; exits non-zero if dirty (CI)   |

Before committing: `npm run lint && npm run typecheck && npm run build`

---

## Editing content

**Resources** — `src/lib/resources.ts`
The single source of truth for every external resource. Each entry is Zod-validated at build time — a missing required field or a bad URL fails the build. Never add a URL you haven't verified.

**Stage curriculum** (concepts, mathematics, projects, exit criteria)

```
src/app/foundations/page.tsx
src/app/data-analyst/page.tsx
src/app/data-scientist/page.tsx
src/app/machine-learning-engineer/page.tsx
src/app/ai-engineer/page.tsx
src/app/research/page.tsx
```

The route file is the content file. Edit it directly — template components (`<StageSection>`, `<DepthLadder>`, `<TopicChecklist>`) are curriculum-agnostic; no component code changes when content changes.

**Mathematics** — `src/app/mathematics/page.mdx`
Standard MDX with LaTeX math (`$...$` inline, `$$...$$` display). KaTeX renders at build time.

**Glossary** — `src/app/glossary/page.tsx`
Edit the terms array at the top of the file.

---

## Conventions

- **TypeScript throughout.** No `any`; types serve as documentation.
- **Conventional commits** — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`. Short, specific messages.
- **Content lives in data files.** If you're editing a component to change copy, that copy belongs in a data file instead.
- **No invented URLs.** Every link in `resources.ts` must be a verified URL. Use `needsReview: true` for anything that may change — AI tooling, model docs, rapidly-evolving libraries.

---

## License

**Code:** MIT — see [LICENSE](LICENSE). Covers components, configuration, and build tooling.

**Content:** All rights reserved. The curation — resource selections, editorial verdicts, stage sequencing, and curriculum structure — is original work not covered by the code license. Linking to any page is fine; reproducing the curation in bulk is not.

---

## Acknowledgements

The major free resources this site recommends most frequently:

| Resource                                       | Authors                           | Link                                                                                |
| ---------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------- |
| An Introduction to Statistical Learning (ISLR) | James, Witten, Hastie, Tibshirani | [statlearning.com](https://www.statlearning.com)                                    |
| The Elements of Statistical Learning (ESL)     | Hastie, Tibshirani, Friedman      | [hastie.su.domains/ElemStatLearn](https://hastie.su.domains/ElemStatLearn/)         |
| Mathematics for Machine Learning (MML)         | Deisenroth, Faisal, Ong           | [mml-book.github.io](https://mml-book.github.io)                                    |
| fast.ai                                        | Jeremy Howard & Rachel Thomas     | [fast.ai](https://www.fast.ai)                                                      |
| StatQuest with Josh Starmer                    | Josh Starmer                      | [YouTube](https://www.youtube.com/@statquest)                                       |
| Dive into Deep Learning (d2l.ai)               | Zhang, Lipton, Li, Smola          | [d2l.ai](https://d2l.ai)                                                            |
| CS50x                                          | Harvard / David Malan             | [cs50.harvard.edu/x](https://cs50.harvard.edu/x/)                                   |
| Neural Networks: Zero to Hero                  | Andrej Karpathy                   | [YouTube](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ) |

Recommended because they are the best available for their respective topics — not because of any commercial relationship.

---

## Related work

Projects where I applied the ideas this map describes:

| Project                                                                                                               | Stage   | What it demonstrates                                                                                      |
| --------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| [Conformal prediction — medical AI](https://github.com/Priyrajsinh/Conformal-Prediction-Uncertainty-Aware-Medical-AI) | Stage 2 | XGBoost + MAPIE conformal prediction on UCI Heart Disease; coverage-guaranteed uncertainty quantification |
| [Causal ML / heterogeneous treatment effects](https://github.com/Priyrajsinh/causal-ml-hte)                           | Stage 2 | Double ML causal inference with SHAP and a deployed dashboard                                             |
| [Real-time ML drift monitoring](https://github.com/Priyrajsinh/RealTime-ML-Drift-Monitoring)                          | Stage 3 | PSI, KS test, SHAP, and Evidently in a live production monitoring pipeline                                |
| [Predictive maintenance — RUL forecasting](https://github.com/Priyrajsinh/before-it-breaks)                           | Stage 3 | LSTM-based Remaining Useful Life forecasting on NASA CMAPSS jet-engine data                               |
| [Hybrid LLM jailbreak detector](https://github.com/Priyrajsinh/Hybrid-LLM-Jailbreak-Detector)                         | Stage 4 | Multi-signal safety classifier — 99.88% detection accuracy                                                |

The map is only as trustworthy as the work behind it. These are the receipts.
