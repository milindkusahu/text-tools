"use client";

import { useState } from "react";
import KeywordAnalyzer from "@/components/tools/KeywordAnalyzer";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const keywordAnalyzerInfo = {
  features: [
    "Analyze keyword frequency and density",
    "Exclude common stop words",
    "Case-sensitive analysis option",
    "Minimum word length filter",
    "Export results to CSV",
    "Real-time analysis",
    "Top 50 keywords ranking",
    "Detailed percentage calculations",
  ],
  howToUse: [
    "Paste your text into the input field",
    "Adjust analysis options as needed",
    "View keyword frequency and density results",
    "Use CSV export for detailed analysis",
    "Copy results to clipboard with one click",
  ],
  faqs: [
    {
      question: "What is keyword density?",
      answer:
        "Keyword density is the percentage of times a word appears in a text compared to the total number of words. It's a useful metric for SEO and content analysis.",
    },
    {
      question: "Why exclude common words?",
      answer:
        "Common words (like 'the', 'and', 'to') are usually not meaningful for content analysis. Excluding them helps focus on important keywords.",
    },
    {
      question: "How is density calculated?",
      answer:
        "Density is calculated by dividing the number of times a word appears by the total number of words in the text, then multiplying by 100 to get a percentage.",
    },
    {
      question: "What's a good keyword density?",
      answer:
        "For SEO purposes, a keyword density of 1-3% is generally considered optimal. Higher densities might be seen as keyword stuffing.",
    },
    {
      question: "Why use case-sensitive analysis?",
      answer:
        "Case-sensitive analysis can be useful when analyzing code or when uppercase and lowercase versions of words have different meanings in your text.",
    },
  ],
};

export default function ClientKeywordAnalyzer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="Keyword Density Analyzer"
      description="Analyze the frequency and density of keywords in your text. Perfect for SEO optimization and content analysis."
      toolInfo={keywordAnalyzerInfo}
    >
      <KeywordAnalyzer
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
