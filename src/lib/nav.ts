/**
 * Site navigation — single source of truth for the header, footer, and (later)
 * the route spine. Routes mirror PROJECT_PLAN §5. Kept as data, not hardcoded
 * into components, so the IA is edited in one place.
 */

export type NavLink = {
  href: string;
  label: string;
  /** Short rail label for the spine / "Stage N" eyebrow, where relevant. */
  stage?: string;
};

/** The progression spine (§6): Foundations → AI Engineer. Order is meaningful. */
export const stageLinks: NavLink[] = [
  { href: "/foundations", label: "Foundations", stage: "Stage 0" },
  { href: "/data-analyst", label: "Data Analyst", stage: "Stage 1" },
  { href: "/data-scientist", label: "Data Scientist", stage: "Stage 2" },
  {
    href: "/machine-learning-engineer",
    label: "ML Engineer",
    stage: "Stage 3",
  },
  { href: "/ai-engineer", label: "AI Engineer", stage: "Stage 4" },
];

/** Cross-cutting sections that every stage links into. */
export const sectionLinks: NavLink[] = [
  { href: "/map", label: "Map" },
  { href: "/research", label: "Research" },
  { href: "/mathematics", label: "Mathematics" },
  { href: "/resources", label: "Resources" },
  { href: "/glossary", label: "Glossary" },
  { href: "/how-to-use", label: "How to use" },
  { href: "/about", label: "About" },
];

/** Legal / housekeeping stubs (Part B1) — footer only. */
export const legalLinks: NavLink[] = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/notes", label: "Notes" },
];

export const primaryNav: NavLink[] = [...stageLinks, ...sectionLinks];
