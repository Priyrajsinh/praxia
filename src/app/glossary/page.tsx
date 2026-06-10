import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Glossary" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Every term, defined"
      title="Glossary"
      lede="Plain-English definitions for every term the map uses — no circular jargon."
      arrives="/day8"
    />
  );
}
