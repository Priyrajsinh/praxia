"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { search, type SearchResult } from "@/lib/search";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<SearchResult["kind"], string> = {
  stage: "Page",
  resource: "Resource",
  glossary: "Glossary",
};

const KIND_STYLE: Record<SearchResult["kind"], string> = {
  stage: "bg-teal/10 text-ink",
  resource: "bg-route-red/10 text-ink",
  glossary: "bg-brass/15 text-ink",
};

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();

  // Derive results directly from query â€” no setState in an effect
  const results = useMemo(() => (query.trim() ? search(query) : []), [query]);

  // Clamp so keyboard index never goes out of range when results change
  const safeIdx =
    results.length > 0 ? Math.min(activeIdx, results.length - 1) : 0;

  // Open/close the native <dialog> element
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      el.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      el.close();
    }
  }, [open]);

  // Reset state when the dialog closes (Esc key or programmatic close).
  // setState is inside the event-listener callback, not directly in the effect
  // body â€” avoids the react-hooks/set-state-in-effect lint rule.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    function handleClose() {
      setQuery("");
      setActiveIdx(0);
      onClose();
    }
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onClose]);

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[safeIdx]) {
      navigate(results[safeIdx].href);
    }
  }

  // Close when user clicks the backdrop (outside the dialog box)
  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-label="Site search"
      className={cn(
        "m-auto w-full max-w-lg overflow-hidden rounded border border-margin bg-paper p-0 shadow-xl",
        "[&::backdrop]:bg-ink/30",
      )}
    >
      {/* Input row */}
      <div className="flex items-center gap-3 border-b border-margin px-4 py-3">
        <Search size={15} className="shrink-0 text-faded-ink" aria-hidden />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="search"
          placeholder="Search resources, glossary, pagesâ€¦"
          className="flex-1 bg-transparent font-body text-sm text-ink outline-none placeholder:text-faded-ink"
          aria-label="Search Praxia"
          aria-controls="search-results-list"
          aria-activedescendant={
            results[safeIdx] ? `sr-${results[safeIdx].id}` : undefined
          }
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={onClose}
          className="shrink-0 rounded p-0.5 text-faded-ink hover:bg-margin hover:text-ink"
          aria-label="Close search"
        >
          <X size={14} />
        </button>
      </div>

      {/* Results area */}
      <div className="max-h-[55vh] overflow-y-auto">
        {!query && (
          <p className="px-5 py-5 text-center font-hand text-sm text-faded-ink">
            Start typing â€” resources, glossary, stages, and pages.
          </p>
        )}

        {query && results.length === 0 && (
          <p className="px-5 py-6 text-center font-body text-sm text-faded-ink">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {results.length > 0 && (
          <ul
            id="search-results-list"
            role="listbox"
            aria-label="Search results"
            className="py-2"
          >
            {results.map((result, i) => (
              <li key={result.id} role="presentation">
                <button
                  id={`sr-${result.id}`}
                  role="option"
                  aria-selected={i === safeIdx}
                  onClick={() => navigate(result.href)}
                  onMouseEnter={() => setActiveIdx(i)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors",
                    i === safeIdx ? "bg-margin" : "hover:bg-margin/50",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-wide",
                      KIND_STYLE[result.kind],
                    )}
                    aria-hidden
                  >
                    {KIND_LABEL[result.kind]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-body text-sm font-semibold text-ink">
                      {result.title}
                    </p>
                    <p className="truncate font-mono text-xs text-faded-ink">
                      {result.subtitle}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
