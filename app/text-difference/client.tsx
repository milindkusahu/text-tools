"use client";

import { useState } from "react";
import TextDiff from "@/components/tools/TextDiff";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const textDiffInfo = {
  features: [
    "Line-by-line comparison of two texts",
    "Highlight additions, deletions, and changes",
    "Option to ignore whitespace differences",
    "Case-sensitive or case-insensitive comparison",
    "Line numbers for easy reference",
    "Copy diff result with markers",
    "Clear and intuitive visual differences",
  ],
  howToUse: [
    "Paste your original text in the left text area",
    "Paste the modified text in the right text area",
    "Use the options to customize comparison (ignore whitespace, case)",
    "Review the differences highlighted below",
    "Use the 'Copy Diff' button to share the results",
  ],
  faqs: [
    {
      question: "How does the comparison work?",
      answer:
        "The tool compares texts line by line, highlighting additions in green and deletions in red. Unchanged lines are shown in normal text.",
    },
    {
      question: "What does 'Ignore Whitespace' do?",
      answer:
        "When enabled, differences in spaces, tabs, and line endings are ignored, focusing on actual content changes.",
    },
    {
      question: "Can I compare code with this tool?",
      answer:
        "Yes, the tool works great for code comparison. It preserves indentation and uses a monospace font for better code readability.",
    },
    {
      question: "Is there a size limit?",
      answer:
        "The tool can handle texts up to 50,000 characters each. For larger texts, we recommend comparing them in smaller chunks.",
    },
    {
      question: "How can I share the comparison results?",
      answer:
        "Use the 'Copy Diff' button to copy the comparison with + and - markers, which you can then share with others.",
    },
  ],
};

export default function ClientTextDiff() {
  const [textOne, setTextOne] = useState("");
  const [textTwo, setTextTwo] = useState("");

  return (
    <ToolPageLayout
      title="Text Difference Checker"
      description="Compare two texts and find the differences. Perfect for comparing versions of documents, code, or any text content."
      toolInfo={textDiffInfo}
    >
      <TextDiff
        textOne={textOne}
        setTextOne={setTextOne}
        textTwo={textTwo}
        setTextTwo={setTextTwo}
      />
    </ToolPageLayout>
  );
}
