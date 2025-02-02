import { useState, useEffect, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import { Copy, Download } from "lucide-react";
import toast from "react-hot-toast";

interface KeywordStats {
  word: string;
  count: number;
  density: number;
}

interface AnalyzerOptions {
  minWordLength: number;
  excludeCommonWords: boolean;
  caseSensitive: boolean;
  includeNumbers: boolean;
}

const COMMON_WORDS = new Set([
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
]);

export default function KeywordAnalyzer({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [options, setOptions] = useState<AnalyzerOptions>({
    minWordLength: 3,
    excludeCommonWords: true,
    caseSensitive: false,
    includeNumbers: false,
  });

  const [keywordStats, setKeywordStats] = useState<KeywordStats[]>([]);
  const [totalWords, setTotalWords] = useState(0);

  const analyzeText = useCallback(
    (text: string, options: AnalyzerOptions) => {
      // Split text into words
      const words = text.match(/\b\w+\b/g) || [];
      setTotalWords(words.length);

      // Count word frequencies
      const wordCount: { [key: string]: number } = {};
      words.forEach((word) => {
        // Apply case sensitivity option
        const processedWord = options.caseSensitive ? word : word.toLowerCase();

        // Skip based on options
        if (processedWord.length < options.minWordLength) return;
        if (!options.includeNumbers && /^\d+$/.test(processedWord)) return;
        if (options.excludeCommonWords && COMMON_WORDS.has(processedWord))
          return;

        wordCount[processedWord] = (wordCount[processedWord] || 0) + 1;
      });

      // Calculate density and sort
      const stats: KeywordStats[] = Object.entries(wordCount)
        .map(([word, count]) => ({
          word,
          count,
          density: (count / words.length) * 100,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 50); // Top 50 keywords

      setKeywordStats(stats);

      // Format output text
      const outputText = stats
        .map(
          (stat) =>
            `${stat.word}: ${stat.count} times (${stat.density.toFixed(2)}%)`
        )
        .join("\n");
      setOutput(outputText);
    },
    [setOutput]
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const downloadCSV = () => {
    try {
      const csvContent = [
        ["Keyword", "Count", "Density (%)", "Total Words"],
        ...keywordStats.map((stat) => [
          stat.word,
          stat.count.toString(),
          stat.density.toFixed(2),
          totalWords.toString(),
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "keyword-analysis.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("CSV file downloaded!");
    } catch {
      toast.error("Failed to download CSV");
    }
  };

  useEffect(() => {
    if (input.trim()) {
      analyzeText(input, options);
    }
  }, [input, options, analyzeText]);

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Minimum Word Length:
          </label>
          <input
            type="number"
            value={options.minWordLength}
            onChange={(e) =>
              setOptions({
                ...options,
                minWordLength: Math.max(1, parseInt(e.target.value) || 1),
              })
            }
            min="1"
            max="20"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.excludeCommonWords}
              onChange={(e) =>
                setOptions({ ...options, excludeCommonWords: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Exclude Common Words</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.caseSensitive}
              onChange={(e) =>
                setOptions({ ...options, caseSensitive: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Case Sensitive</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) =>
                setOptions({ ...options, includeNumbers: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Include Numbers</span>
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
            placeholder="Paste your text here for keyword analysis..."
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Keyword Analysis Results:{" "}
              {totalWords > 0 && `(${totalWords} total words)`}
            </label>
            <div className="flex gap-2">
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50"
                title="Download CSV"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>
          <TextArea
            value={output}
            onChange={() => {}}
            readonly
            className="font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
}
