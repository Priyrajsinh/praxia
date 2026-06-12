import type { Resource } from "@/lib/schema";
import { ResourceCard } from "./resource-card";

interface ResourceGroupProps {
  label: string;
  resources: Resource[];
}

function Group({ label, resources }: ResourceGroupProps) {
  if (resources.length === 0) return null;
  return (
    <div>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-faded-ink">
        {label}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {resources.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>
    </div>
  );
}

interface ResourceGroupsProps {
  resources: Resource[];
}

// Groups resources into Books / Courses & Videos / Papers / Docs & Tools
// in the order Â§9 specifies, skipping empty groups.
export function ResourceGroups({ resources }: ResourceGroupsProps) {
  const books = resources.filter((r) => r.type === "Book");
  const coursesAndVideos = resources.filter(
    (r) => r.type === "Course" || r.type === "Video",
  );
  const papers = resources.filter((r) => r.type === "Paper");
  const docsAndTools = resources.filter(
    (r) => r.type === "Docs" || r.type === "Tool" || r.type === "Blog",
  );

  return (
    <div className="space-y-8">
      <Group label="Books" resources={books} />
      <Group label="Courses & Videos" resources={coursesAndVideos} />
      <Group label="Papers" resources={papers} />
      <Group label="Docs & Practice" resources={docsAndTools} />
    </div>
  );
}
