"use client";

import { useState } from "react";
import TextEncoder from "@/components/tools/TextEncoder";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const textEncoderInfo = {
  features: [
    "Base64 encoding and decoding for binary data conversion",
    "URL encoding and decoding for safe URL transmission",
    "HTML entity encoding and decoding for web content",
    "Real-time conversion as you type",
    "Swap input and output with one click",
    "Copy results to clipboard instantly",
    "Support for Unicode and special characters",
    "Error handling for invalid input",
  ],
  howToUse: [
    "Select whether you want to encode or decode text",
    "Choose your encoding type: Base64, URL, or HTML entities",
    "Enter your text in the input field",
    "Watch as the conversion happens automatically",
    "Use the copy button to copy the result",
    "Use the swap button to exchange input and output",
  ],
  faqs: [
    {
      question: "What is Base64 encoding used for?",
      answer:
        "Base64 encoding is commonly used to encode binary data (like images or files) into ASCII text format for safe transmission over text-based protocols like email or HTTP.",
    },
    {
      question: "When should I use URL encoding?",
      answer:
        "URL encoding is used when you need to include special characters in URLs. It converts characters like spaces, ampersands, and other special symbols into percent-encoded format.",
    },
    {
      question: "What are HTML entities?",
      answer:
        "HTML entities are special codes used to represent characters that have special meaning in HTML, such as <, >, &, and quotes. They ensure proper display and prevent HTML parsing issues.",
    },
    {
      question: "Can I encode Unicode characters?",
      answer:
        "Yes, all encoding methods support Unicode characters. Base64 and URL encoding will properly handle international characters, and HTML entities can represent any Unicode character.",
    },
    {
      question: "What happens if I try to decode invalid text?",
      answer:
        "The tool will display an error message if the input text is not valid for the selected decoding method. This helps you identify and fix encoding issues.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, all encoding and decoding happens in your browser. Your text is never sent to our servers or stored anywhere, ensuring complete privacy.",
    },
  ],
};

export default function ClientTextEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="Text Encoder/Decoder"
      description="Encode and decode text using Base64, URL encoding, and HTML entities. Perfect for developers, content creators, and anyone working with text data."
      toolInfo={textEncoderInfo}
    >
      <TextEncoder
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
