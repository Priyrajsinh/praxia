// KaTeX stylesheet â€” loaded only for the /mathematics route (performance: Â§B6).
// The root layout no longer imports it globally; all other pages are unaffected.
import "katex/dist/katex.min.css";

export default function MathematicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
