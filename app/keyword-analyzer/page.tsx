import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientKeywordAnalyzer from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Keyword Density Analyzer - Analyze Text Content",
  description:
    "Analyze keyword density and frequency in your text. Perfect for SEO optimization and content analysis.",
  path: "/keyword-analyzer",
  keywords: [
    "keyword density",
    "keyword analyzer",
    "text analysis",
    "seo tools",
    "content analysis",
    "word frequency",
    "keyword density checker",
  ],
});

export default function KeywordAnalyzerPage() {
  return <ClientKeywordAnalyzer />;
}
