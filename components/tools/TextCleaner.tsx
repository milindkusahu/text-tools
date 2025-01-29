import { useState, useEffect, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

type CleaningOptions = {
  removeExtraSpaces: boolean;
  removeExtraLines: boolean;
  removeSpecialChars: boolean;
  trimLines: boolean;
  normalizeQuotes: boolean;
};

export default function TextCleaner({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [options, setOptions] = useState<CleaningOptions>({
    removeExtraSpaces: true,
    removeExtraLines: true,
    removeSpecialChars: false,
    trimLines: true,
    normalizeQuotes: false,
  });

  const cleanText = useCallback(
    (text: string, options: CleaningOptions): string => {
      let cleaned = text;

      if (options.trimLines) {
        cleaned = cleaned
          .split("\n")
          .map((line) => line.trim())
          .join("\n");
      }

      if (options.removeExtraSpaces) {
        cleaned = cleaned.replace(/[ \t]+/g, " ");
      }

      if (options.removeExtraLines) {
        cleaned = cleaned.replace(/\n\s*\n\s*\n/g, "\n\n");
      }

      if (options.removeSpecialChars) {
        cleaned = cleaned.replace(/[^\w\s.,!?-]/g, "");
      }

      if (options.normalizeQuotes) {
        cleaned = cleaned
          .replace(/[\u2018\u2019]/g, "'")
          .replace(/[\u201C\u201D]/g, '"');
      }

      return cleaned.trim();
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
    const cleanedText = cleanText(input, options);
    setOutput(cleanedText);
  }, [input, options, cleanText, setOutput]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.removeExtraSpaces}
            onChange={(e) =>
              setOptions({ ...options, removeExtraSpaces: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Remove Extra Spaces</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.removeExtraLines}
            onChange={(e) =>
              setOptions({ ...options, removeExtraLines: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Remove Extra Lines</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.removeSpecialChars}
            onChange={(e) =>
              setOptions({ ...options, removeSpecialChars: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Remove Special Chars</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.trimLines}
            onChange={(e) =>
              setOptions({ ...options, trimLines: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Trim Lines</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.normalizeQuotes}
            onChange={(e) =>
              setOptions({ ...options, normalizeQuotes: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Normalize Quotes</span>
        </label>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text:</label>
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Paste your text here to clean..."
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Cleaned Text:</label>
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
