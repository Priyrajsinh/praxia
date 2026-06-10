import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "The Map" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="The whole territory"
      title="The Map"
      lede="Every stage, the research branch, and exactly where you are on the route."
      arrives="/day2–/day3"
    />
  );
}
