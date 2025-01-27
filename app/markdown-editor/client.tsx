"use client";

import { useState } from "react";
import MarkdownEditor from "@/components/tools/MarkdownEditor";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const markdownEditorInfo = {
  features: [
    "Real-time Markdown preview",
    "Keyboard shortcuts for common formatting",
    "Support for all standard Markdown syntax",
    "Toolbar for quick formatting",
    "Split view with editor and preview",
    "Code syntax highlighting",
    "Table support",
    "Export to HTML option",
  ],
  howToUse: [
    "Type or paste your Markdown in the editor",
    "Use the toolbar buttons for common formatting",
    "Use keyboard shortcuts like Ctrl+B for bold",
    "Switch between Write and Preview modes",
    "Copy the formatted text or export to HTML",
  ],
  faqs: [
    {
      question: "What is Markdown?",
      answer:
        "Markdown is a lightweight markup language that uses plain text formatting syntax. It's designed to be easy to read and write, and can be converted to HTML and other formats.",
    },
    {
      question: "What keyboard shortcuts are available?",
      answer:
        "Common shortcuts include Ctrl+B for bold, Ctrl+I for italic. More shortcuts are available and shown in the toolbar tooltips.",
    },
    {
      question: "Can I use custom CSS in the preview?",
      answer:
        "The preview uses a standard Markdown style. In the exported HTML, you can add your own CSS for custom styling.",
    },
    {
      question: "Does it support tables?",
      answer:
        "Yes, you can create tables using the standard Markdown syntax with pipes and hyphens.",
    },
    {
      question: "Can I import existing Markdown files?",
      answer:
        "Yes, you can paste any existing Markdown text into the editor. The tool will automatically format it according to Markdown rules.",
    },
  ],
};

// Initial markdown example
const initialMarkdown = `# Welcome to the Markdown Editor

This is a **live preview** editor. Start typing to see your changes!

## Features
- Real-time preview
- Support for *italic* and **bold** text
- Lists and numbered lists
- [Links](https://example.com)
- And more!

\`\`\`
// Code blocks with syntax highlighting
function hello() {
  console.log("Hello, World!");
}
\`\`\`
`;

export default function ClientMarkdownEditor() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <ToolPageLayout
      title="Markdown Editor"
      description="Write and preview Markdown with a real-time editor. Perfect for documentation, README files, and formatted text."
      toolInfo={markdownEditorInfo}
    >
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
    </ToolPageLayout>
  );
}
