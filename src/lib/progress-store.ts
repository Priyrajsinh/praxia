import { z } from "zod";

/**
 * Progress store (PROJECT_PLAN §3.6, §4) — a tiny localStorage-backed store of
 * "things the reader has marked complete" (stages now; topic ids later). It is a
 * plain vanilla store (no React) so it can be shared across components and read
 * outside the render tree; the React bindings live in `use-progress.ts`.
 *
 * Design notes:
 * - The snapshot is an immutable object replaced wholesale on every write, so
 *   `useSyncExternalStore` gets referential stability (no tearing, no loops).
 * - SSR-safe: `getServerSnapshot` returns a frozen empty constant, so the server
 *   render and the first hydration render agree (nothing completed); the real
 *   persisted state is adopted right after hydration.
 * - Cross-tab: a `storage` event in another tab reloads and notifies listeners.
 */

const STORAGE_KEY = "praxia:progress:v1";

/** Persisted shape: a set of completed ids, stored as `{ [id]: true }`. */
const persistedSchema = z.record(z.string(), z.literal(true));

export type ProgressSnapshot = Readonly<Record<string, true>>;

const EMPTY: ProgressSnapshot = Object.freeze({});

let snapshot: ProgressSnapshot = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): ProgressSnapshot {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = persistedSchema.safeParse(JSON.parse(raw));
    return parsed.success ? Object.freeze({ ...parsed.data }) : EMPTY;
  } catch {
    // Private mode / quota / malformed JSON — degrade to empty, never throw.
    return EMPTY;
  }
}

function writeStorage(next: ProgressSnapshot) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Best-effort persistence; in-memory snapshot still updates either way.
  }
}

/** Pull the persisted state into memory once, lazily, on the client. */
function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  snapshot = readStorage();
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      snapshot = readStorage();
      emit();
    }
  });
}

function emit() {
  for (const listener of listeners) listener();
}

function commit(next: ProgressSnapshot) {
  snapshot = next;
  writeStorage(next);
  emit();
}

export const progressStore = {
  subscribe(listener: () => void): () => void {
    ensureHydrated();
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  /** Referentially-stable client snapshot (same object until a write). */
  getSnapshot(): ProgressSnapshot {
    ensureHydrated();
    return snapshot;
  },

  /** Stable empty snapshot for SSR + first hydration render. */
  getServerSnapshot(): ProgressSnapshot {
    return EMPTY;
  },

  isComplete(id: string): boolean {
    return progressStore.getSnapshot()[id] === true;
  },

  toggle(id: string) {
    const current = progressStore.getSnapshot();
    if (current[id]) {
      const next = { ...current };
      delete next[id];
      commit(Object.freeze(next));
    } else {
      commit(Object.freeze({ ...current, [id]: true }));
    }
  },

  setComplete(id: string, complete: boolean) {
    const current = progressStore.getSnapshot();
    if (complete === Boolean(current[id])) return;
    progressStore.toggle(id);
  },

  reset() {
    commit(EMPTY);
  },
};
