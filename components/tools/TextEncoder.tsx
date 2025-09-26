import { useState, useEffect, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import { Copy, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

type EncodingType = "base64" | "url" | "html";

export default function TextEncoder({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [selectedEncoding, setSelectedEncoding] =
    useState<EncodingType>("base64");
  const [isEncoding, setIsEncoding] = useState(true);

  const encodeText = useCallback((text: string, type: EncodingType): string => {
    try {
      switch (type) {
        case "base64":
          return btoa(unescape(encodeURIComponent(text)));
        case "url":
          return encodeURIComponent(text);
        case "html":
          return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        default:
          return text;
      }
    } catch {
      return "Error encoding text";
    }
  }, []);

  const decodeText = useCallback((text: string, type: EncodingType): string => {
    try {
      switch (type) {
        case "base64":
          return decodeURIComponent(escape(atob(text)));
        case "url":
          return decodeURIComponent(text);
        case "html":
          return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
        default:
          return text;
      }
    } catch {
      return "Error decoding text";
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

  const swapInputOutput = () => {
    setInput(output);
    setOutput(input);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  useEffect(() => {
    if (input.trim()) {
      const result = isEncoding
        ? encodeText(input, selectedEncoding)
        : decodeText(input, selectedEncoding);
      setOutput(result);
    } else {
      setOutput("");
    }
  }, [input, selectedEncoding, isEncoding, encodeText, decodeText, setOutput]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setIsEncoding(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isEncoding
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setIsEncoding(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !isEncoding
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Decode
          </button>
        </div>

        <select
          value={selectedEncoding}
          onChange={(e) => setSelectedEncoding(e.target.value as EncodingType)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="base64">Base64</option>
          <option value="url">URL Encoding</option>
          <option value="html">HTML Entities</option>
        </select>

        <div className="flex gap-2 ml-auto">
          <button
            onClick={swapInputOutput}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Swap
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Input/Output Areas */}
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {isEncoding ? "Original Text:" : "Encoded Text:"}
          </label>
          <TextArea
            value={input}
            onChange={setInput}
            placeholder={
              isEncoding
                ? "Enter text to encode..."
                : "Enter encoded text to decode..."
            }
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              {isEncoding ? "Encoded Text:" : "Decoded Text:"}
            </label>
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

      {/* Information Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          {selectedEncoding.toUpperCase()}{" "}
          {isEncoding ? "Encoding" : "Decoding"}
        </h3>
        <p className="text-sm text-blue-800">
          {selectedEncoding === "base64" &&
            isEncoding &&
            "Base64 encoding converts binary data to ASCII text using 64 characters (A-Z, a-z, 0-9, +, /)."}
          {selectedEncoding === "base64" &&
            !isEncoding &&
            "Base64 decoding converts ASCII text back to binary data."}
          {selectedEncoding === "url" &&
            isEncoding &&
            "URL encoding converts special characters to percent-encoded format for safe transmission in URLs."}
          {selectedEncoding === "url" &&
            !isEncoding &&
            "URL decoding converts percent-encoded characters back to their original form."}
          {selectedEncoding === "html" &&
            isEncoding &&
            "HTML entity encoding converts special characters to HTML entities for safe display in HTML."}
          {selectedEncoding === "html" &&
            !isEncoding &&
            "HTML entity decoding converts HTML entities back to their original characters."}
        </p>
      </div>
    </div>
  );
}
