"use client";

import { useState } from "react";
import MarkdownEditor from "@/components/tools/MarkdownEditor";

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
    <div className="min-h-screen bg-gray-50">
      {/* Tool Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Markdown Editor
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Write and preview Markdown with a real-time editor. Perfect for
            documentation, README files, and formatted text.
          </p>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
        </div>

        {/* Tool Information Section */}
        <div className="mt-8 space-y-8">
          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="text-gray-700">
                  Real-time Markdown preview with live updates
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="text-gray-700">
                  Comprehensive keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+K,
                  Ctrl+`, etc.)
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="text-gray-700">
                  Support for all standard Markdown syntax including tables
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="text-gray-700">
                  Rich toolbar with quick formatting buttons
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="text-gray-700">
                  Split view with editor and preview modes
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="text-gray-700">
                  Code syntax highlighting with language-specific colors
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="text-gray-700">
                  Inline and block code styling with dark theme
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="text-gray-700">
                  Export to HTML with proper formatting
                </span>
              </li>
            </ul>
          </div>

          {/* How to Use */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Use
            </h2>
            <ol className="space-y-3">
              <li className="flex">
                <span className="font-bold text-blue-600 mr-3">1.</span>
                <span className="text-gray-700">
                  Type or paste your Markdown in the editor
                </span>
              </li>
              <li className="flex">
                <span className="font-bold text-blue-600 mr-3">2.</span>
                <span className="text-gray-700">
                  Use the toolbar buttons for quick formatting
                </span>
              </li>
              <li className="flex">
                <span className="font-bold text-blue-600 mr-3">3.</span>
                <span className="text-gray-700">
                  Use keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K
                  (link), Ctrl+` (code), Ctrl+1/2/3 (headings), Ctrl+L (list),
                  Ctrl+O (numbered list)
                </span>
              </li>
              <li className="flex">
                <span className="font-bold text-blue-600 mr-3">4.</span>
                <span className="text-gray-700">
                  Switch between Write and Preview modes or use split view
                </span>
              </li>
              <li className="flex">
                <span className="font-bold text-blue-600 mr-3">5.</span>
                <span className="text-gray-700">
                  Code blocks automatically get syntax highlighting
                </span>
              </li>
              <li className="flex">
                <span className="font-bold text-blue-600 mr-3">6.</span>
                <span className="text-gray-700">
                  Copy the formatted text or export to HTML
                </span>
              </li>
            </ol>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is Markdown?
                </h3>
                <p className="text-gray-700">
                  Markdown is a lightweight markup language that uses plain text
                  formatting syntax. It&apos;s designed to be easy to read and
                  write, and can be converted to HTML and other formats.
                </p>
              </div>
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What keyboard shortcuts are available?
                </h3>
                <p className="text-gray-700">
                  We support many shortcuts: Ctrl+B (bold), Ctrl+I (italic),
                  Ctrl+K (link), Ctrl+` (inline code), Ctrl+1/2/3 (headings),
                  Ctrl+L (bullet list), Ctrl+O (numbered list), and Ctrl+Enter
                  (double line break).
                </p>
              </div>
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How does syntax highlighting work?
                </h3>
                <p className="text-gray-700">
                  Code blocks automatically get syntax highlighting with
                  language-specific colors. We support JavaScript, Python, HTML,
                  CSS, JSON, and other languages with a dark theme and gradient
                  headers.
                </p>
              </div>
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I use custom CSS in the preview?
                </h3>
                <p className="text-gray-700">
                  The preview uses a professional Markdown style with syntax
                  highlighting. In the exported HTML, you can add your own CSS
                  for custom styling.
                </p>
              </div>
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Does it support tables?
                </h3>
                <p className="text-gray-700">
                  Yes, you can create tables using the standard Markdown syntax
                  with pipes and hyphens. The preview will render them with
                  proper styling.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I import existing Markdown files?
                </h3>
                <p className="text-gray-700">
                  Yes, you can paste any existing Markdown text into the editor.
                  The tool will automatically format it according to Markdown
                  rules with full syntax highlighting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
