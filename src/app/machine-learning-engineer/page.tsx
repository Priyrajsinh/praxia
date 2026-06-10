import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Machine Learning Engineer" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Stage 3"
      title="Machine Learning Engineer"
      lede="You make models work reliably in production, at scale."
      arrives="/day6"
    />
  );
}
