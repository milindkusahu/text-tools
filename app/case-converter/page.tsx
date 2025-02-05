import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientCaseConverter from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Case Converter - Convert Text Case Online",
  description:
    "Free online case converter tool. Convert text to UPPERCASE, lowercase, Title Case, and more.",
  path: "/case-converter",
  keywords: [
    "case converter",
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "text transformation",
    "text formatting",
  ],
});

export default function CaseConverterPage() {
  return <ClientCaseConverter />;
}
