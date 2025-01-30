"use client";

import { useState } from "react";
import LoremGenerator from "@/components/tools/LoremGenerator";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const loremGeneratorInfo = {
  features: [
    "Generate paragraphs, sentences, or words",
    "Customizable output length",
    "Optional 'Lorem ipsum' start",
    "HTML paragraph tags support",
    "One-click copy functionality",
    "Random word variation",
    "Realistic text structure",
    "Instant generation",
  ],
  howToUse: [
    "Select your desired output type (paragraphs, sentences, or words)",
    "Set the number of units to generate",
    "Choose whether to start with 'Lorem ipsum'",
    "Enable HTML tags if needed",
    "Copy the generated text with one click",
  ],
  faqs: [
    {
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is dummy text used in design and publishing to demonstrate layout and typography without the distraction of meaningful content.",
    },
    {
      question: "Why use Lorem Ipsum?",
      answer:
        "It helps designers and developers focus on layout and formatting without being distracted by readable content. It also maintains a natural-looking distribution of letters.",
    },
    {
      question: "What's the difference between output types?",
      answer:
        "Paragraphs contain multiple sentences with proper spacing, sentences are single complete thoughts, and words are individual Latin-style terms.",
    },
    {
      question: "Why include HTML tags?",
      answer:
        "HTML tags (<p>) make it easier to paste the generated text directly into web content while maintaining proper paragraph formatting.",
    },
    {
      question: "Is the text truly random?",
      answer:
        "The text is generated using a curated list of Latin-style words, combined randomly while maintaining realistic sentence and paragraph structures.",
    },
  ],
};

export default function ClientLoremGenerator() {
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="Lorem Ipsum Generator"
      description="Generate Lorem Ipsum placeholder text with customizable options. Perfect for mockups, designs, and content layouts."
      toolInfo={loremGeneratorInfo}
    >
      <LoremGenerator output={output} setOutput={setOutput} />
    </ToolPageLayout>
  );
}
