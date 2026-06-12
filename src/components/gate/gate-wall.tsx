"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useSyncExternalStore } from "react";
import { gateStore } from "@/lib/gate-store";

interface GateWallProps {
  children: React.ReactNode;
  stageName: string;
}

/**
 * Cosmetic gate boundary â€” Part B4, Â§4.
 *
 * Wraps stage content for Stage 2 and beyond. When the demo gate is OFF
 * (v1 default), renders children as-is. When ON, shows a lock UI so the
 * design can be reviewed without requiring any payment or auth.
 *
 * The component boundary is intentional: a server-side auth check
 * can replace `gateStore.getSnapshot` later without touching the stage pages.
 */
export function GateWall({ children, stageName }: GateWallProps) {
  const gated = useSyncExternalStore(
    gateStore.subscribe,
    gateStore.getSnapshot,
    gateStore.getServerSnapshot,
  );

  if (!gated) return <>{children}</>;

  return (
    <div
      role="region"
      aria-label={`${stageName} â€” content preview locked`}
      className="mt-16 rounded-sm border border-margin bg-margin/30 px-8 py-12 text-center"
    >
      <div
        aria-hidden="true"
        className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-margin bg-paper"
      >
        <Lock size={20} className="text-faded-ink" />
      </div>

      <h2 className="font-display text-2xl font-semibold text-ink">
        {stageName} and beyond
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-faded-ink">
        Foundations and Stage 1 (Data Analyst) are completely free. Deeper
        stages will be available soon â€” the gate is currently in demo mode
        only.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/data-analyst"
          className="rounded-sm bg-route-red px-4 py-2 font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          Go to Stage 1 â€” Data Analyst
        </Link>
        <Link
          href="/map"
          className="rounded-sm border border-margin px-4 py-2 font-medium text-ink transition-colors hover:bg-margin"
        >
          See the map
        </Link>
      </div>
    </div>
  );
}
