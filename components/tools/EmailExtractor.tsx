import { useState, useEffect, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import { Copy, Download, Check, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface ExtractorOptions {
  validateEmails: boolean;
  removeDuplicates: boolean;
  sortAlphabetically: boolean;
}

interface ExtractorStats {
  total: number;
  valid: number;
  invalid: number;
  duplicates: number;
}

// Email regex pattern with good validation
const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;

// Simpler regex for basic extraction
const BASIC_EMAIL_REGEX =
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

export default function EmailExtractor({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [options, setOptions] = useState<ExtractorOptions>({
    validateEmails: true,
    removeDuplicates: true,
    sortAlphabetically: false,
  });

  const [stats, setStats] = useState<ExtractorStats>({
    total: 0,
    valid: 0,
    invalid: 0,
    duplicates: 0,
  });

  const extractEmails = useCallback(
    (text: string, options: ExtractorOptions) => {
      // Use the appropriate regex based on validation setting
      const regex = options.validateEmails ? EMAIL_REGEX : BASIC_EMAIL_REGEX;

      // Extract all emails
      const matches = text.match(regex) || [];

      let emails: string[] = Array.from(matches);
      let duplicateCount = 0;

      // Remove duplicates if option is enabled
      if (options.removeDuplicates) {
        const uniqueSet = new Set<string>();
        const unique: string[] = [];

        emails.forEach((email) => {
          const normalizedEmail = email.toLowerCase();
          if (!uniqueSet.has(normalizedEmail)) {
            uniqueSet.add(normalizedEmail);
            unique.push(email);
          } else {
            duplicateCount++;
          }
        });

        emails = unique;
      }

      // Sort alphabetically if option is enabled
      if (options.sortAlphabetically) {
        emails.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      }

      // Validation statistics
      let validCount = 0;
      let invalidCount = 0;

      if (options.validateEmails) {
        emails.forEach((email) => {
          if (EMAIL_REGEX.test(email)) {
            validCount++;
          } else {
            invalidCount++;
          }
        });
      } else {
        validCount = emails.length;
      }

      // Update statistics
      setStats({
        total: emails.length,
        valid: validCount,
        invalid: invalidCount,
        duplicates: duplicateCount,
      });

      // Update the output
      setOutput(emails.join("\n"));
    },
    [setOutput]
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Emails copied to clipboard!");
    } catch {
      toast.error("Failed to copy emails");
    }
  };

  const downloadCSV = () => {
    try {
      const emails = output
        .split("\n")
        .filter((email) => email.trim().length > 0);
      const csvContent = emails.join(",\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "extracted_emails.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("CSV file downloaded!");
    } catch {
      toast.error("Failed to download CSV");
    }
  };

  useEffect(() => {
    extractEmails(input, options);
  }, [input, options, extractEmails]);

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.validateEmails}
            onChange={(e) =>
              setOptions({ ...options, validateEmails: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Validate Emails</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.removeDuplicates}
            onChange={(e) =>
              setOptions({ ...options, removeDuplicates: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Remove Duplicates</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.sortAlphabetically}
            onChange={(e) =>
              setOptions({ ...options, sortAlphabetically: e.target.checked })
            }
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Sort Alphabetically</span>
        </label>
      </div>

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text:</label>
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Paste your text containing emails here..."
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Extracted Emails:
            </label>
            <div className="flex gap-2">
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50"
                disabled={!output}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={!output}
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
            placeholder="Extracted emails will appear here..."
          />
        </div>
      </div>

      {/* Stats */}
      {stats.total > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="text-sm text-gray-500">Total Emails</div>
            <div className="text-2xl font-semibold">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-1">
              <div className="text-sm text-gray-500">Valid Emails</div>
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-semibold text-green-500">
              {stats.valid}
            </div>
          </div>
          {options.validateEmails && stats.invalid > 0 && (
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-1">
                <div className="text-sm text-gray-500">Invalid Emails</div>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-semibold text-amber-500">
                {stats.invalid}
              </div>
            </div>
          )}
          {options.removeDuplicates && stats.duplicates > 0 && (
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="text-sm text-gray-500">Duplicates Removed</div>
              <div className="text-2xl font-semibold text-blue-500">
                {stats.duplicates}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
