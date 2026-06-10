import Link from "next/link";
import { legalLinks, sectionLinks } from "@/lib/nav";

const year = new Date().getFullYear();

/**
 * Site footer. Carries the trust/legal scaffolding the spec asks for up front
 * (Part B1): an affiliate-disclosure stub, a resource-accuracy line, and the
 * curation copyright. Real wording is finalised in /day8 + /day10.
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

        <div className="mt-6 space-y-1 text-xs text-faded-ink">
          <p>
            Resource links verified as of build. Spot one that&rsquo;s broken or
            stale? Tell us.
          </p>
          <p>
            Some links may become affiliate links; any are disclosed here.
            Curation is editorial opinion, not gospel.
          </p>
          <p className="font-mono">
            &copy; {year} Praxia. The map &amp; sequencing are ours; the linked
            works are not.
          </p>
        </div>
      </div>
    </footer>
  );
}
