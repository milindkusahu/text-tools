"use client";

import { useState } from "react";
import MarkdownEditor from "@/components/tools/MarkdownEditor";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const markdownEditorInfo = {
  features: [
    "Real-time Markdown preview with live updates",
    "Comprehensive keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+K, Ctrl+`, etc.)",
    "Support for all standard Markdown syntax including tables",
    "Rich toolbar with quick formatting buttons",
    "Split view with editor and preview modes",
    "Code syntax highlighting with language-specific colors",
    "Inline and block code styling with dark theme",
    "Export to HTML with proper formatting",
    "Professional code block styling with gradient headers",
  ],
  howToUse: [
    "Type or paste your Markdown in the editor",
    "Use the toolbar buttons for quick formatting",
    "Use keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link), Ctrl+` (code), Ctrl+1/2/3 (headings), Ctrl+L (list), Ctrl+O (numbered list)",
    "Switch between Write and Preview modes or use split view",
    "Code blocks automatically get syntax highlighting",
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
        "We support many shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link), Ctrl+` (inline code), Ctrl+1/2/3 (headings), Ctrl+L (bullet list), Ctrl+O (numbered list), and Ctrl+Enter (double line break).",
    },
    {
      question: "How does syntax highlighting work?",
      answer:
        "Code blocks automatically get syntax highlighting with language-specific colors. We support JavaScript, Python, HTML, CSS, JSON, and other languages with a dark theme and gradient headers.",
    },
    {
      question: "Can I use custom CSS in the preview?",
      answer:
        "The preview uses a professional Markdown style with syntax highlighting. In the exported HTML, you can add your own CSS for custom styling.",
    },
    {
      question: "Does it support tables?",
      answer:
        "Yes, you can create tables using the standard Markdown syntax with pipes and hyphens. The preview will render them with proper styling.",
    },
    {
      question: "Can I import existing Markdown files?",
      answer:
        "Yes, you can paste any existing Markdown text into the editor. The tool will automatically format it according to Markdown rules with full syntax highlighting.",
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
