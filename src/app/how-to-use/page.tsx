import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "How to Use This Map" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Read this first"
      title="How to Use This Map"
      lede="How to navigate the route — and the study method that actually makes it stick."
      arrives="/day8"
    />
  );
}
