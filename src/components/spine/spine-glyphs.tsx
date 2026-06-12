/**
 * Hand-drawn glyphs for the route spine (PROJECT_PLAN Â§3.4). Inline SVG, not an
 * icon library â€” sketched surveyor's marks read as crafted, slick icon sets read
 * as generated (Â§3.7). All colours come from the Field Notebook CSS variables so
 * the marks invert correctly in warm-dark mode.
 */

type NodeMarkProps = {
  current: boolean;
  completed: boolean;
};

/**
 * A surveyor's mark: a ringed station with a crosshair. Becomes brass-ringed when
 * it's the stage you're on, and gets an inked check + a route-red wash once the
 * stage is marked complete.
 */
export function NodeMark({ current, completed }: NodeMarkProps) {
  const ring = current ? "var(--brass)" : "var(--route-red)";
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      {current ? (
        <circle
          cx="12"
          cy="12"
          r="10.5"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      ) : null}
      <circle
        cx="12"
        cy="12"
        r="7.5"
        fill={
          completed
            ? "color-mix(in srgb, var(--route-red) 26%, var(--paper))"
            : "var(--paper)"
        }
        stroke={ring}
        strokeWidth={current ? 2.1 : 1.7}
      />
      {completed ? (
        <path
          d="M8.2 12.3 l2.4 2.5 L16 9.4"
          fill="none"
          stroke="var(--route-red)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          {/* crosshair ticks â€” the surveyor's station */}
          <line
            x1="12"
            y1="6.5"
            x2="12"
            y2="9"
            stroke={ring}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="15"
            x2="12"
            y2="17.5"
            stroke={ring}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="6.5"
            y1="12"
            x2="9"
            y2="12"
            stroke={ring}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="15"
            y1="12"
            x2="17.5"
            y2="12"
            stroke={ring}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="1.7" fill={ring} />
        </>
      )}
    </svg>
  );
}

/** The brass "you are here" marker that rides the drawn tip of the route. */
export function YouAreHereMarker() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="var(--brass)" fillOpacity="0.18" />
      <g transform="rotate(45 12 12)">
        <rect
          x="6.5"
          y="6.5"
          width="11"
          height="11"
          rx="1.5"
          fill="var(--brass)"
          stroke="var(--paper)"
          strokeWidth="1.4"
        />
      </g>
      <circle cx="12" cy="12" r="2" fill="var(--paper)" />
    </svg>
  );
}

/** The small "stamp done" control glyph shown on each node's toggle button. */
export function DoneToggleIcon({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <svg viewBox="0 0 16 16" className="h-full w-full" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="var(--route-red)" />
        <path
          d="M4.7 8.2 l2.1 2.1 L11.4 5.6"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="h-full w-full" aria-hidden="true">
      <circle
        cx="8"
        cy="8"
        r="6.5"
        fill="var(--paper)"
        stroke="var(--faded-ink)"
        strokeWidth="1.2"
        strokeDasharray="2 1.8"
      />
    </svg>
  );
}
