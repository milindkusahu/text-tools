import { useState, useEffect, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { Copy, Minimize2, Maximize2 } from "lucide-react";
import toast from "react-hot-toast";

interface JsonFormatterProps {
  input: string;
  setInput: (value: string) => void;
  output: string;
  setOutput: (value: string) => void;
}

export default function JsonFormatter({
  input,
  setInput,
  output,
  setOutput,
}: JsonFormatterProps) {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [isMinified, setIsMinified] = useState(false);

  const formatJSON = useCallback(
    (jsonString: string, minify: boolean = false) => {
      try {
        // Parse the JSON to validate it
        const parsedJSON = JSON.parse(jsonString);
        setIsValid(true);
        setErrorMessage("");

        // Format with specified indentation or minify
        const formattedJSON = minify
          ? JSON.stringify(parsedJSON)
          : JSON.stringify(parsedJSON, null, indentSize);

        setOutput(formattedJSON);
      } catch (err) {
        setIsValid(false);
        setErrorMessage((err as Error).message);
        setOutput("");
      }
    },
    [indentSize, setOutput]
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const handleFormat = () => {
    formatJSON(input, isMinified);
  };

  const toggleMinify = () => {
    setIsMinified(!isMinified);
    formatJSON(input, !isMinified);
  };

  useEffect(() => {
    if (input.trim()) {
      formatJSON(input, isMinified);
    }
  }, [input, isMinified, formatJSON]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Indent Size:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[2, 4, 6, 8].map((size) => (
              <option key={size} value={size}>
                {size} spaces
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={toggleMinify}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50"
          title={isMinified ? "Prettify JSON" : "Minify JSON"}
        >
          {isMinified ? (
            <>
              <Maximize2 className="w-4 h-4" />
              Prettify
            </>
          ) : (
            <>
              <Minimize2 className="w-4 h-4" />
              Minify
            </>
          )}
        </button>

        <button
          onClick={handleFormat}
          className="px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Format JSON
        </button>
      </div>

      {/* Input/Output */}
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input JSON:</label>
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Paste your JSON here..."
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Formatted JSON:
              {!isValid && (
                <span className="text-red-500 ml-2">Error: {errorMessage}</span>
              )}
            </label>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!isValid}
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <TextArea
            value={output}
            onChange={() => {}}
            readonly
            className={!isValid ? "border-red-300" : ""}
          />
        </div>
      </div>
    </div>
  );
}
