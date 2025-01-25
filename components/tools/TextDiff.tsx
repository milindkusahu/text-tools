import { useState, useEffect, useCallback } from "react";
import { Trash2, Copy } from "lucide-react";
import toast from "react-hot-toast";

interface TextDiffProps {
  textOne: string;
  setTextOne: (value: string) => void;
  textTwo: string;
  setTextTwo: (value: string) => void;
}

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  lineNumber: number;
}

export default function TextDiff({
  textOne,
  setTextOne,
  textTwo,
  setTextTwo,
}: TextDiffProps) {
  const [diffResult, setDiffResult] = useState<DiffLine[]>([]);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);

  const preprocessText = useCallback(
    (text: string): string[] => {
      let lines = text.split("\n");

      if (ignoreWhitespace) {
        lines = lines.map((line) => line.trim());
      }

      if (ignoreCase) {
        lines = lines.map((line) => line.toLowerCase());
      }

      return lines;
    },
    [ignoreWhitespace, ignoreCase]
  );

  const findDiff = useCallback(
    (text1: string, text2: string) => {
      const lines1 = preprocessText(text1);
      const lines2 = preprocessText(text2);
      const result: DiffLine[] = [];
      let lineNumber = 1;

      const maxLines = Math.max(lines1.length, lines2.length);

      for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || "";
        const line2 = lines2[i] || "";

        if (line1 === line2) {
          result.push({
            type: "unchanged",
            text: text1.split("\n")[i] || "",
            lineNumber,
          });
        } else {
          if (line1) {
            result.push({
              type: "removed",
              text: text1.split("\n")[i],
              lineNumber,
            });
          }
          if (line2) {
            result.push({
              type: "added",
              text: text2.split("\n")[i] || "",
              lineNumber,
            });
          }
        }
        lineNumber++;
      }

      return result;
    },
    [preprocessText]
  );

  useEffect(() => {
    const diff = findDiff(textOne, textTwo);
    setDiffResult(diff);
  }, [textOne, textTwo, findDiff]);

  const clearTexts = () => {
    setTextOne("");
    setTextTwo("");
  };

  const copyDiff = async () => {
    try {
      const diffText = diffResult
        .map((line) => {
          const prefix =
            line.type === "added"
              ? "+ "
              : line.type === "removed"
              ? "- "
              : "  ";
          return `${prefix}${line.text}`;
        })
        .join("\n");

      await navigator.clipboard.writeText(diffText);
      toast.success("Diff copied to clipboard!");
    } catch {
      toast.error("Failed to copy diff");
    }
  };

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Ignore Whitespace</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Ignore Case</span>
          </label>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearTexts}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
          <button
            onClick={copyDiff}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Copy className="w-4 h-4" />
            Copy Diff
          </button>
        </div>
      </div>

      {/* Text Areas */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Original Text:
          </label>
          <textarea
            value={textOne}
            onChange={(e) => setTextOne(e.target.value)}
            className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter original text..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Modified Text:
          </label>
          <textarea
            value={textTwo}
            onChange={(e) => setTextTwo(e.target.value)}
            className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter modified text..."
          />
        </div>
      </div>

      {/* Diff Result */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b">
          <h3 className="font-medium">Differences</h3>
        </div>
        <div className="p-4 space-y-1 font-mono text-sm">
          {diffResult.map((line, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                line.type === "added"
                  ? "bg-green-50 text-green-700"
                  : line.type === "removed"
                  ? "bg-red-50 text-red-700"
                  : ""
              }`}
            >
              <span className="w-8 text-gray-400 flex-shrink-0">
                {line.lineNumber}
              </span>
              <span className="w-4 flex-shrink-0">
                {line.type === "added"
                  ? "+"
                  : line.type === "removed"
                  ? "-"
                  : " "}
              </span>
              <span className="whitespace-pre-wrap">{line.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
