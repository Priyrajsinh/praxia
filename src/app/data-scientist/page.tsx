import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Data Scientist" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Stage 2"
      title="Data Scientist"
      lede="You build models that predict and explain."
      arrives="/day5"
    />
  );
}
