"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin wrapper around next-themes. Flips the `.dark` class on <html>, which the
 * Field Notebook token sets in globals.css respond to (warm-light ⇄ warm-dark).
 * next-themes injects a blocking inline script so there's no flash of the wrong
 * theme, persists the choice to localStorage, and defaults to the OS preference.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
