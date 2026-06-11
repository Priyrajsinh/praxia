import { stageLinks } from "./nav";

/**
 * The journey geometry (PROJECT_PLAN §3.4, §6) — the data behind the signature
 * hand-drawn route. Kept here (not in the component) so the left-rail spine and
 * the /map overview (day3) render the SAME territory from one source.
 *
 * Coordinates live in an SVG user-space viewBox. The left-rail spine renders the
 * route with `preserveAspectRatio="none"`, so a point (x, y) in this space maps
 * linearly onto the rail box — i.e. an overlaid HTML node at
 * `left: x / VIEWBOX.width * 100%, top: y / VIEWBOX.height * 100%` lands exactly
 * on the drawn path. That linear mapping is the whole reason the interactive
 * nodes (real <a> links) can sit precisely on a decorative SVG line.
 */

export const VIEWBOX = { width: 64, height: 1000 } as const;

export type JourneyNode = {
  href: string;
  label: string;
  /** "Stage 0" … "Stage 4" — the eyebrow / screen-reader ordinal. */
  stage: string;
  /** Zero-based order along the route. */
  index: number;
  x: number;
  y: number;
};

const PAD_TOP = 78;
const PAD_BOTTOM = 78;

/**
 * Per-node horizontal centres. NOT all on x=32: a hand-drawn route wanders, so
 * the centreline itself wobbles a few units either side. Authored as constants
 * (never Math.random) so server and client render byte-identical — no hydration
 * mismatch, and the path is reproducible.
 */
const NODE_X = [34, 27, 38, 28, 35];

export const journeyNodes: JourneyNode[] = stageLinks.map((link, index) => {
  const count = stageLinks.length;
  const usable = VIEWBOX.height - PAD_TOP - PAD_BOTTOM;
  const y = PAD_TOP + (usable * index) / (count - 1);
  return {
    href: link.href,
    label: link.label,
    stage: link.stage ?? `Stage ${index}`,
    index,
    x: NODE_X[index % NODE_X.length],
    y,
  };
});

/**
 * Build a slightly irregular, hand-drawn route through the given node points as
 * a chain of cubic Béziers. Endpoints are the node centres (so the path passes
 * exactly through every node); the control points "bow" each segment, alternating
 * side, to read as an inked route a cartographer sketched — deliberately NOT the
 * straight CSS line the anti-AI checklist (§3.7) forbids.
 */
export function buildRoutePath(nodes: ReadonlyArray<{ x: number; y: number }>) {
  if (nodes.length === 0) return "";
  const segments = [`M ${round(nodes[0].x)} ${round(nodes[0].y)}`];
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1];
    const b = nodes[i];
    const dy = b.y - a.y;
    const bow = (i % 2 === 0 ? 1 : -1) * 7.5;
    const c1x = a.x + bow;
    const c1y = a.y + dy * 0.34;
    const c2x = b.x - bow;
    const c2y = b.y - dy * 0.34;
    segments.push(
      `C ${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(b.x)} ${round(b.y)}`,
    );
  }
  return segments.join(" ");
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}

/** The full progression route (Foundations → AI Engineer). */
export const routePath = buildRoutePath(journeyNodes);
