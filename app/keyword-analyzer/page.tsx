import type { Metadata } from "next";
import ClientKeywordAnalyzer from "./client";

export const metadata: Metadata = {
  title: "Keyword Density Analyzer - Analyze Text Content",
  description:
    "Analyze keyword density and frequency in your text. Perfect for SEO optimization and content analysis.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/keyword-analyzer",
  },
};

export default function KeywordAnalyzerPage() {
  return <ClientKeywordAnalyzer />;
}
