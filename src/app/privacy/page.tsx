import type { Metadata } from "next";
import { StageSection } from "@/components/stage/stage-section";
import { Marginalia } from "@/components/stage/marginalia";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Praxia privacy policy â€” what we collect (almost nothing) and why.",
  openGraph: {
    title: "Privacy Â· Praxia",
    description: "Praxia privacy policy.",
  },
  twitter: {
    card: "summary",
    title: "Privacy Â· Praxia",
    description: "Praxia privacy policy.",
  },
};

const LAST_UPDATED = "2026-06-12";

export default function PrivacyPage() {
  return (
    <article>
      <header className="mb-2">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
          Legal
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Privacy
        </h1>
        <p className="mt-3 font-mono text-xs text-faded-ink">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <StageSection id="summary" title="Short version">
        <Marginalia>
          The actual short version: we do not collect your data because we do
          not want to. No account, no analytics, no ads.
        </Marginalia>

        <p>
          Praxia collects almost no personal data. There is no account system,
          no email list sign-up, no analytics tracker, and no advertising
          network. The only data stored locally on your device is your
          dark/light mode preference and your stage completion state â€” both
          stored in <code>localStorage</code> in your browser, never sent
          anywhere.
        </p>
      </StageSection>

      <StageSection id="what-we-collect" title="What we collect">
        <h3>Local storage (your device only)</h3>
        <p>
          When you toggle the theme or mark a stage as complete, that preference
          is saved to <code>localStorage</code> in your browser. This data:
        </p>
        <ul>
          <li>Never leaves your device.</li>
          <li>Is not sent to any server.</li>
          <li>
            Can be cleared at any time by clearing your browser&rsquo;s site
            data.
          </li>
          <li>
            Is not associated with any identifier â€” we have no way to know it
            is yours.
          </li>
        </ul>

        <h3>Server logs</h3>
        <p>
          Like all websites, Praxia&rsquo;s hosting infrastructure generates
          standard server access logs (IP address, page requested, timestamp,
          browser user agent). These logs are used for security and reliability
          purposes, are not shared with third parties, and are retained only as
          long as the hosting provider requires.
        </p>

        <h3>No analytics, no advertising</h3>
        <p>
          There is no analytics script on this site â€” no Google Analytics, no
          Plausible, no Mixpanel, nothing. If that changes, this policy will be
          updated and a notice will appear on the site. There is no advertising
          of any kind.
        </p>
      </StageSection>

      <StageSection id="cookies" title="Cookies">
        <p>
          Praxia does not set any cookies. The theme preference uses{" "}
          <code>localStorage</code>, not a cookie. If your browser reports a
          cookie from this domain, it is set by the hosting infrastructure (not
          by Praxia) for technical purposes such as CDN routing.
        </p>
      </StageSection>

      <StageSection id="external-links" title="External links">
        <p>
          Praxia links to many external sites â€” course platforms, book
          publishers, paper repositories, documentation hosts. When you follow
          an external link, you leave Praxia and enter the privacy regime of
          that site. We have no control over what those sites collect. Treat
          each external site according to its own privacy policy.
        </p>
      </StageSection>

      <StageSection id="children" title="Minors">
        <p>
          Praxia is an educational resource suitable for users of all ages.
          Because we collect no personal data, there are no special provisions
          for users under 13 or under 16 â€” there is simply nothing to collect
          or store.
        </p>
      </StageSection>

      <StageSection id="changes" title="Changes to this policy">
        <p>
          If this policy changes materially â€” for example, if analytics are
          added or affiliate links are introduced â€” the change will be
          announced on this page and the &ldquo;last updated&rdquo; date will be
          revised. We will not introduce tracking quietly.
        </p>
      </StageSection>
    </article>
  );
}
