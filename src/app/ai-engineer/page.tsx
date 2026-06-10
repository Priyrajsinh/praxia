import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "AI Engineer" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Stage 4"
      title="AI Engineer"
      lede="You build systems on top of foundation models — LLMs, agents, multimodal AI."
      arrives="/day6"
    />
  );
}
