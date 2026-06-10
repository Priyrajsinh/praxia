import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let `.mdx` / `.md` files be routes and components (e.g. app/mathematics/page.mdx).
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Pin the workspace root so Turbopack doesn't infer it from a stray lockfile
  // elsewhere on the machine (e.g. a ~/package-lock.json). Keeps builds clean.
  turbopack: {
    root: import.meta.dirname,
  },
};

// MDX → math pipeline (PROJECT_PLAN §4): remark-math parses `$…$`/`$$…$$`,
// rehype-katex renders it to HTML (KaTeX CSS is imported in app/layout.tsx).
// NOTE: under Turbopack (Next 16 default) plugins must be given as serializable
// string names, NOT imported function references — otherwise the build throws.
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-math"]],
    rehypePlugins: [["rehype-katex"]],
  },
});

export default withMDX(nextConfig);
