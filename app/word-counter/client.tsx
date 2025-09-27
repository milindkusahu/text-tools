"use client";

import { useState } from "react";
import WordCounter from "@/components/tools/WordCounter";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const wordCounterInfo = {
  features: [
    "Real-time word counting as you type",
    "Character count with and without spaces",
    "Sentence and paragraph counter",
    "Reading time estimation",
    "Keyword density analysis",
    "Support for multiple languages",
    "Automatic saving of your work",
  ],
  howToUse: [
    "Type or paste your text into the input box",
    "Watch as the statistics update automatically",
    "Use the toolbar to format your text if needed",
    "Click the copy button to copy the results",
    "Use the 'Clear' button to start fresh",
  ],
  faqs: [
    {
      question: "How are words counted?",
      answer:
        "Words are counted by identifying groups of characters separated by spaces or punctuation. Hyphenated words count as one word.",
    },
    {
      question: "Does it count special characters?",
      answer:
        "Yes, all characters including spaces, punctuation, and special symbols are included in the character count.",
    },
    {
      question: "Can I count words in other languages?",
      answer:
        "Yes, our word counter supports all languages and correctly counts words in languages that use different writing systems.",
    },
    {
      question: "Is my text saved anywhere?",
      answer:
        "No, all processing happens in your browser. Your text is never sent to our servers or stored anywhere.",
    },
    {
      question: "How is the reading time calculated?",
      answer:
        "Reading time is estimated based on an average reading speed of 250 words per minute for English text.",
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
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in your text. Perfect for essays, social media posts, and content analysis."
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
