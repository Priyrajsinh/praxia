// Placeholder home page — a plain paper-background holding page, deliberately
// NOT the Next.js starter. The real landing (PROJECT_PLAN §2) is built in /day10.
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 text-ink">
      <div className="max-w-xl text-center">
        <p className="font-hand text-2xl text-faded-ink">the atlas</p>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight">
          The route from first principles to the frontier.
        </h1>
        <p className="mt-4 font-body text-faded-ink">
          Scaffold in place. The map is being drawn.
        </p>
      </div>
    </main>
  );
}
