"use client";

import { useState } from "react";
import SlugGenerator from "@/components/tools/SlugGenerator";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const slugGeneratorInfo = {
  features: [
    "Convert any text to URL-friendly slugs",
    "Multiple separator options (hyphen, underscore, dot)",
    "Optional stop words removal",
    "Case conversion options",
    "Maximum length control",
    "Special character handling",
    "Real-time preview",
    "One-click copy functionality",
  ],
  howToUse: [
    "Enter your text in the input field",
    "Choose your preferred separator type",
    "Adjust additional options as needed",
    "Your URL-friendly slug will be generated automatically",
    "Click the copy button to use your slug",
  ],
  faqs: [
    {
      question: "What is a URL slug?",
      answer:
        "A slug is a URL-friendly version of a title or text, typically used in web addresses. It contains only letters, numbers, and separators, making it both readable and web-safe.",
    },
    {
      question: "Why remove stop words?",
      answer:
        "Stop words (like 'the', 'and', 'or') can make URLs longer without adding value. Removing them creates cleaner, more concise URLs while maintaining readability.",
    },
    {
      question: "Which separator should I use?",
      answer:
        "Hyphens (-) are generally recommended as they're most SEO-friendly. Underscores (_) are common in programming, while dots (.) are less common but valid.",
    },
    {
      question: "What happens to special characters?",
      answer:
        "Special characters, spaces, and punctuation are either removed or converted to the chosen separator to ensure URL compatibility.",
    },
    {
      question: "Is there a recommended slug length?",
      answer:
        "While there's no strict limit, keeping slugs under 60 characters is recommended for SEO and usability. Longer slugs can be automatically truncated at word boundaries.",
    },
  ],
};

export default function ClientSlugGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="URL Slug Generator"
      description="Convert titles and text into clean, SEO-friendly URLs. Perfect for creating web-safe links for your content."
      toolInfo={slugGeneratorInfo}
    >
      <SlugGenerator
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
