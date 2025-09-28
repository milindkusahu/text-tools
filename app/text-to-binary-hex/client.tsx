"use client";

import { useState } from "react";
import TextToBinaryHex from "@/components/tools/TextToBinaryHex";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const textToBinaryHexInfo = {
  features: [
    "Convert text to binary (8-bit, 7-bit, and custom bit lengths)",
    "Convert text to hexadecimal with multiple formatting options",
    "Convert text to octal and decimal representations",
    "Support for ASCII and Unicode character encoding",
    "Real-time conversion as you type",
    "Copy individual results or all formats at once",
    "Swap input and output with one click",
    "Support for special characters and emojis",
    "Binary visualization with spacing options",
    "Hex formatting with 0x prefix and uppercase/lowercase",
    "Character-by-character breakdown display",
    "Export results in multiple formats",
  ],
  howToUse: [
    "Enter your text in the input field above",
    "Select your preferred output format (Binary, Hex, Octal, or Decimal)",
    "Choose formatting options like spacing, prefixes, and case",
    "View the converted result in real-time",
    "Use the copy button to copy individual results",
    "Use 'Copy All' to copy all format conversions",
    "Use the swap button to exchange input and output",
    "View the character breakdown for detailed analysis",
  ],
  faqs: [
    {
      question: "What is binary encoding?",
      answer:
        "Binary encoding represents text using only 0s and 1s. Each character is converted to its ASCII or Unicode value, then to binary. For example, 'A' becomes 01000001 in 8-bit binary.",
    },
    {
      question: "What's the difference between 7-bit and 8-bit binary?",
      answer:
        "7-bit binary uses 7 bits per character (ASCII range 0-127), while 8-bit binary uses 8 bits per character (extended ASCII range 0-255). 8-bit can represent more characters including special symbols.",
    },
    {
      question: "How does hexadecimal encoding work?",
      answer:
        "Hexadecimal (hex) uses base-16 numbering (0-9, A-F) to represent binary data more compactly. Each pair of hex digits represents one byte. For example, 'A' becomes 41 in hex.",
    },
    {
      question: "Can I convert special characters and emojis?",
      answer:
        "Yes! The converter supports Unicode characters including emojis, accented letters, and symbols. These are converted to their Unicode code points in the selected format.",
    },
    {
      question: "What is octal encoding?",
      answer:
        "Octal encoding uses base-8 numbering (0-7) to represent binary data. It's less common than hex but still used in some systems. Each octal digit represents 3 binary bits.",
    },
    {
      question: "How accurate are the conversions?",
      answer:
        "All conversions are mathematically precise and use standard encoding schemes (ASCII, Unicode). The tool handles all printable characters and many non-printable ones correctly.",
    },
    {
      question: "Can I convert binary/hex back to text?",
      answer:
        "Yes! Use the swap button to reverse the conversion. The tool can decode binary, hex, octal, and decimal back to their original text representation.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely! All conversions happen in your browser. Your text is never sent to our servers or stored anywhere, ensuring complete privacy and security.",
    },
  ],
};

export default function ClientTextToBinaryHex() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const swapInputOutput = () => {
    setInput(output);
    setOutput(input);
  };

  const restoreItem = (restoreInput: string, restoreOutput: string) => {
    setInput(restoreInput);
    setOutput(restoreOutput);
  };

  return (
    <ToolPageLayout
      title="Text to Binary/Hex Converter"
      description="Convert text to binary, hexadecimal, octal, and decimal formats instantly. Perfect for developers, cybersecurity professionals, and anyone working with data encoding."
      toolInfo={textToBinaryHexInfo}
      input={input}
      output={output}
      onSwapInputOutput={swapInputOutput}
      onRestoreItem={restoreItem}
      toolId="text-to-binary-hex"
    >
      <TextToBinaryHex
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
