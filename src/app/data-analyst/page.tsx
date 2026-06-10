import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Data Analyst" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Stage 1"
      title="Data Analyst"
      lede="You turn questions into evidence."
      arrives="/day4"
    />
  );
}
