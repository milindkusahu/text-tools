import { useState, useEffect, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import {
  Copy,
  Download,
  Binary,
  Hash,
  Type,
  Calculator,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

type EncodingFormat = "binary" | "hex" | "octal" | "decimal";
type BinaryFormat = "8bit" | "7bit" | "custom";
type HexFormat = "uppercase" | "lowercase";
type Spacing = "none" | "space" | "comma" | "newline";

interface ConversionResult {
  binary: string;
  hex: string;
  octal: string;
  decimal: string;
  characterBreakdown: Array<{
    char: string;
    ascii: number;
    unicode: number;
    binary: string;
    hex: string;
    octal: string;
  }>;
}

export default function TextToBinaryHex({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [selectedFormat, setSelectedFormat] =
    useState<EncodingFormat>("binary");
  const [binaryFormat, setBinaryFormat] = useState<BinaryFormat>("8bit");
  const [hexFormat, setHexFormat] = useState<HexFormat>("uppercase");
  const [spacing, setSpacing] = useState<Spacing>("space");
  const [customBits, setCustomBits] = useState<number>(8);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showAllFormats, setShowAllFormats] = useState(false);

  // Convert text to binary
  const textToBinary = useCallback(
    (
      text: string,
      format: BinaryFormat,
      bits: number,
      spacingChar: string
    ): string => {
      if (!text) return "";

      const results: string[] = [];
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        let binaryStr = code.toString(2);

        // Adjust bit length based on format
        let targetBits = bits;
        if (format === "7bit") targetBits = 7;
        else if (format === "8bit") targetBits = 8;

        // Pad with leading zeros
        while (binaryStr.length < targetBits) {
          binaryStr = "0" + binaryStr;
        }

        // Truncate if too long
        if (binaryStr.length > targetBits) {
          binaryStr = binaryStr.slice(-targetBits);
        }

        results.push(binaryStr);
      }

      return results.join(spacingChar);
    },
    []
  );

  // Convert text to hexadecimal
  const textToHex = useCallback(
    (text: string, format: HexFormat, spacingChar: string): string => {
      if (!text) return "";

      const results: string[] = [];
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        let hexStr = code.toString(16);

        // Pad with leading zero if needed
        if (hexStr.length % 2 !== 0) {
          hexStr = "0" + hexStr;
        }

        // Apply case formatting
        if (format === "uppercase") {
          hexStr = hexStr.toUpperCase();
        } else {
          hexStr = hexStr.toLowerCase();
        }

        results.push(hexStr);
      }

      return results.join(spacingChar);
    },
    []
  );

  // Convert text to octal
  const textToOctal = useCallback(
    (text: string, spacingChar: string): string => {
      if (!text) return "";

      const results: string[] = [];
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        const octalStr = code.toString(8);
        results.push(octalStr);
      }

      return results.join(spacingChar);
    },
    []
  );

  // Convert text to decimal
  const textToDecimal = useCallback(
    (text: string, spacingChar: string): string => {
      if (!text) return "";

      const results: string[] = [];
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        results.push(code.toString());
      }

      return results.join(spacingChar);
    },
    []
  );

  // Get spacing character
  const getSpacingChar = (spacingType: Spacing): string => {
    switch (spacingType) {
      case "space":
        return " ";
      case "comma":
        return ", ";
      case "newline":
        return "\n";
      default:
        return "";
    }
  };

  // Generate character breakdown
  const generateBreakdown = useCallback((text: string) => {
    if (!text) return [];

    return Array.from(text).map((char) => {
      const ascii = char.charCodeAt(0);
      const unicode = ascii; // For basic ASCII characters
      const binary = ascii.toString(2).padStart(8, "0");
      const hex = ascii.toString(16).padStart(2, "0").toUpperCase();
      const octal = ascii.toString(8);

      return {
        char: char === " " ? "␣" : char, // Show space character
        ascii,
        unicode,
        binary,
        hex,
        octal,
      };
    });
  }, []);

  // Main conversion function
  const convertText = useCallback((): ConversionResult => {
    if (!input.trim()) {
      return {
        binary: "",
        hex: "",
        octal: "",
        decimal: "",
        characterBreakdown: [],
      };
    }

    const spacingChar = getSpacingChar(spacing);
    const binary = textToBinary(input, binaryFormat, customBits, spacingChar);
    const hex = textToHex(input, hexFormat, spacingChar);
    const octal = textToOctal(input, spacingChar);
    const decimal = textToDecimal(input, spacingChar);
    const characterBreakdown = generateBreakdown(input);

    return {
      binary,
      hex,
      octal,
      decimal,
      characterBreakdown,
    };
  }, [
    input,
    binaryFormat,
    hexFormat,
    spacing,
    customBits,
    textToBinary,
    textToHex,
    textToOctal,
    textToDecimal,
    generateBreakdown,
  ]);

  const conversionResult = convertText();

  // Update output based on selected format
  useEffect(() => {
    let result = "";
    const prefix = selectedFormat === "hex" ? "0x" : "";

    switch (selectedFormat) {
      case "binary":
        result = conversionResult.binary;
        break;
      case "hex":
        result = prefix + conversionResult.hex;
        break;
      case "octal":
        result = conversionResult.octal;
        break;
      case "decimal":
        result = conversionResult.decimal;
        break;
    }

    setOutput(result);
  }, [selectedFormat, conversionResult, setOutput]);

  // Copy functions
  const copyResult = async (format?: EncodingFormat) => {
    try {
      let textToCopy = "";
      if (format) {
        const prefix = format === "hex" ? "0x" : "";
        switch (format) {
          case "binary":
            textToCopy = conversionResult.binary;
            break;
          case "hex":
            textToCopy = prefix + conversionResult.hex;
            break;
          case "octal":
            textToCopy = conversionResult.octal;
            break;
          case "decimal":
            textToCopy = conversionResult.decimal;
            break;
        }
      } else {
        textToCopy = output;
      }

      await navigator.clipboard.writeText(textToCopy);
      toast.success(
        `${format ? format.toUpperCase() : "Result"} copied to clipboard!`
      );
    } catch {
      toast.error("Failed to copy result");
    }
  };

  const copyAllFormats = async () => {
    try {
      const allFormats = `Binary: ${conversionResult.binary}
Hexadecimal: 0x${conversionResult.hex}
Octal: ${conversionResult.octal}
Decimal: ${conversionResult.decimal}`;

      await navigator.clipboard.writeText(allFormats);
      toast.success("All formats copied to clipboard!");
    } catch {
      toast.error("Failed to copy all formats");
    }
  };

  const downloadResults = () => {
    const content = `Text to Binary/Hex Conversion Results
=====================================

Original Text: "${input}"

Conversion Results:
------------------
Binary (${binaryFormat}): ${conversionResult.binary}
Hexadecimal: 0x${conversionResult.hex}
Octal: ${conversionResult.octal}
Decimal: ${conversionResult.decimal}

Character Breakdown:
-------------------${conversionResult.characterBreakdown
      .map(
        (item) => `
Character: "${item.char}"
ASCII: ${item.ascii}
Unicode: ${item.unicode}
Binary: ${item.binary}
Hex: 0x${item.hex}
Octal: ${item.octal}`
      )
      .join("")}

Generated on: ${new Date().toLocaleString()}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `text-conversion-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Results downloaded!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.success("All cleared!");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Enter text to convert:
        </label>
        <TextArea
          value={input}
          onChange={setInput}
          placeholder="Type or paste your text here to convert to binary, hex, octal, or decimal..."
          className="min-h-[120px]"
        />
      </div>

      {/* Format Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Output Format:
          </label>
          <select
            value={selectedFormat}
            onChange={(e) =>
              setSelectedFormat(e.target.value as EncodingFormat)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="binary">Binary</option>
            <option value="hex">Hexadecimal</option>
            <option value="octal">Octal</option>
            <option value="decimal">Decimal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Spacing:
          </label>
          <select
            value={spacing}
            onChange={(e) => setSpacing(e.target.value as Spacing)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="none">No spacing</option>
            <option value="space">Space</option>
            <option value="comma">Comma</option>
            <option value="newline">New line</option>
          </select>
        </div>
      </div>

      {/* Binary-specific options */}
      {selectedFormat === "binary" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Binary Format:
            </label>
            <select
              value={binaryFormat}
              onChange={(e) => setBinaryFormat(e.target.value as BinaryFormat)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="8bit">8-bit (Standard)</option>
              <option value="7bit">7-bit (ASCII)</option>
              <option value="custom">Custom bits</option>
            </select>
          </div>

          {binaryFormat === "custom" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Custom Bits:
              </label>
              <input
                type="number"
                min="1"
                max="32"
                value={customBits}
                onChange={(e) => setCustomBits(parseInt(e.target.value) || 8)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      )}

      {/* Hex-specific options */}
      {selectedFormat === "hex" && (
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Hex Format:
          </label>
          <select
            value={hexFormat}
            onChange={(e) => setHexFormat(e.target.value as HexFormat)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="uppercase">Uppercase (A-F)</option>
            <option value="lowercase">Lowercase (a-f)</option>
          </select>
        </div>
      )}

      {/* Quick Actions */}
      {input.trim() && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAllFormats(!showAllFormats)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {showAllFormats ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showAllFormats ? "Hide" : "Show"} All Formats
          </button>
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Type className="w-4 h-4" />
            {showBreakdown ? "Hide" : "Show"} Character Breakdown
          </button>
          <button
            onClick={copyAllFormats}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy All Formats
          </button>
          <button
            onClick={downloadResults}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Results
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All
          </button>
        </div>
      )}

      {/* All Formats Display */}
      {input.trim() && showAllFormats && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            All Conversion Formats
          </h3>
          <div className="grid gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Binary className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Binary ({binaryFormat})</span>
                </div>
                <button
                  onClick={() => copyResult("binary")}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <div className="font-mono text-sm bg-white p-2 rounded border">
                {conversionResult.binary || "No conversion available"}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Hexadecimal</span>
                </div>
                <button
                  onClick={() => copyResult("hex")}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <div className="font-mono text-sm bg-white p-2 rounded border">
                0x{conversionResult.hex || "No conversion available"}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Octal</span>
                </div>
                <button
                  onClick={() => copyResult("octal")}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <div className="font-mono text-sm bg-white p-2 rounded border">
                {conversionResult.octal || "No conversion available"}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-orange-600" />
                  <span className="font-medium">Decimal</span>
                </div>
                <button
                  onClick={() => copyResult("decimal")}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <div className="font-mono text-sm bg-white p-2 rounded border">
                {conversionResult.decimal || "No conversion available"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Character Breakdown */}
      {input.trim() && showBreakdown && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Character Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Char
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    ASCII
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Unicode
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Binary
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Hex
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left">
                    Octal
                  </th>
                </tr>
              </thead>
              <tbody>
                {conversionResult.characterBreakdown.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-mono">
                      {item.char}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 font-mono">
                      {item.ascii}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 font-mono">
                      {item.unicode}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 font-mono text-xs">
                      {item.binary}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 font-mono">
                      0x{item.hex}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 font-mono">
                      {item.octal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Output */}
      {input.trim() && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {selectedFormat.charAt(0).toUpperCase() + selectedFormat.slice(1)}{" "}
              Result:
            </label>
            <button
              onClick={() => copyResult()}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <TextArea
            value={output}
            onChange={() => {}}
            readonly
            className="min-h-[120px] font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
