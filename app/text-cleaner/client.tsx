"use client";

import { useState } from "react";
import TextCleaner from "@/components/tools/TextCleaner";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const textCleanerInfo = {
  features: [
    "Remove extra spaces and tabs",
    "Eliminate redundant line breaks",
    "Remove special characters",
    "Trim whitespace from line beginnings and endings",
    "Normalize smart quotes to standard quotes",
    "Preserve important formatting",
    "Real-time cleaning preview",
  ],
  howToUse: [
    "Paste your text into the input field",
    "Select the cleaning options you want to apply",
    "Watch as your text is cleaned in real-time",
    "Adjust options to get the desired result",
    "Copy the cleaned text using the copy button",
  ],
  faqs: [
    {
      question: "Will this remove important formatting?",
      answer:
        "The cleaner only removes formatting you select. You can choose which cleaning options to apply, ensuring important formatting is preserved.",
    },
    {
      question: "What are smart quotes?",
      answer:
        'Smart quotes are the curly quotation marks ("curly quotes") often automatically inserted by word processors. Our normalizer converts them to straight quotes (\' and ").',
    },
    {
      question: "Can I clean code with this?",
      answer:
        "Yes, but be careful with the 'Remove Special Characters' option as it might remove important syntax. For code, we recommend using only the space and line cleaning options.",
    },
    {
      question: "Is there a maximum text length?",
      answer:
        "The tool can handle texts up to 100,000 characters. For larger texts, we recommend processing them in chunks.",
    },
    {
      question: "Does it work with different languages?",
      answer:
        "Yes, the basic cleaning functions work with all languages. However, special character removal is optimized for English text.",
    },
  ],
};

export default function ClientTextCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="Text Cleaner"
      description="Clean and format your text by removing extra spaces, lines, and unwanted characters. Make your text cleaner and more readable."
      toolInfo={textCleanerInfo}
    >
      <TextCleaner
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
