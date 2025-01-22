import type { Metadata } from "next";
import ClientCaseConverter from "./client";

export const metadata: Metadata = {
  title: "Case Converter - Convert Text Case Online",
  description:
    "Free online case converter tool. Convert text to UPPERCASE, lowercase, Title Case, and more.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/case-converter",
  },
};

export default function CaseConverterPage() {
  return <ClientCaseConverter />;
}
