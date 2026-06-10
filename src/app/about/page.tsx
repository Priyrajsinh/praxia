import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Who made this"
      title="About"
      lede="Built by a practitioner who walked the path — and is honest about the parts that hurt."
      arrives="/day8"
    />
  );
}
