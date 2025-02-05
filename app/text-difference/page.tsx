import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientTextDiff from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Text Difference Checker - Compare Text Online",
  description:
    "Compare two texts and find the differences. Highlight changes, additions, and deletions in your text.",
  path: "/text-difference",
  keywords: [
    "text difference",
    "text comparison",
    "diff checker",
    "text diff",
    "compare text",
    "text changes",
    "difference highlighter",
  ],
});

export default function TextDiffPage() {
  return <ClientTextDiff />;
}
