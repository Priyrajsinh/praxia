"use client";

import { useEffect, useState } from "react";

/**
 * Document scroll progress in [0, 1] — drives the route's self-draw (§3.4).
 *
 * Pass `active = false` (under reduced motion) and the hook attaches nothing and
 * stays at 0; the caller forces the route to its fully-drawn state instead, so
 * there is genuinely no scroll-linked motion. When active, updates are
 * rAF-throttled and the first read is deferred into a rAF (not called inline in
 * the effect body) to stay clear of React 19's set-state-in-effect lint.
 *
 * Short pages (nothing to scroll) report 1, so the rail never sits half-drawn
 * with no way to complete it.
 */
export function useScrollProgress(active: boolean): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const next = max <= 0 ? 1 : window.scrollY / max;
      setProgress(Math.min(1, Math.max(0, next)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    frame = requestAnimationFrame(measure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active]);

  return active ? progress : 1;
}
