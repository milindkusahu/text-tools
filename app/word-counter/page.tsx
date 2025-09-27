import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientWordCounter from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Advanced Word Counter & Text Analyzer - Professional Text Analysis",
  description:
    "Professional-grade word counter with advanced text analysis, readability scoring, keyword density analysis, vocabulary richness metrics, and comprehensive statistics. Perfect for writers, students, and content creators.",
  path: "/word-counter",
  keywords: [
    "advanced word counter",
    "text analyzer",
    "readability score",
    "flesch reading ease",
    "keyword density",
    "vocabulary richness",
    "text statistics",
    "writing analysis",
    "content analysis",
    "professional word counter",
    "text quality metrics",
    "writing tools",
  ],
});

export default function WordCounterPage() {
  return <ClientWordCounter />;
}
