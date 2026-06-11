"use client";

import { useCallback, useSyncExternalStore } from "react";
import { progressStore, type ProgressSnapshot } from "./progress-store";

/**
 * React bindings for the progress store. `useSyncExternalStore` is the correct
 * primitive here: it subscribes to the external (non-React) store, is tear-free
 * under concurrent rendering, and takes a separate server snapshot so SSR and
 * the first client render agree (avoids the classic localStorage hydration flash
 * without a set-state-in-effect mount hack — see LEARNING.md).
 */
function useSnapshot(): ProgressSnapshot {
  return useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getSnapshot,
    progressStore.getServerSnapshot,
  );
}

/** Read + toggle a single id's completion. */
export function useProgress(id: string): [boolean, () => void] {
  const snapshot = useSnapshot();
  const toggle = useCallback(() => progressStore.toggle(id), [id]);
  return [snapshot[id] === true, toggle];
}

/** The full set of completed ids (for the spine's "filled in behind you"). */
export function useCompleted(): ProgressSnapshot {
  return useSnapshot();
}
