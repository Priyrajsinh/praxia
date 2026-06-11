"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MAP_VIEWBOX,
  RESEARCH_CONT_END_Y,
  RESEARCH_CONT_START_Y,
  buildMapPath,
  mapNodes,
  mapRoute,
  researchBranch,
  researchNode,
} from "@/lib/map-journey";
import { useCompleted } from "@/lib/use-progress";
import { cn } from "@/lib/utils";

/**
 * The /map interactive overview (PROJECT_PLAN §6, §3.4).
 *
 * Architecture mirrors the left-rail RouteSpine: a decorative SVG layer
 * (aria-hidden) holds the visual paths and surveyor-mark nodes; a real
 * <nav><ol> of focusable stage links is absolutely positioned on top, sitting
 * exactly on each node — the keyboard/SR target and the visual label in one.
 *
 * Differences from the spine:
 *  - No scroll animation — the map is an overview, always fully drawn.
 *  - Research branch (teal) forks from Stage 2, with a dashed continuation
 *    line and annotation indicating where the track leads.
 *  - Labels appear inline next to each node (the spine uses sr-only text).
 */

const VBW = MAP_VIEWBOX.width;
const VBH = MAP_VIEWBOX.height;

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

// --- SVG-embedded node marks (render SVG elements inside the <svg> layer) ---

function MapNodeMark({
  cx,
  cy,
  completed,
  current,
}: {
  cx: number;
  cy: number;
  completed: boolean;
  current: boolean;
}) {
  const color = current ? "var(--brass)" : "var(--route-red)";
  return (
    <>
      {current && (
        <circle
          cx={cx}
          cy={cy}
          r={16}
          fill="none"
          stroke="var(--brass)"
          strokeWidth={0.8}
          strokeOpacity={0.4}
          vectorEffect="non-scaling-stroke"
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={11}
        fill={
          completed
            ? "color-mix(in srgb, var(--route-red) 22%, var(--paper))"
            : "var(--paper)"
        }
        stroke={color}
        strokeWidth={current ? 2.2 : 1.8}
        vectorEffect="non-scaling-stroke"
      />
      {completed ? (
        // Checkmark when completed
        <path
          d={`M ${cx - 3.5} ${cy + 0.3} l 3 2.5 l 4.5 -6`}
          fill="none"
          stroke="var(--route-red)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        // Surveyor's crosshair
        <>
          <line
            x1={cx}
            y1={cy - 8}
            x2={cx}
            y2={cy - 5.5}
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={cx}
            y1={cy + 5.5}
            x2={cx}
            y2={cy + 8}
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={cx - 8}
            y1={cy}
            x2={cx - 5.5}
            y2={cy}
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={cx + 5.5}
            y1={cy}
            x2={cx + 8}
            y2={cy}
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={cx}
            cy={cy}
            r={2.2}
            fill={color}
            vectorEffect="non-scaling-stroke"
          />
        </>
      )}
    </>
  );
}

function MapResearchMark({
  cx,
  cy,
  current,
}: {
  cx: number;
  cy: number;
  current: boolean;
}) {
  const color = current ? "var(--brass)" : "var(--teal)";
  return (
    <>
      {current && (
        <circle
          cx={cx}
          cy={cy}
          r={16}
          fill="none"
          stroke="var(--brass)"
          strokeWidth={0.8}
          strokeOpacity={0.4}
          vectorEffect="non-scaling-stroke"
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={11}
        fill="color-mix(in srgb, var(--teal) 10%, var(--paper))"
        stroke={color}
        strokeWidth={current ? 2.2 : 1.8}
        vectorEffect="non-scaling-stroke"
      />
      {/* Upward arrow — research track "elevates" beyond the practical stages */}
      <line
        x1={cx}
        y1={cy + 5}
        x2={cx}
        y2={cy - 4}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M ${cx - 3.5} ${cy - 0.5} L ${cx} ${cy - 5.5} L ${cx + 3.5} ${cy - 0.5}`}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}

// --- Main component ---

export function JourneyMap() {
  const pathname = usePathname();
  const completed = useCompleted();

  const currentIndex = mapNodes.findIndex(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/"),
  );
  const isResearchCurrent =
    pathname === "/research" || pathname.startsWith("/research/");

  // "Filled in behind you": bold overlay on the completed segment of the route
  let furthestCompleted = -1;
  for (const node of mapNodes) {
    if (completed[node.href]) furthestCompleted = node.index;
  }
  const completedPath =
    furthestCompleted >= 1
      ? buildMapPath(mapNodes.slice(0, furthestCompleted + 1))
      : "";

  return (
    <div>
      {/* Visual map — the decorative SVG + interactive overlay */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${VBW} / ${VBH}` }}
      >
        {/* Decorative SVG layer (aria-hidden; the <nav> below is the accessible copy) */}
        <svg
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* Ghost of full main route — sets visual expectation */}
          <path
            d={mapRoute}
            fill="none"
            stroke="var(--route-red)"
            strokeOpacity={0.14}
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Main route */}
          <path
            d={mapRoute}
            fill="none"
            stroke="var(--route-red)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Earned-progress overlay: fills in behind completed nodes */}
          {completedPath ? (
            <path
              d={completedPath}
              fill="none"
              stroke="var(--route-red)"
              strokeWidth={4.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
          {/* Research branch — teal, forks right from Stage 2 */}
          <path
            d={researchBranch}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Research continuation: dashed teal going down alongside Stage 3–4 */}
          <path
            d={`M ${researchNode.x} ${RESEARCH_CONT_START_Y} L ${researchNode.x} ${RESEARCH_CONT_END_Y}`}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={1.8}
            strokeDasharray="5 4"
            strokeLinecap="round"
            strokeOpacity={0.55}
            vectorEffect="non-scaling-stroke"
          />
          {/* Arrowhead at the bottom of the continuation */}
          <path
            d={`M ${researchNode.x - 4} ${RESEARCH_CONT_END_Y - 9} L ${researchNode.x} ${RESEARCH_CONT_END_Y} L ${researchNode.x + 4} ${RESEARCH_CONT_END_Y - 9}`}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.65}
            vectorEffect="non-scaling-stroke"
          />
          {/* Node marks for all 5 stages */}
          {mapNodes.map((node) => (
            <MapNodeMark
              key={node.href}
              cx={node.x}
              cy={node.y}
              completed={completed[node.href] === true}
              current={node.index === currentIndex}
            />
          ))}
          {/* Research node mark */}
          <MapResearchMark
            cx={researchNode.x}
            cy={researchNode.y}
            current={isResearchCurrent}
          />
        </svg>

        {/* Interactive + labelled overlay — the real DOM */}
        <nav
          aria-label="Your journey through the stages"
          className="absolute inset-0"
        >
          <ol className="absolute inset-0 m-0 list-none p-0">
            {/* Five main stage nodes */}
            {mapNodes.map((node) => {
              const isDone = completed[node.href] === true;
              const isCurrent = node.index === currentIndex;
              return (
                <li
                  key={node.href}
                  className="absolute"
                  style={{
                    left: pct(node.x, VBW),
                    top: pct(node.y, VBH),
                  }}
                >
                  {/* Transparent hit-target centered on the SVG node mark */}
                  <Link
                    href={node.href}
                    aria-current={isCurrent ? "step" : undefined}
                    className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 block h-9 w-9 rounded-full"
                  >
                    <span className="sr-only">
                      {node.stage}: {node.label}
                      {isCurrent ? " — you are here" : ""}
                      {isDone ? " — completed" : ""}
                    </span>
                  </Link>
                  {/* Visual label to the right — not interactive (decorative copy) */}
                  <div
                    className="absolute left-0 top-0 -translate-y-1/2 pl-6 pointer-events-none select-none whitespace-nowrap"
                    aria-hidden="true"
                  >
                    <p className="text-[0.625rem] leading-none font-mono uppercase tracking-widest text-faded-ink">
                      {node.stage}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 text-xs font-semibold leading-tight",
                        // B1: brass fails AA on small text — use ink for all variants.
                        // The SVG mark (brass ring / checkmark) carries the visual accent.
                        isDone ? "text-faded-ink" : "text-ink",
                      )}
                    >
                      {node.label}
                    </p>
                    {isCurrent ? (
                      // B2: brass fails AA at 12 px — use faded-ink (5.22:1 on paper)
                      <p className="mt-0.5 font-hand text-xs leading-none text-faded-ink">
                        you are here
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}

            {/* Research track node */}
            <li
              className="absolute"
              style={{
                left: pct(researchNode.x, VBW),
                top: pct(researchNode.y, VBH),
              }}
            >
              <Link
                href={researchNode.href}
                aria-current={isResearchCurrent ? "step" : undefined}
                className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 block h-9 w-9 rounded-full"
              >
                <span className="sr-only">
                  {researchNode.stage}: {researchNode.label} — branches after
                  Stage 2 (Data Scientist). Leads to MSc, PhD, and beyond.
                  {isResearchCurrent ? " — you are here" : ""}
                </span>
              </Link>
              {/* Label centred below the research node */}
              <div
                className="absolute left-0 top-0 -translate-x-1/2 translate-y-5 flex flex-col items-center pointer-events-none select-none"
                aria-hidden="true"
              >
                <p className="text-[0.625rem] leading-none font-mono uppercase tracking-widest text-faded-ink whitespace-nowrap">
                  Track R
                </p>
                <p className="mt-0.5 text-xs font-semibold leading-tight text-faded-ink whitespace-nowrap">
                  Research
                </p>
                {isResearchCurrent ? (
                  // B2 (mirror): brass fails AA — faded-ink instead
                  <p className="mt-0.5 font-hand text-xs leading-none text-faded-ink whitespace-nowrap">
                    you are here
                  </p>
                ) : null}
              </div>
            </li>
          </ol>
        </nav>

        {/* Research continuation annotation (at the arrowhead) */}
        <div
          className="pointer-events-none absolute -translate-x-1/2 select-none text-center"
          aria-hidden="true"
          style={{
            left: pct(researchNode.x, VBW),
            top: pct(RESEARCH_CONT_END_Y + 14, VBH),
          }}
        >
          {/* B3: opacity-80 on 11 px teal → effective contrast 3.46:1 (fails AA). Full teal = 5.08:1. */}
          <p className="font-hand text-[0.6875rem] leading-snug text-teal whitespace-nowrap">
            MSc → Researcher
            <br />→ Principal / Faculty
          </p>
        </div>
      </div>

      {/* Depth ladder — the five rungs every stage reaches toward (§6) */}
      <div className="mt-10 border-t border-margin pt-6">
        <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-widest text-faded-ink">
          Depth at every stage →
        </p>
        <div className="flex flex-wrap items-baseline gap-x-0.5 gap-y-1">
          {(
            [
              "Aware",
              "Competent",
              "Production",
              "Expert / Senior",
              "Principal / Researcher",
            ] as const
          ).map((rung, i) => (
            <Fragment key={rung}>
              {i > 0 ? (
                // B4: aria-hidden exempts this from WCAG 1.4.3 today, but
                // faded-ink is safer and consistent with secondary text.
                <span
                  className="px-0.5 text-sm leading-none text-faded-ink"
                  aria-hidden="true"
                >
                  ──►
                </span>
              ) : null}
              <span className="font-hand text-lg leading-none text-ink whitespace-nowrap">
                {rung}
              </span>
            </Fragment>
          ))}
        </div>
        <p className="mt-3 font-hand text-base leading-snug text-faded-ink">
          The map names what Expert and Principal look like — not just
          Competent.
        </p>
      </div>
    </div>
  );
}
