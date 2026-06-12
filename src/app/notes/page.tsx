import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Long-form essays and field notes from the Praxia map â€” coming post-v1.",
  robots: { index: false },
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Field notes"
      title="Notes"
      lede="Long-form essays and the slow, opinionated stuff â€” the SEO engine, stubbed for later (Part B2)."
      arrives="post-v1"
    />
  );
}
