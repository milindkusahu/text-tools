import type { Metadata } from "next";
import ClientTextDiff from "./client";

export const metadata: Metadata = {
  title: "Text Difference Checker - Compare Text Online",
  description:
    "Compare two texts and find the differences. Highlight changes, additions, and deletions in your text.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/text-difference",
  },
};

export default function TextDiffPage() {
  return <ClientTextDiff />;
}
