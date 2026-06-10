import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Research Track" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Branches after Stage 2"
      title="Research Track"
      lede="You create new knowledge, not just apply it."
      arrives="/day7"
    />
  );
}
