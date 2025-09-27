"use client";

import { useState } from "react";
import WordCounter from "@/components/tools/WordCounter";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const wordCounterInfo = {
  features: [
    "Real-time comprehensive text analysis as you type",
    "Advanced character counting with and without spaces",
    "Complete sentence, paragraph, and line counting",
    "Accurate reading and speaking time estimation",
    "Professional readability scoring (Flesch, Gunning Fog, etc.)",
    "Keyword density analysis with top word frequency",
    "Vocabulary richness and repetition rate analysis",
    "Language detection and multi-language support",
    "Visual statistics cards with progress indicators",
    "Export analysis results as downloadable reports",
    "Advanced text quality metrics and insights",
    "Automatic saving and restore functionality",
  ],
  howToUse: [
    "Type or paste your text into the input field",
    "View real-time basic statistics in the colorful cards above",
    "Click 'Show Details' to reveal advanced analysis features",
    "Explore readability scores, text quality metrics, and word analysis",
    "Review the most common words and longest words in your text",
    "Copy or download the complete analysis report",
    "Use the save functionality to store your analysis for later",
  ],
  faqs: [
    {
      question: "What makes this word counter different from others?",
      answer:
        "Our advanced word counter provides comprehensive text analysis including readability scores, vocabulary richness, keyword density, and professional-grade metrics that go far beyond basic counting.",
    },
    {
      question: "How accurate are the readability scores?",
      answer:
        "We use industry-standard formulas including Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index to provide accurate readability assessments for your text.",
    },
    {
      question: "What is vocabulary richness and why is it important?",
      answer:
        "Vocabulary richness measures the percentage of unique words in your text. Higher richness indicates more diverse vocabulary, while lower richness suggests repetitive language patterns.",
    },
    {
      question: "How are reading and speaking times calculated?",
      answer:
        "Reading time is calculated at 250 words per minute (average reading speed), while speaking time uses 150 words per minute (average speaking pace). These are industry-standard benchmarks.",
    },
    {
      question: "Can I analyze text in languages other than English?",
      answer:
        "Yes! While some advanced features like readability scores work best with English, basic counting and analysis work with any language. We also include basic language detection.",
    },
    {
      question: "Is my text data secure and private?",
      answer:
        "Absolutely! All analysis happens in your browser. Your text is never sent to our servers or stored anywhere. Complete privacy and security guaranteed.",
    },
    {
      question: "What file formats can I export my analysis to?",
      answer:
        "You can download your complete analysis report as a text file (.txt) with all statistics, readability scores, and word analysis included in a formatted report.",
    },
  ],
};

export default function ClientWordCounter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const restoreItem = (restoreInput: string, restoreOutput: string) => {
    setInput(restoreInput);
    setOutput(restoreOutput);
  };

  return (
    <ToolPageLayout
      title="Advanced Word Counter & Text Analyzer"
      description="Professional-grade text analysis tool with comprehensive statistics, readability scoring, keyword analysis, and advanced metrics. Perfect for writers, students, content creators, and professionals."
      toolInfo={wordCounterInfo}
      input={input}
      output={output}
      onRestoreItem={restoreItem}
      toolId="word-counter"
    >
      <WordCounter
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
