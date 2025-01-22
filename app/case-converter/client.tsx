"use client";

import { useState } from "react";
import CaseConverter from "@/components/tools/CaseConverter";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const caseConverterInfo = {
  features: [
    "Multiple case conversion options (upper, lower, title, sentence)",
    "camelCase, PascalCase, and snake_case support",
    "Real-time conversion as you type",
    "Preserve original formatting option",
    "Support for special characters",
    "Batch processing capability",
    "Copy to clipboard functionality",
  ],
  howToUse: [
    "Enter or paste your text in the input field",
    "Select your desired case conversion type from the dropdown",
    "Watch as the text automatically converts",
    "Use the copy button to copy the converted text",
    "Try different cases to find the perfect format for your needs",
  ],
  faqs: [
    {
      question: "What's the difference between Title Case and Sentence case?",
      answer:
        "Title Case capitalizes the first letter of each major word (nouns, verbs, adjectives), while Sentence case only capitalizes the first letter of each sentence.",
    },
    {
      question: "What is camelCase?",
      answer:
        "camelCase is a naming convention where the first letter of each word is capitalized except for the first word, with no spaces (e.g., 'thisIsCamelCase').",
    },
    {
      question: "Does it work with numbers and special characters?",
      answer:
        "Yes, our case converter preserves numbers and special characters while only modifying the case of letters.",
    },
    {
      question: "Can I convert multiple lines of text?",
      answer:
        "Yes, the converter works with multiple lines and preserves your text's line breaks and formatting.",
    },
    {
      question: "Why use snake_case?",
      answer:
        "snake_case is commonly used in programming, particularly in languages like Python, for variable and function names where spaces aren't allowed.",
    },
  ],
};

export default function ClientCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="Case Converter"
      description="Transform your text between different cases: UPPERCASE, lowercase, Title Case, camelCase, and more. Perfect for coding and content formatting."
      toolInfo={caseConverterInfo}
    >
      <CaseConverter
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
