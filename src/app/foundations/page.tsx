import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Foundations" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Stage 0"
      title="Foundations"
      lede="Before any role, you need the bedrock."
      arrives="/day5"
    />
  );
}
