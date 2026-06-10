import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Notes" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Field notes"
      title="Notes"
      lede="Long-form essays and the slow, opinionated stuff — the SEO engine, stubbed for later (Part B2)."
      arrives="post-v1"
    />
  );
}
