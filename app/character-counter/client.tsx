"use client";

import { useState } from "react";
import CharacterCounterPro from "@/components/tools/CharacterCounterPro";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const characterCounterInfo = {
  features: [
    "Real-time character and word counting",
    "Social media character limit tracking",
    "Advanced text statistics analysis",
    "Word length analytics",
    "Paragraph and sentence counting",
    "Copy text functionality",
    "Multiple platform support",
    "Detailed text insights",
  ],
  howToUse: [
    "Type or paste your text in the input field",
    "View real-time character and word counts",
    "Check social media platform limits",
    "Analyze text statistics and metrics",
    "Copy text with one click",
  ],
  faqs: [
    {
      question: "How are words counted?",
      answer:
        "Words are counted by splitting text on spaces and punctuation, ignoring empty strings. A word is any sequence of characters separated by spaces.",
    },
    {
      question: "How accurate are social media limits?",
      answer:
        "Our social media character limits are regularly updated to match platform specifications. The tool shows real-time warnings when approaching limits.",
    },
    {
      question: "What counts as a paragraph?",
      answer:
        "A paragraph is defined as text separated by one or more blank lines. Single line breaks within text are counted as the same paragraph.",
    },
    {
      question: "Are emojis and special characters counted?",
      answer:
        "Yes, emojis and special characters are counted as characters. Some platforms may count emojis as multiple characters.",
    },
    {
      question: "How is average word length calculated?",
      answer:
        "Average word length is calculated by dividing the total number of characters (excluding spaces) by the total number of words.",
    },
  ],
};

export default function ClientCharacterCounter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="Character Counter Pro"
      description="Advanced text analysis tool with social media character limits, word statistics, and comprehensive text metrics."
      toolInfo={characterCounterInfo}
    >
      <CharacterCounterPro
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
