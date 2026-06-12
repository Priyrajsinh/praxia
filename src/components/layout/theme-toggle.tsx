"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// Hydration-safe "am I on the client yet?" â€” false on the server snapshot, true
// on the client snapshot, with no setState-in-effect (which React 19's
// react-hooks lint flags). next-themes can't know the resolved theme during SSR,
// so we render an inert placeholder until this flips true.
const noopSubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Warm-dark / light toggle. The token-coloured focus ring comes from the global
 * :focus-visible rule.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      className="inline-flex size-9 items-center justify-center rounded-md border border-margin text-faded-ink transition-colors hover:bg-margin hover:text-ink"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4.5" aria-hidden />
        ) : (
          <Moon className="size-4.5" aria-hidden />
        )
      ) : (
        // Reserve the glyph's space pre-hydration to avoid layout shift.
        <span className="size-4.5" aria-hidden />
      )}
    </button>
  );
}
