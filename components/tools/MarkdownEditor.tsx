import { useState, useCallback } from "react";
import { marked } from "marked";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Copy,
  FileDown,
} from "lucide-react";
import toast from "react-hot-toast";

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

interface ToolbarButton {
  icon: React.ReactNode;
  action: () => void;
  title: string;
}

export default function MarkdownEditor({
  markdown,
  setMarkdown,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const insertText = useCallback(
    (before: string, after: string = "") => {
      const textarea = document.querySelector("textarea");
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = markdown.substring(start, end);
      const newText =
        markdown.substring(0, start) +
        before +
        selectedText +
        after +
        markdown.substring(end);

      setMarkdown(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
      }, 0);
    },
    [markdown, setMarkdown]
  );

  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <Bold className="w-4 h-4" />,
      action: () => insertText("**", "**"),
      title: "Bold (Ctrl+B)",
    },
    {
      icon: <Italic className="w-4 h-4" />,
      action: () => insertText("*", "*"),
      title: "Italic (Ctrl+I)",
    },
    {
      icon: <Heading1 className="w-4 h-4" />,
      action: () => insertText("# "),
      title: "Heading 1",
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      action: () => insertText("## "),
      title: "Heading 2",
    },
    {
      icon: <List className="w-4 h-4" />,
      action: () => insertText("- "),
      title: "Bullet List",
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      action: () => insertText("1. "),
      title: "Numbered List",
    },
    {
      icon: <Link className="w-4 h-4" />,
      action: () => insertText("[", "](url)"),
      title: "Link",
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      action: () => insertText("![Alt text](", ")"),
      title: "Image",
    },
    {
      icon: <Code className="w-4 h-4" />,
      action: () => insertText("```\n", "\n```"),
      title: "Code Block",
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          insertText("**", "**");
          break;
        case "i":
          e.preventDefault();
          insertText("*", "*");
          break;
        case "k":
          e.preventDefault();
          insertText("[", "](url)");
          break;
        case "`":
          e.preventDefault();
          insertText("`", "`");
          break;
        case "1":
          e.preventDefault();
          insertText("# ");
          break;
        case "2":
          e.preventDefault();
          insertText("## ");
          break;
        case "3":
          e.preventDefault();
          insertText("### ");
          break;
        case "l":
          e.preventDefault();
          insertText("- ");
          break;
        case "o":
          e.preventDefault();
          insertText("1. ");
          break;
        case "enter":
          e.preventDefault();
          insertText("\n\n");
          break;
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const downloadHTML = async () => {
    try {
      const parser = new marked.Parser();
      const html = parser.parse(marked.Lexer.lex(markdown));
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "markdown.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("HTML file downloaded!");
    } catch {
      toast.error("Failed to export HTML");
    }
  };

  // Simple syntax highlighting for code blocks
  const highlightCode = useCallback((html: string) => {
    // Add basic syntax highlighting classes
    return html
      .replace(
        /<pre><code class="language-(\w+)">/g,
        '<pre><code class="language-$1 syntax-highlighted">'
      )
      .replace(/<pre><code>/g, '<pre><code class="syntax-highlighted">')
      .replace(/<code>/g, '<code class="inline-code">');
  }, []);

  const renderMarkdown = useCallback(() => {
    try {
      const parser = new marked.Parser();
      const html = parser.parse(marked.Lexer.lex(markdown));
      const highlightedHtml = highlightCode(html);
      return { __html: highlightedHtml };
    } catch {
      return { __html: "Error parsing markdown" };
    }
  }, [markdown, highlightCode]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-gray-50 border rounded-lg">
        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title={button.title}
              type="button"
              aria-label={button.title}
            >
              {button.icon}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50"
            title="Copy to Clipboard"
            type="button"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={downloadHTML}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            title="Download HTML"
            type="button"
          >
            <FileDown className="w-4 h-4" />
            Export HTML
          </button>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "write"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("write")}
          type="button"
        >
          Write
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "preview"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("preview")}
          type="button"
        >
          Preview
        </button>
      </div>

      {/* Editor/Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={activeTab === "write" ? "block" : "hidden lg:block"}>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-[600px] p-4 border rounded-lg font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your markdown here..."
          />
        </div>
        <div
          className={`${
            activeTab === "preview" ? "block" : "hidden lg:block"
          } h-[600px] p-4 border rounded-lg overflow-auto prose prose-sm max-w-none markdown-preview`}
          dangerouslySetInnerHTML={renderMarkdown()}
        />
      </div>
    </div>
  );
}
