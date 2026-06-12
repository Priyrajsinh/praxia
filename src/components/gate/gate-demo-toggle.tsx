"use client";

import { useSyncExternalStore } from "react";
import { Lock, LockOpen } from "lucide-react";
import { gateStore } from "@/lib/gate-store";

/**
 * Floating demo toggle â€” appears in the bottom-right corner.
 * Lets the owner preview the gate UI without any real auth.
 * Labelled "Gate demo" so it's clearly a dev/preview affordance, not shipping UX.
 */
export function GateDemoToggle() {
  const enabled = useSyncExternalStore(
    gateStore.subscribe,
    gateStore.getSnapshot,
    gateStore.getServerSnapshot,
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={gateStore.toggle}
        aria-pressed={enabled}
        aria-label={`Gate demo: ${enabled ? "on â€” click to turn off" : "off â€” click to preview gate UI"}`}
        className="group flex items-center gap-2 rounded-sm border border-margin bg-paper px-3 py-1.5 text-xs text-faded-ink shadow-sm transition-colors hover:bg-margin hover:text-ink"
      >
        {enabled ? (
          <Lock
            size={12}
            aria-hidden
            className="text-route-red group-hover:text-ink"
          />
        ) : (
          <LockOpen size={12} aria-hidden />
        )}
        <span>
          Gate demo:{" "}
          <span
            className={
              enabled
                ? "font-semibold text-route-red dark:text-ink group-hover:text-ink"
                : ""
            }
          >
            {enabled ? "ON" : "off"}
          </span>
        </span>
      </button>
    </div>
  );
}
