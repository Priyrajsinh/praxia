import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/schema";

// text-ink used where the accent colour fails WCAG AA at 0.65rem on its tinted bg.
// The bg tint carries the colour cue; the text stays readable.
const TYPE_STYLES: Record<Resource["type"], string> = {
  Book: "bg-margin text-ink",
  Course: "bg-teal/10 text-ink",
  Paper: "bg-route-red/10 text-ink",
  Docs: "bg-margin text-faded-ink",
  Tool: "bg-brass/15 text-ink",
  Blog: "bg-margin text-faded-ink",
  Video: "bg-teal/10 text-ink",
};

const COST_STYLES: Record<Resource["cost"], string> = {
  Free: "text-teal",
  // brass on paper is ~2.76:1 — fails AA; faded-ink clears 5.47:1
  Freemium: "text-faded-ink",
  Paid: "text-route-red",
};

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-2 rounded border border-margin bg-card p-4 transition-shadow hover:shadow-sm",
        className,
      )}
    >
      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            "rounded px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide",
            TYPE_STYLES[resource.type],
          )}
        >
          {resource.type}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-wide text-faded-ink">
          {resource.level}
        </span>
        <span
          className={cn(
            "font-mono text-[0.65rem] font-semibold uppercase tracking-wide",
            COST_STYLES[resource.cost],
          )}
        >
          {resource.cost}
        </span>
        {resource.needsReview && (
          <span className="rounded bg-brass/15 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink">
            Needs review
          </span>
        )}
      </div>

      {/* Title + author */}
      <div>
        {resource.url ? (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-base font-semibold text-ink no-underline hover:text-route-red"
          >
            {resource.title}
          </a>
        ) : (
          <p className="font-display text-base font-semibold text-ink">
            {resource.title}
          </p>
        )}
        <p className="mt-0.5 font-mono text-xs text-faded-ink">
          {resource.author}
          {resource.year ? ` · ${resource.year}` : ""}
        </p>
      </div>

      {/* Verdict */}
      <p className="text-sm leading-relaxed text-ink">{resource.verdict}</p>

      {/* Use this if */}
      <p className="text-sm leading-relaxed text-faded-ink">
        <span className="font-semibold text-ink">Use this if:</span>{" "}
        {resource.useIf}
      </p>

      {/* Last reviewed — full opacity; opacity hack fails AA at this size */}
      <p className="mt-auto font-mono text-[0.65rem] text-faded-ink">
        Reviewed {resource.lastReviewed}
      </p>
    </article>
  );
}
