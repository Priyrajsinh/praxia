// Cosmetic gate stub — v1 (Part B4, §4).
// Default: OFF (all content free). Toggle is for demo/preview only.
// To upgrade to a real gate: replace `getSnapshot` with a server-side auth check.

type Listener = () => void;

let _enabled = false;
let _initialized = false;
const _listeners = new Set<Listener>();

function lazyInit() {
  if (_initialized || typeof window === "undefined") return;
  _initialized = true;
  try {
    _enabled = localStorage.getItem("praxia:gate-demo") === "on";
  } catch {}
}

export const gateStore = {
  /** Current state — safe to call server-side (returns false). */
  getSnapshot(): boolean {
    lazyInit();
    return _enabled;
  },
  /** SSR snapshot — always false (no gate on server). */
  getServerSnapshot(): boolean {
    return false;
  },
  subscribe(listener: Listener): () => void {
    lazyInit();
    _listeners.add(listener);
    return () => _listeners.delete(listener);
  },
  toggle(): void {
    _enabled = !_enabled;
    try {
      localStorage.setItem("praxia:gate-demo", _enabled ? "on" : "off");
    } catch {}
    _listeners.forEach((fn) => fn());
  },
};
