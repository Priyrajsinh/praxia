import type { MDXComponents } from "mdx/types";

/**
 * App Router MDX hook (required by @next/mdx). Every `.mdx` route/import is
 * rendered through these component overrides.
 *
 * For Phase 1 we lean on the global reading-column styles in globals.css
 * (`.reading-column :where(...)`) so MDX prose matches authored TSX pages.
 * Stage-specific MDX components (resource cards, depth tags, etc.) get wired
 * here in Phase 3.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
