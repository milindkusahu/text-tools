"use client";

import { useState } from "react";
import EmailExtractor from "@/components/tools/EmailExtractor";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const emailExtractorInfo = {
  features: [
    "Extract email addresses from any text",
    "Validate email formats with RFC compliance",
    "Remove duplicate email addresses",
    "Sort results alphabetically",
    "Export to CSV file",
    "Copy with one click",
    "Show extraction statistics",
    "Process large volumes of text",
  ],
  howToUse: [
    "Paste text containing emails in the input field",
    "Select your extraction options",
    "View extracted emails in real-time",
    "Copy the results or export to CSV",
    "Check the statistics for validation results",
  ],
  faqs: [
    {
      question: "How does email validation work?",
      answer:
        "Our validator checks emails against RFC 5322 standards, verifying formatting, domains, and special characters. It ensures extracted emails have the correct structure.",
    },
    {
      question: "Can it extract emails from HTML?",
      answer:
        "Yes, the extractor can find emails within HTML code. Simply paste the HTML and the tool will identify all email addresses embedded within.",
    },
    {
      question: "How are duplicates handled?",
      answer:
        "When duplicate removal is enabled, the tool keeps only the first occurrence of each email address. The comparison is case-insensitive, so 'Example@gmail.com' and 'example@gmail.com' are considered the same email.",
    },
    {
      question: "Is there a limit to how many emails can be extracted?",
      answer:
        "The tool can process texts with thousands of emails, though performance may vary based on your device. For very large datasets, you might consider processing the text in smaller chunks.",
    },
    {
      question: "Does this tool store extracted emails?",
      answer:
        "No, all processing happens in your browser. The emails are never sent to any server, ensuring your data remains private and secure.",
    },
  ],
};

export default function ClientEmailExtractor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="Email Extractor"
      description="Extract email addresses from text with validation, duplicate removal, and export capabilities."
      toolInfo={emailExtractorInfo}
    >
      <EmailExtractor
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
