import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Terms"
      lede="The terms of use — a stub until there's anything to gate or sell (Part B1)."
      arrives="/day8"
    />
  );
}
