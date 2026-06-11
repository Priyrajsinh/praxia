"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks `prefers-reduced-motion: reduce` reactively (PROJECT_PLAN §3.6, §3.8).
 * Implemented with `useSyncExternalStore` over `matchMedia` rather than a
 * setState-in-effect mount toggle — hydration-safe (the server snapshot is
 * `false`, corrected on the client) and re-renders if the OS setting changes
 * mid-session.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
