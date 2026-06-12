import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/schema";

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
  // teal/route-red on â‰¤14px text violates Â§3.8 â€” use bg tint + text-ink (badge pattern)
  Free: "bg-teal/10 text-ink",
  Freemium: "text-faded-ink",
  Paid: "bg-route-red/10 text-ink",
};

const REPORT_BASE =
  "https://github.com/Priyrajsinh/praxia/issues/new?labels=broken-link";

function reportHref(resource: Resource): string {
  const title = encodeURIComponent(`Broken link: ${resource.title}`);
  const body = encodeURIComponent(
    `Resource ID: \`${resource.id}\`\nURL: ${resource.url ?? "(no URL)"}\n\nDescribe the issue:`,
  );
  return `${REPORT_BASE}&title=${title}&body=${body}`;
}

interface ResourceCardProps {
  resource: Resource;
  className?: string;
  /**
   * "full" (default) â€” always shows verdict + useIf. Used on stage pages.
   * "flip" â€” truncated by default, hover/focus reveals verdict + useIf.
   *           Used on the /resources master page. Includes feedback link.
   */
  variant?: "full" | "flip";
}

// â”€â”€ Full variant (stage pages) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FullCard({
  resource,
  className,
}: {
  resource: Resource;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-2 rounded border border-margin bg-card p-4 transition-shadow hover:shadow-sm",
        className,
      )}
    >
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
            "rounded px-1.5 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wide",
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
          {resource.year ? ` Â· ${resource.year}` : ""}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-ink">{resource.verdict}</p>

      <p className="text-sm leading-relaxed text-faded-ink">
        <span className="font-semibold text-ink">Use this if:</span>{" "}
        {resource.useIf}
      </p>

      <p className="mt-auto font-mono text-[0.65rem] text-faded-ink">
        Reviewed {resource.lastReviewed}
      </p>
    </article>
  );
}

// â”€â”€ Flip variant (/resources master page) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Default: shows title, author, badges, truncated verdict.
// Hover/focus-within: reveals full verdict + useIf. Reduced-motion: always expanded.
function FlipCard({
  resource,
  className,
}: {
  resource: Resource;
  className?: string;
}) {
  const isFreePick = resource.cost === "Free" && resource.rankInTopic === 1;

  return (
    <article
      id={resource.id}
      className={cn(
        "group relative flex flex-col gap-2 rounded border bg-card p-4 transition-shadow hover:shadow-sm",
        // Free canonical picks get a subtle teal ring
        isFreePick ? "border-teal/40" : "border-margin",
        className,
      )}
    >
      {/* Free canonical flag */}
      {isFreePick && (
        <span className="self-start rounded bg-teal/10 px-1.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-wide text-ink">
          â˜… Free pick
        </span>
      )}

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
            "rounded px-1.5 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wide",
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
          {resource.year ? ` Â· ${resource.year}` : ""}
        </p>
      </div>

      {/* Verdict â€” 2-line clamp by default, expands on hover/focus.
          motion-reduce: always fully visible. */}
      <p
        className={cn(
          "text-sm leading-relaxed text-ink",
          "line-clamp-2 group-hover:line-clamp-none group-focus-within:line-clamp-none",
          "motion-reduce:line-clamp-none",
        )}
      >
        {resource.verdict}
      </p>

      {/* Use this if â€” hidden by default (max-h 0), revealed on hover/focus.
          motion-reduce: always visible. */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 ease-in-out",
          "max-h-0 group-hover:max-h-32 group-focus-within:max-h-32",
          "motion-reduce:max-h-32",
        )}
      >
        <p className="pt-0.5 text-sm leading-relaxed text-faded-ink">
          <span className="font-semibold text-ink">Use this if:</span>{" "}
          {resource.useIf}
        </p>
      </div>

      {/* Footer: reviewed date + feedback link */}
      <div className="mt-auto flex items-center justify-between pt-1">
        <p className="font-mono text-[0.65rem] text-faded-ink">
          Reviewed {resource.lastReviewed}
        </p>
        <Link
          href={reportHref(resource)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.65rem] text-faded-ink hover:text-ink"
          aria-label={`Report broken link for ${resource.title}`}
        >
          Report link
        </Link>
      </div>
    </article>
  );
}

// â”€â”€ Public export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function ResourceCard({
  resource,
  className,
  variant = "full",
}: ResourceCardProps) {
  if (variant === "flip") {
    return <FlipCard resource={resource} className={className} />;
  }
  return <FullCard resource={resource} className={className} />;
}
