/**
 * Cross-cutting skills (PROJECT_PLAN §11) — practised at every stage, never
 * "done." Content lives here so the sidebar component is curriculum-agnostic.
 */

export type CrossCuttingSkill = {
  id: string;
  name: string;
  tagline: string;
  /** One concrete, observable signal that this skill is developing. */
  signal: string;
};

export const crossCuttingSkills: CrossCuttingSkill[] = [
  {
    id: "software-craft",
    name: "Software craft",
    tagline: "Code is read more than it is written.",
    signal: "You refactor before you ship, not after it breaks.",
  },
  {
    id: "communication",
    name: "Communication",
    tagline: "A finding that changes nothing was a waste of time.",
    signal:
      "Non-technical colleagues repeat your conclusion in their own words.",
  },
  {
    id: "tooling",
    name: "Tooling fluency",
    tagline: "Know your instruments — they shape what you can think.",
    signal: "You reach for the debugger before the print statement.",
  },
  {
    id: "scientific-thinking",
    name: "Scientific thinking",
    tagline: "State the hypothesis before running the experiment.",
    signal: "You design the measurement before you build the feature.",
  },
  {
    id: "learning-to-learn",
    name: "Learning to learn",
    tagline: "Primary sources over summaries. Teaching over watching.",
    signal: "You read the paper, not just the tweet thread about the paper.",
  },
  {
    id: "ethics",
    name: "Ethics and responsibility",
    tagline: "Optimising for the wrong metric is worse than not optimising.",
    signal: "You ask 'who is harmed by this?' before shipping anything.",
  },
];
