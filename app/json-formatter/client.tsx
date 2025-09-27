"use client";

import { useState } from "react";
import JsonFormatter from "@/components/tools/JsonFormatter";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const jsonFormatterInfo = {
  features: [
    "Real-time JSON validation with instant feedback",
    "Custom indentation options (2, 4, 6, 8 spaces)",
    "Minification support for optimized file sizes",
    "Advanced error detection and highlighting",
    "One-click copy functionality",
    "Clear error messages with specific line references",
    "Preserve JSON structure and data integrity",
    "Large file support with size monitoring",
    "Processing time tracking for performance insights",
    "File size indicators and warnings for large files",
    "Professional formatting with proper spacing",
  ],
  howToUse: [
    "Paste your JSON into the input field",
    "View file size and processing time in the info panel",
    "Select your preferred indentation size (2-8 spaces)",
    "Choose between pretty print or minified output",
    "Watch for warnings on large files (>1MB)",
    "Use the copy button to copy the formatted result",
    "Check processing time for performance monitoring",
  ],
  faqs: [
    {
      question: "What is JSON formatting?",
      answer:
        "JSON formatting adds proper indentation and line breaks to make JSON data more readable while maintaining its structure and validity. Our tool also provides real-time validation and error detection.",
    },
    {
      question: "Why minify JSON?",
      answer:
        "Minifying JSON removes unnecessary whitespace and line breaks, reducing file size for better performance in data transfer and storage. This is especially useful for web APIs and mobile apps.",
    },
    {
      question: "What causes JSON validation errors?",
      answer:
        "Common JSON errors include missing quotes around property names, trailing commas, and incorrect nesting of brackets and braces. Our tool provides specific error messages to help you fix these issues.",
    },
    {
      question: "How does large file handling work?",
      answer:
        "The tool can handle JSON files of any size, but files over 1MB will show a warning. We display file size, processing time, and performance metrics to help you monitor the formatting process.",
    },
    {
      question: "Does it modify my data?",
      answer:
        "No, the formatter only changes the presentation (spacing and line breaks) while preserving all data values and structure. Your original data remains completely intact.",
    },
    {
      question: "What do the performance metrics show?",
      answer:
        "The tool displays file size in MB, processing time in milliseconds, and warnings for large files. This helps you understand the performance impact of formatting different file sizes.",
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
