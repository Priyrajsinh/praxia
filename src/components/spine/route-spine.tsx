"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  VIEWBOX,
  buildRoutePath,
  journeyNodes,
  routePath,
} from "@/lib/journey";
import { progressStore } from "@/lib/progress-store";
import { useCompleted } from "@/lib/use-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { DoneToggleIcon, NodeMark, YouAreHereMarker } from "./spine-glyphs";

/**
 * The signature hand-drawn route spine (PROJECT_PLAN Â§3.4 / Â§3.6 / Â§6).
 *
 * The line itself is a decorative SVG (`preserveAspectRatio="none"`, so user
 * space maps linearly onto the rail), layered three ways over the same path:
 *   1. a faint "pencil" ghost of the whole route (always visible);
 *   2. the route-red line that *self-draws* as you scroll (stroke-dashoffset);
 *   3. a bold "inked" overlay of the segment already completed, persisted in
 *      localStorage so it stays filled in behind you across reloads.
 * A brass "you are here" marker rides the drawn tip (positioned imperatively via
 * `getPointAtLength`, so it sits exactly on the wobble).
 *
 * The interactive + accessible layer is separate real DOM: a `<nav><ol>` of stage
 * links sitting precisely on each node â€” the screen-reader text equivalent and
 * the keyboard targets in one structure. Under reduced motion the route renders
 * already-drawn and the marker is placed statically at the current stage.
 */

function toPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

export function RouteSpine() {
  const pathname = usePathname();
  const completed = useCompleted();
  const reduced = useReducedMotion();
  const scroll = useScrollProgress(!reduced);
  const draw = reduced ? 1 : scroll;

  const drawnRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  const currentIndex = journeyNodes.findIndex(
    (node) => pathname === node.href || pathname.startsWith(node.href + "/"),
  );
  const markerIndex = currentIndex >= 0 ? currentIndex : 0;

  // The bold "inked" overlay runs from the start through the furthest completed
  // stage â€” the route filling in behind you.
  let furthestCompleted = -1;
  for (const node of journeyNodes) {
    if (completed[node.href]) furthestCompleted = node.index;
  }
  const completedPath =
    furthestCompleted >= 1
      ? buildRoutePath(journeyNodes.slice(0, furthestCompleted + 1))
      : "";

  // Position the marker on the path imperatively (no re-render, no set-state in
  // effect): ride the drawn tip with scroll, or pin to the current stage when
  // motion is reduced.
  useEffect(() => {
    const marker = markerRef.current;
    const path = drawnRef.current;
    if (!marker) return;

    let x: number;
    let y: number;
    if (reduced || !path) {
      ({ x, y } = journeyNodes[markerIndex]);
    } else {
      const length = path.getTotalLength();
      const point = path.getPointAtLength(
        Math.min(1, Math.max(0, draw)) * length,
      );
      x = point.x;
      y = point.y;
    }
    marker.style.left = toPercent(x, VIEWBOX.width);
    marker.style.top = toPercent(y, VIEWBOX.height);
  }, [draw, reduced, markerIndex]);

  return (
    <div className="sticky top-20 h-[calc(100vh-6rem)]">
      <div className="relative h-full w-full">
        {/* The route line â€” decorative; the accessible copy is the <nav> below. */}
        <svg
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* 1 â€” pencil ghost of the full route */}
          <path
            d={routePath}
            fill="none"
            stroke="var(--route-red)"
            strokeOpacity={0.16}
            strokeWidth={1.6}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* 2 â€” self-drawing route; pathLength=1 makes the dash math unit-free */}
          <path
            ref={drawnRef}
            d={routePath}
            className="spine-draw"
            fill="none"
            stroke="var(--route-red)"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            style={{ strokeDasharray: "1 1", strokeDashoffset: 1 - draw }}
          />
          {/* 3 â€” inked overlay of completed segment (earned progress, persisted) */}
          {completedPath ? (
            <path
              d={completedPath}
              fill="none"
              stroke="var(--route-red)"
              strokeWidth={3.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </svg>

        {/* The accessible journey: a real ordered list of focusable stage links,
            each sitting exactly on its node. This is the screen-reader equivalent. */}
        <nav
          aria-label="Your journey through the stages"
          className="absolute inset-0"
        >
          <ol className="absolute inset-0 m-0 list-none p-0">
            {journeyNodes.map((node) => {
              const isDone = completed[node.href] === true;
              const isCurrent = node.index === currentIndex;
              return (
                <li
                  key={node.href}
                  className="absolute"
                  style={{
                    left: toPercent(node.x, VIEWBOX.width),
                    top: toPercent(node.y, VIEWBOX.height),
                  }}
                >
                  <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                    <Link
                      href={node.href}
                      aria-current={isCurrent ? "step" : undefined}
                      className="block h-6 w-6 rounded-full transition-transform hover:scale-110"
                    >
                      <span className="sr-only">
                        {node.stage}: {node.label}
                        {isCurrent ? ", you are here" : ""}
                        {isDone ? ", completed" : ""}
                      </span>
                      <NodeMark current={isCurrent} completed={isDone} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => progressStore.toggle(node.href)}
                      aria-pressed={isDone}
                      className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
                    >
                      <span className="sr-only">
                        Mark {node.stage} {node.label}{" "}
                        {isDone ? "not done" : "complete"}
                      </span>
                      <span className="block h-3.5 w-3.5">
                        <DoneToggleIcon completed={isDone} />
                      </span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Brass "you are here" marker â€” decorative; sits on the drawn tip. */}
        <span
          ref={markerRef}
          aria-hidden="true"
          className="spine-marker pointer-events-none absolute z-10 block h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: toPercent(journeyNodes[markerIndex].x, VIEWBOX.width),
            top: toPercent(journeyNodes[markerIndex].y, VIEWBOX.height),
          }}
        >
          <YouAreHereMarker />
        </span>
      </div>
    </div>
  );
}
