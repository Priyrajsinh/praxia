/**
 * Single source of truth for every external resource in The Atlas.
 *
 * Intentionally empty for now — the typed Zod schema and the authored entries
 * land in Phase 3 (`/day4`). Stage pages and the /resources master page will
 * both read from this one array, so resources are never duplicated.
 *
 * HARD RULE (CONTEXT_FOR_CLAUDE_CODE.md Part A / Part C): every link added here
 * must come from a verified Part A source. Never invent or guess a link.
 */
export type Resource = {
  // Replaced by the full §9 metadata schema (Zod-derived) in /day4.
  // Placeholder shape so imports typecheck before the schema exists.
  id: string;
};

export const resources: Resource[] = [];
