import Link from "next/link";
import { legalLinks, sectionLinks } from "@/lib/nav";

const year = new Date().getFullYear();
/** ISO date of the last full link-verification pass. Update whenever you do a sweep. */
const LINKS_VERIFIED_DATE = "2026-06-12";

/**
 * Site footer (Part B1).
 *
 * Trust scaffolding carried here:
 * â€” Affiliate disclosure: no affiliate links currently; any future ones are
 *   disclosed at point-of-link and summarised here.
 * â€” Accuracy disclaimer: links verified date + report-a-break invitation.
 * â€” Content license: curation and commentary are original work; linked works
 *   belong to their respective owners.
 */
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-margin">
      <div className="mx-auto max-w-screen-xl px-6 py-10">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {[...sectionLinks, ...legalLinks].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-faded-ink hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 space-y-2 text-xs text-faded-ink">
          {/* Accuracy disclaimer */}
          <p>
            Resource links verified as of{" "}
            <span className="font-mono">{LINKS_VERIFIED_DATE}</span>. Spot one
            that&rsquo;s broken or stale?{" "}
            <a
              href="https://github.com/Priyrajsinh/praxia/issues"
              className="underline decoration-brass underline-offset-2 hover:text-ink"
            >
              Open an issue
            </a>
            .
          </p>

          {/* Affiliate disclosure */}
          <p>
            <strong className="font-semibold text-faded-ink">
              Affiliate disclosure:
            </strong>{" "}
            No links on this site are currently affiliate links. If that
            changes, it will be disclosed here and at the point of the link.
            Curation decisions are editorial, not commercial.
          </p>

          {/* Content license */}
          <p className="font-mono">
            &copy; {year} Praxia. The map, sequencing, and commentary are
            original work. Linked resources belong to their respective authors
            and publishers â€” Praxia does not claim any rights over them.
          </p>
        </div>
      </div>
    </footer>
  );
}
