import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't infer it from a stray lockfile
  // elsewhere on the machine (e.g. a ~/package-lock.json). Keeps builds clean.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
