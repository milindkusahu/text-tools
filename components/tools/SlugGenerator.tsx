import { useState, useEffect, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface SlugOptions {
  separator: "-" | "_" | ".";
  lowercase: boolean;
  removeStopWords: boolean;
  maxLength: number;
}

// Common English stop words that might be removed
const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "was",
  "were",
  "will",
  "with",
]);

export default function SlugGenerator({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [options, setOptions] = useState<SlugOptions>({
    separator: "-",
    lowercase: true,
    removeStopWords: false,
    maxLength: 100,
  });

  const generateSlug = useCallback(
    (text: string, options: SlugOptions): string => {
      let words = text
        // Convert to lowercase if option is enabled
        .split(/\s+/)
        .filter((word) => word.length > 0)
        .map((word) => {
          // Remove special characters and convert to lowercase if needed
          word = word.replace(/[^\w\s-]/g, "");
          return options.lowercase ? word.toLowerCase() : word;
        });

      // Remove stop words if option is enabled
      if (options.removeStopWords) {
        words = words.filter((word) => !stopWords.has(word.toLowerCase()));
      }

      // Join words with selected separator
      let slug = words.join(options.separator);

      // Trim to max length if needed, ensuring we don't cut in the middle of a word
      if (slug.length > options.maxLength) {
        const truncated = slug.slice(0, options.maxLength);
        const lastSeparatorIndex = truncated.lastIndexOf(options.separator);
        if (lastSeparatorIndex !== -1) {
          slug = truncated.slice(0, lastSeparatorIndex);
        }
      }

      return slug;
    },
    []
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  useEffect(() => {
    const generatedSlug = generateSlug(input, options);
    setOutput(generatedSlug);
  }, [input, options, generateSlug, setOutput]);

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Separator:</label>
            <select
              value={options.separator}
              onChange={(e) =>
                setOptions({
                  ...options,
                  separator: e.target.value as "-" | "_" | ".",
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
              <option value=".">Dot (.)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Max Length:
            </label>
            <input
              type="number"
              value={options.maxLength}
              onChange={(e) =>
                setOptions({
                  ...options,
                  maxLength: Math.max(1, parseInt(e.target.value) || 1),
                })
              }
              min="1"
              max="200"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={(e) =>
                setOptions({ ...options, lowercase: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Convert to lowercase</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.removeStopWords}
              onChange={(e) =>
                setOptions({ ...options, removeStopWords: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Remove common stop words</span>
          </label>
        </div>
      </div>

      {/* Input/Output */}
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text:</label>
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Enter your text here to generate a URL-friendly slug..."
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Generated Slug:</label>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <TextArea value={output} onChange={() => {}} readonly />
        </div>
      </div>
    </div>
  );
}
