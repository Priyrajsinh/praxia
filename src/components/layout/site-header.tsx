"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { SearchDialog } from "@/components/search/search-dialog";

/** A link is "current" when the path matches or sits beneath it. */
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Cmd+K / Ctrl+K opens search from anywhere on the page
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-margin bg-paper">
        <div className="mx-auto flex max-w-screen-xl items-center gap-3 px-6 py-3">
          <Link
            href="/"
            className="shrink-0 font-display text-xl font-semibold tracking-tight text-ink"
          >
            Praxia
          </Link>

          <nav
            aria-label="Primary"
            className="-mx-1 flex flex-1 overflow-x-auto px-1"
          >
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-margin font-medium text-ink"
                          : "text-faded-ink hover:bg-margin/60 hover:text-ink",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex shrink-0 items-center gap-1.5 rounded border border-margin px-2 py-1.5 text-faded-ink transition-colors hover:bg-margin/60 hover:text-ink"
          >
            <Search size={13} aria-hidden />
            <kbd className="hidden font-mono text-[0.65rem] sm:inline">⌘K</kbd>
          </button>

          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
