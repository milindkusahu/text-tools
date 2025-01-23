import { useState, useEffect, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab";

export default function CaseConverter({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [selectedCase, setSelectedCase] = useState<CaseType>("upper");

  const convertCase = useCallback((text: string, type: CaseType): string => {
    switch (type) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "title":
        return text
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      case "sentence":
        return text
          .toLowerCase()
          .split(". ")
          .map(
            (sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1)
          )
          .join(". ");
      case "camel":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
      case "pascal":
        return text
          .toLowerCase()
          .split(/[^a-zA-Z0-9]+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");
      case "snake":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "_")
          .replace(/([A-Z])/g, "_$1")
          .toLowerCase();
      case "kebab":
        return text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase();
      default:
        return text;
    }
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  useEffect(() => {
    const convertedText = convertCase(input, selectedCase);
    setOutput(convertedText);
  }, [input, selectedCase, convertCase, setOutput]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedCase}
          onChange={(e) => setSelectedCase(e.target.value as CaseType)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="upper">UPPER CASE</option>
          <option value="lower">lower case</option>
          <option value="title">Title Case</option>
          <option value="sentence">Sentence case</option>
          <option value="camel">camelCase</option>
          <option value="pascal">PascalCase</option>
          <option value="snake">snake_case</option>
          <option value="kebab">kebab-case</option>
        </select>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text:</label>
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Enter your text here..."
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Converted Text:</label>
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
