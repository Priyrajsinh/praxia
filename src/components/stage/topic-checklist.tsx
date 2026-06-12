import { cn } from "@/lib/utils";
import type { Topic } from "@/lib/schema";

// Use text-ink for all depth badges â€” the tinted bg provides the colour cue;
// route-red / teal at 0.65rem fail WCAG AA contrast on their tinted backgrounds.
const DEPTH_STYLES: Record<Topic["depth"], string> = {
  Competent: "bg-margin text-faded-ink border border-margin",
  Production: "bg-route-red/10 text-ink border border-route-red/20",
  Expert: "bg-teal/10 text-ink border border-teal/20",
};

interface TopicChecklistProps {
  topics: Topic[];
  className?: string;
}

export function TopicChecklist({ topics, className }: TopicChecklistProps) {
  return (
    <ul className={cn("space-y-3", className)} role="list">
      {topics.map((topic) => (
        <li
          key={topic.concept}
          className="flex flex-col gap-1 border-b border-margin pb-3 last:border-0"
        >
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-body font-semibold text-ink">
              {topic.concept}
            </span>
            <span
              className={cn(
                "rounded px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide",
                DEPTH_STYLES[topic.depth],
              )}
            >
              {topic.depth}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-faded-ink">
            {topic.whyItMatters}
          </p>
        </li>
      ))}
    </ul>
  );
}
