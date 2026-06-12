"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ResourceCard } from "@/components/stage/resource-card";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/schema";
import {
  type ResourceType,
  type ResourceLevel,
  type ResourceCost,
  type StageSlug,
} from "@/lib/schema";

// ── Filter configuration ──────────────────────────────────────────────────────

const TYPE_OPTIONS: (ResourceType | "All")[] = [
  "All",
  "Book",
  "Course",
  "Video",
  "Paper",
  "Docs",
  "Tool",
  "Blog",
];

const LEVEL_OPTIONS: (ResourceLevel | "All")[] = [
  "All",
  "Foundations",
  "Competent",
  "Production",
  "Expert",
  "Research",
];

const COST_OPTIONS: (ResourceCost | "All")[] = [
  "All",
  "Free",
  "Freemium",
  "Paid",
];

const STAGE_OPTIONS: { slug: StageSlug | "All"; label: string }[] = [
  { slug: "All", label: "All stages" },
  { slug: "foundations", label: "Foundations" },
  { slug: "data-analyst", label: "Data Analyst" },
  { slug: "data-scientist", label: "Data Scientist" },
  { slug: "ml-engineer", label: "ML Engineer" },
  { slug: "ai-engineer", label: "AI Engineer" },
  { slug: "research", label: "Research" },
  { slug: "mathematics", label: "Mathematics" },
];

// ── Filter state ──────────────────────────────────────────────────────────────

type Filters = {
  type: ResourceType | "All";
  level: ResourceLevel | "All";
  cost: ResourceCost | "All";
  stage: StageSlug | "All";
  query: string;
};

const DEFAULT_FILTERS: Filters = {
  type: "All",
  level: "All",
  cost: "All",
  stage: "All",
  query: "",
};

// ── Filtering logic ───────────────────────────────────────────────────────────

function applyFilters(resources: Resource[], filters: Filters): Resource[] {
  return resources.filter((r) => {
    if (filters.type !== "All" && r.type !== filters.type) return false;
    if (filters.level !== "All" && r.level !== filters.level) return false;
    if (filters.cost !== "All" && r.cost !== filters.cost) return false;
    if (
      filters.stage !== "All" &&
      !r.stages.includes(filters.stage as StageSlug)
    )
      return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const text =
        `${r.title} ${r.author} ${r.verdict} ${r.useIf}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
}

// ── Filter pill button ────────────────────────────────────────────────────────

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded px-2.5 py-1 font-mono text-xs transition-colors",
        active
          ? "bg-route-red/10 border border-route-red/30 text-ink font-semibold"
          : "border border-margin text-faded-ink hover:border-ink/30 hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}

// ── Filter row ────────────────────────────────────────────────────────────────

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
  getLabel,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  getLabel?: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wider text-faded-ink w-10">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <Pill
            key={opt}
            label={getLabel ? getLabel(opt) : opt}
            active={value === opt}
            onClick={() => onChange(opt)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main client component ────────────────────────────────────────────────────

interface ResourcesClientProps {
  resources: Resource[];
}

export function ResourcesClient({ resources }: ResourcesClientProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filtered = useMemo(
    () => applyFilters(resources, filters),
    [resources, filters],
  );

  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const hasActiveFilter =
    filters.type !== "All" ||
    filters.level !== "All" ||
    filters.cost !== "All" ||
    filters.stage !== "All" ||
    filters.query !== "";

  return (
    <>
      {/* Filter panel */}
      <section
        aria-label="Filter resources"
        className="mb-8 space-y-3 rounded border border-margin bg-margin/30 p-4"
      >
        {/* Text search */}
        <div className="flex items-center gap-2 rounded border border-margin bg-paper px-3 py-2">
          <Search size={13} className="shrink-0 text-faded-ink" aria-hidden />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => set("query", e.target.value)}
            placeholder="Search titles, authors, verdicts…"
            className="flex-1 bg-transparent font-body text-sm text-ink outline-none placeholder:text-faded-ink"
            aria-label="Search within resources"
          />
          {filters.query && (
            <button
              onClick={() => set("query", "")}
              className="font-mono text-xs text-faded-ink hover:text-ink"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Type filter */}
        <FilterRow
          label="Type"
          options={TYPE_OPTIONS}
          value={filters.type}
          onChange={(v) => set("type", v)}
        />

        {/* Cost filter */}
        <FilterRow
          label="Cost"
          options={COST_OPTIONS}
          value={filters.cost}
          onChange={(v) => set("cost", v)}
        />

        {/* Level filter */}
        <FilterRow
          label="Level"
          options={LEVEL_OPTIONS}
          value={filters.level}
          onChange={(v) => set("level", v)}
        />

        {/* Stage filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="shrink-0 w-10 font-mono text-[0.65rem] uppercase tracking-wider text-faded-ink">
            Stage
          </span>
          <div className="flex flex-wrap gap-1.5">
            {STAGE_OPTIONS.map(({ slug, label }) => (
              <Pill
                key={slug}
                label={label}
                active={filters.stage === slug}
                onClick={() => set("stage", slug as StageSlug | "All")}
              />
            ))}
          </div>
        </div>

        {/* Clear all */}
        {hasActiveFilter && (
          <div className="pt-1">
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="font-mono text-xs text-faded-ink hover:text-ink underline underline-offset-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Result count */}
      <p className="mb-5 font-mono text-xs text-faded-ink">
        {filtered.length === resources.length
          ? `${resources.length} resources`
          : `${filtered.length} of ${resources.length} resources`}
      </p>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="rounded border border-margin bg-margin/20 px-6 py-10 text-center">
          <p className="font-hand text-lg text-faded-ink">
            No resources match these filters.
          </p>
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="mt-3 font-mono text-xs text-faded-ink hover:text-ink underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} variant="flip" />
          ))}
        </div>
      )}
    </>
  );
}
