"use client";

import { useState } from "react";
import JsonFormatter from "@/components/tools/JsonFormatter";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const jsonFormatterInfo = {
  features: [
    "Real-time JSON validation",
    "Custom indentation options (2-8 spaces)",
    "Minification support",
    "Error detection and highlighting",
    "One-click copy functionality",
    "Clear error messages",
    "Preserve JSON structure",
    "Format large JSON files",
  ],
  howToUse: [
    "Paste your JSON into the input field",
    "Select your preferred indentation size",
    "Choose between pretty print or minified output",
    "Click 'Format JSON' to process",
    "Use the copy button to copy the formatted result",
  ],
  faqs: [
    {
      question: "What is JSON formatting?",
      answer:
        "JSON formatting adds proper indentation and line breaks to make JSON data more readable while maintaining its structure and validity.",
    },
    {
      question: "Why minify JSON?",
      answer:
        "Minifying JSON removes unnecessary whitespace and line breaks, reducing file size for better performance in data transfer and storage.",
    },
    {
      question: "What causes JSON validation errors?",
      answer:
        "Common JSON errors include missing quotes around property names, trailing commas, and incorrect nesting of brackets and braces.",
    },
    {
      question: "Is there a size limit?",
      answer:
        "The tool can handle JSON files up to 1MB in size. For larger files, consider processing them in smaller chunks.",
    },
    {
      question: "Does it modify my data?",
      answer:
        "No, the formatter only changes the presentation (spacing and line breaks) while preserving all data values and structure.",
    },
  ],
};

// Example JSON for initial state
const initialJson = `{
  "example": {
    "message": "Paste your JSON here",
    "numbers": [1, 2, 3],
    "nested": {
      "value": true
    }
  }
}`;

export default function ClientJsonFormatter() {
  const [input, setInput] = useState(initialJson);
  const [output, setOutput] = useState("");

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Format, validate, and beautify your JSON data. Make your JSON readable and catch syntax errors easily."
      toolInfo={jsonFormatterInfo}
    >
      <JsonFormatter
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
