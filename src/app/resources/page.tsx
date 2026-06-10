import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Resources" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="The master library"
      title="Resources"
      lede="Every recommended book, course, paper, and doc — ranked, with honest verdicts and a clear 'start here'."
      arrives="/day9"
    />
  );
}
