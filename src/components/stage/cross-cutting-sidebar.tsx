import { crossCuttingSkills } from "@/lib/cross-cutting-skills";

/**
 * Persistent right-rail sidebar (PROJECT_PLAN Â§11): the six cross-cutting
 * skills that compound across every stage. Data-driven from cross-cutting-skills.ts.
 */
export function CrossCuttingSidebar() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-faded-ink">
        Every stage
      </p>
      <p className="mt-2 font-hand text-lg leading-snug text-faded-ink">
        Skills that compound regardless of which stage you&rsquo;re on.
      </p>

      <ol className="mt-5 space-y-5">
        {crossCuttingSkills.map((skill, i) => (
          <li key={skill.id}>
            <p className="flex items-baseline gap-2">
              <span
                className="font-mono text-xs text-faded-ink"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <strong className="font-body text-sm font-semibold text-ink">
                {skill.name}
              </strong>
            </p>
            <p className="mt-1 pl-7 font-body text-xs leading-snug text-faded-ink">
              {skill.tagline}
            </p>
            <p className="mt-1 pl-7 font-hand text-sm leading-snug text-faded-ink">
              Signal: {skill.signal}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
