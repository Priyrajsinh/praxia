import Link from "next/link";

// Placeholder landing — opinionated holding copy, not the Next.js starter.
// The real §2 landing (the promise, the map overview, "start here") ships in
// /day10. Kept inside the three-rail shell for now so the scaffold is coherent.
export default function Home() {
  return (
    <article className="max-w-[68ch]">
      <p className="font-hand text-xl text-route-red">
        A field guide, not a roadmap clone
      </p>
      <h1 className="mt-1 font-display text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
        The route from first principles to the frontier.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-faded-ink">
        One hand-drawn map of the whole territory — Foundations through AI
        Engineering, with a research track branching off the moment you can
        build models. Curated, ranked, sequenced: what to learn, in what order,
        to what depth. The walking is still years of real work; this just makes
        sure you never wander.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/map"
          className="rounded-md bg-route-red px-4 py-2 font-medium text-paper transition-colors hover:opacity-90"
        >
          See the map
        </Link>
        <Link
          href="/foundations"
          className="rounded-md border border-margin px-4 py-2 font-medium text-ink transition-colors hover:bg-margin"
        >
          Start at Foundations
        </Link>
      </div>
      <p className="mt-10 font-mono text-xs uppercase tracking-wider text-faded-ink">
        Scaffold in place — the full landing arrives in /day10
      </p>
    </article>
  );
}
