import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Privacy" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Privacy"
      lede="What we collect (almost nothing) and why — a stub for now (Part B1)."
      arrives="/day8"
    />
  );
}
