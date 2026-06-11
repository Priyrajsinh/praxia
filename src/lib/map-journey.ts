import { stageLinks } from "./nav";
import type { JourneyNode } from "./journey";

export type { JourneyNode };

/**
 * Geometry for the /map interactive overview (PROJECT_PLAN §6).
 * Separate from journey.ts (which is tuned to the narrow 4.5rem rail) so the
 * map can use a wider viewBox and a proportionately larger Bézier bow without
 * touching the spine component's data.
 */

export const MAP_VIEWBOX = { width: 460, height: 640 } as const;

const MAP_PAD_TOP = 52;
const MAP_PAD_BOTTOM = 108;

// Per-node horizontal centres — deliberate hand-drawn wobble, never Math.random
// (server + client must render byte-identical; same principle as the rail spine).
const MAP_NODE_X = [105, 120, 95, 115, 100];

function r(n: number) {
  return Math.round(n * 100) / 100;
}

export const mapNodes: JourneyNode[] = stageLinks.map((link, index) => {
  const count = stageLinks.length;
  const usable = MAP_VIEWBOX.height - MAP_PAD_TOP - MAP_PAD_BOTTOM;
  const y = MAP_PAD_TOP + (usable * index) / (count - 1);
  return {
    href: link.href,
    label: link.label,
    stage: link.stage ?? `Stage ${index}`,
    index,
    x: MAP_NODE_X[index],
    y: r(y),
  };
});

// y[0]=52  y[1]=172  y[2]=292  y[3]=412  y[4]=532

/**
 * Build a hand-drawn route through nodes as cubic Béziers with alternating bow.
 * BOW=28 is tuned for the 460-wide viewBox (the spine uses 7.5 in a 64-wide box —
 * a moderate 28 gives "wandering" not "serpentine" at this scale).
 */
export function buildMapPath(
  nodes: ReadonlyArray<{ x: number; y: number }>,
): string {
  if (nodes.length === 0) return "";
  const BOW = 28;
  const segs = [`M ${r(nodes[0].x)} ${r(nodes[0].y)}`];
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1];
    const b = nodes[i];
    const dy = b.y - a.y;
    const bow = (i % 2 === 0 ? 1 : -1) * BOW;
    segs.push(
      `C ${r(a.x + bow)} ${r(a.y + dy * 0.34)} ${r(b.x - bow)} ${r(b.y - dy * 0.34)} ${r(b.x)} ${r(b.y)}`,
    );
  }
  return segs.join(" ");
}

/** Full progression route (Foundations → AI Engineer) in map coordinates. */
export const mapRoute = buildMapPath(mapNodes);

/** The Research Track node — forks right from Stage 2 (Data Scientist). */
export const researchNode = {
  href: "/research",
  label: "Research Track",
  stage: "Track R",
  x: 340,
  y: 305,
} as const;

/**
 * Teal branch line: cubic Bézier from Stage 2 (Data Scientist) to the
 * research node. Curves gently right, staying at roughly the Stage 2 elevation.
 */
export const researchBranch = ((): string => {
  const from = mapNodes[2]; // Stage 2 — Data Scientist, y=292
  const to = researchNode; // x=340, y=305
  return (
    `M ${from.x} ${from.y} ` +
    `C ${r(from.x + 85)} ${r(from.y - 6)} ` +
    `${r(to.x - 85)} ${r(to.y + 6)} ` +
    `${to.x} ${to.y}`
  );
})();

/** Y where the teal dashed continuation starts (just below the research mark). */
export const RESEARCH_CONT_START_Y = researchNode.y + 20;
/** Y where the dashed continuation ends (arrowhead here). */
export const RESEARCH_CONT_END_Y = 520;
