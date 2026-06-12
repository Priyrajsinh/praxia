import type { Metadata } from "next";
import Link from "next/link";
import { glossaryTerms } from "@/lib/glossary";
import { StageSection } from "@/components/stage/stage-section";
import { Marginalia } from "@/components/stage/marginalia";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Plain-English definitions for every term Praxia uses across its stages — the site's own words, no circular jargon, with links to where each concept is taught in depth.",
};

// Group terms by first letter for alphabetical navigation
const grouped = glossaryTerms.reduce<Record<string, typeof glossaryTerms>>(
  (acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  },
  {},
);

const letters = Object.keys(grouped).sort();

export default function GlossaryPage() {
  return (
    <article>
      <header className="mb-2">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-faded-ink">
          Reference
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Glossary
        </h1>
        <p className="mt-3 max-w-prose font-body text-xl leading-relaxed text-faded-ink">
          Every term the map uses, defined in plain English. No circular jargon.
          No definitions that require knowing the word you just looked up.
        </p>
      </header>

      <StageSection id="how-to-use-glossary" title="How to use this glossary">
        <Marginalia>
          A definition you memorised is weaker than a concept you can explain to
          someone who has never heard of it. Use the &ldquo;learn more&rdquo;
          links to go deeper, not just to tick the box.
        </Marginalia>

        <p>
          Terms are listed alphabetically. Each definition is written in the
          site&rsquo;s own words — nothing copied from Wikipedia, textbooks, or
          documentation. Where a concept is taught in depth on a stage page or
          in the <Link href="/mathematics">mathematics curriculum</Link>, there
          is a &ldquo;learn more&rdquo; link pointing to the right section.
        </p>

        <p>
          The glossary covers vocabulary from{" "}
          <Link href="/foundations">Foundations</Link> through{" "}
          <Link href="/ai-engineer">AI Engineer</Link> and the{" "}
          <Link href="/research">research track</Link>. If you encounter a term
          on a stage page that is not defined here, that is a gap — use the
          GitHub issue link in the footer.
        </p>

        {/* A–Z jump links */}
        <nav aria-label="Glossary alphabet" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {letters.map((letter) => (
              <li key={letter}>
                <a
                  href={`#letter-${letter}`}
                  className="inline-block rounded border border-margin px-2 py-0.5 font-mono text-xs text-ink hover:border-brass transition-colors"
                >
                  {letter}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </StageSection>

      {/* ── A–Z sections ───────────────────────────────────────────────────── */}
      {letters.map((letter) => (
        <StageSection
          key={letter}
          id={`letter-${letter}`}
          title={letter}
          eyebrow="Glossary"
        >
          <dl className="space-y-8">
            {grouped[letter].map((entry) => (
              <div
                key={entry.term}
                id={`term-${entry.term.toLowerCase().replace(/[\s/()]/g, "-")}`}
              >
                <dt className="font-display text-lg font-semibold text-ink">
                  {entry.term}
                </dt>
                <dd className="mt-1 text-faded-ink leading-relaxed">
                  {entry.definition}
                  {entry.learnMore && (
                    <span className="ml-2 inline-block">
                      <Link
                        href={entry.learnMore.href}
                        className="font-mono text-xs text-ink underline decoration-brass underline-offset-2 hover:text-ink"
                      >
                        → {entry.learnMore.label}
                      </Link>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </StageSection>
      ))}

      <StageSection id="missing" title="Something missing?">
        <p>
          The glossary covers the terms used across Praxia&rsquo;s current
          stages. If a term you looked up is not here, or if a definition is
          unclear, the fastest fix is a GitHub issue — the link is in the
          footer.
        </p>
        <p className="text-faded-ink">
          Terms are intentionally defined at the level of precision you need to
          use them correctly — not at the level of precision a mathematician
          would demand for a proof. For deeper rigour, follow the &ldquo;learn
          more&rdquo; links into the stage pages and the{" "}
          <Link href="/mathematics">mathematics curriculum</Link>.
        </p>
      </StageSection>
    </article>
  );
}
