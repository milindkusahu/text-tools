import { useState, useEffect, useCallback, useMemo } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import {
  Copy,
  RefreshCw,
  Check,
  X,
  Hash,
  Settings,
  Eye,
  Download,
  Zap,
  Shield,
  Target,
} from "lucide-react";
import toast from "react-hot-toast";

interface PermalinkOptions {
  strategy: "seo" | "uuid" | "hash" | "timestamp" | "custom" | "smart";
  separator: "-" | "_" | "." | "";
  maxLength: number;
  preserveCase: boolean;
  removeStopWords: boolean;
  addPrefix: string;
  addSuffix: string;
  includeDate: boolean;
  dateFormat: "YYYY-MM-DD" | "YYYY/MM/DD" | "MM-DD-YYYY" | "DD-MM-YYYY";
  customPattern: string;
  hashLength: number;
  includeRandom: boolean;
  randomLength: number;
}

interface PermalinkResult {
  original: string;
  permalink: string;
  strategy: string;
  length: number;
  seoScore: number;
  uniqueness: number;
  readability: number;
  timestamp: number;
}

interface ValidationResult {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
}

export default function PermalinkGenerator({
  input,
  setInput,
  setOutput,
}: ToolProps) {
  const [options, setOptions] = useState<PermalinkOptions>({
    strategy: "smart",
    separator: "-",
    maxLength: 60,
    preserveCase: false,
    removeStopWords: true,
    addPrefix: "",
    addSuffix: "",
    includeDate: false,
    dateFormat: "YYYY-MM-DD",
    customPattern: "{title}-{date}-{random}",
    hashLength: 8,
    includeRandom: false,
    randomLength: 4,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generatedPermalinks, setGeneratedPermalinks] = useState<
    PermalinkResult[]
  >([]);
  const [selectedPermalink, setSelectedPermalink] = useState<string>("");
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);

  // Stop words for SEO optimization - memoized to prevent recreation
  const stopWords = useMemo(
    () =>
      new Set([
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
        "will",
        "with",
        "would",
        "you",
        "your",
        "this",
        "these",
        "they",
        "them",
        "their",
        "there",
        "then",
        "than",
        "but",
        "or",
        "so",
        "if",
        "when",
        "where",
        "why",
        "how",
        "what",
        "who",
        "which",
        "can",
        "could",
        "should",
        "may",
        "might",
        "must",
        "shall",
        "will",
        "would",
      ]),
    []
  );

  // Generate random string
  const generateRandomString = useCallback((length: number): string => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  // Format date according to pattern
  const formatDate = useCallback((format: string): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    switch (format) {
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;
      case "YYYY/MM/DD":
        return `${year}/${month}/${day}`;
      case "MM-DD-YYYY":
        return `${month}-${day}-${year}`;
      case "DD-MM-YYYY":
        return `${day}-${month}-${year}`;
      default:
        return `${year}-${month}-${day}`;
    }
  }, []);

  // Clean and normalize text
  const cleanText = useCallback(
    (text: string, options: PermalinkOptions): string => {
      let cleaned = text.trim();

      // Remove HTML tags
      cleaned = cleaned.replace(/<[^>]*>/g, "");

      // Remove special characters but keep spaces and basic punctuation
      cleaned = cleaned.replace(/[^\w\s\-\.]/g, " ");

      // Replace multiple spaces with single space
      cleaned = cleaned.replace(/\s+/g, " ");

      // Convert to lowercase if not preserving case
      if (!options.preserveCase) {
        cleaned = cleaned.toLowerCase();
      }

      // Remove stop words if enabled
      if (options.removeStopWords) {
        const words = cleaned.split(" ");
        cleaned = words
          .filter((word) => !stopWords.has(word.toLowerCase()))
          .join(" ");
      }

      return cleaned.trim();
    },
    [stopWords]
  );

  // Generate permalink based on strategy
  const generatePermalink = useCallback(
    (text: string, strategy: string, options: PermalinkOptions): string => {
      if (!text.trim()) return "";

      const cleaned = cleanText(text, options);
      let permalink = "";

      switch (strategy) {
        case "seo":
          permalink = cleaned
            .split(" ")
            .filter((word) => word.length > 0)
            .join(options.separator);
          break;

        case "uuid":
          const uuid = crypto.randomUUID();
          permalink = uuid.replace(/-/g, options.separator);
          break;

        case "hash":
          const hash = btoa(cleaned)
            .replace(/[^a-zA-Z0-9]/g, "")
            .substring(0, options.hashLength);
          permalink = hash;
          break;

        case "timestamp":
          const timestamp = Date.now().toString();
          permalink = `post-${timestamp}`;
          break;

        case "custom":
          permalink = options.customPattern
            .replace("{title}", cleaned.replace(/\s+/g, options.separator))
            .replace(
              "{date}",
              options.includeDate ? formatDate(options.dateFormat) : ""
            )
            .replace(
              "{random}",
              options.includeRandom
                ? generateRandomString(options.randomLength)
                : ""
            )
            .replace(/\s+/g, options.separator);
          break;

        case "smart":
        default:
          // Smart strategy: SEO-friendly with intelligent word selection
          const words = cleaned.split(" ").filter((word) => word.length > 2);
          const smartWords = words.slice(0, 6); // Take first 6 meaningful words
          permalink = smartWords.join(options.separator);
          break;
      }

      // Add prefix and suffix
      if (options.addPrefix) {
        permalink = `${options.addPrefix}${options.separator}${permalink}`;
      }
      if (options.addSuffix) {
        permalink = `${permalink}${options.separator}${options.addSuffix}`;
      }

      // Truncate to max length
      if (permalink.length > options.maxLength) {
        permalink = permalink.substring(0, options.maxLength);
        // Remove trailing separator
        if (permalink.endsWith(options.separator)) {
          permalink = permalink.slice(0, -1);
        }
      }

      return permalink;
    },
    [cleanText, formatDate, generateRandomString]
  );

  // Calculate SEO score
  const calculateSEOScore = useCallback(
    (permalink: string): number => {
      let score = 0;
      const length = permalink.length;

      // Length score (optimal: 30-60 characters)
      if (length >= 30 && length <= 60) score += 30;
      else if (length >= 20 && length <= 80) score += 20;
      else if (length >= 10 && length <= 100) score += 10;

      // Word count score (optimal: 3-5 words)
      const wordCount = permalink.split(options.separator).length;
      if (wordCount >= 3 && wordCount <= 5) score += 25;
      else if (wordCount >= 2 && wordCount <= 7) score += 15;

      // Character variety score
      const uniqueChars = new Set(permalink.toLowerCase()).size;
      const varietyScore = Math.min(20, (uniqueChars / length) * 20);
      score += varietyScore;

      // No numbers at start score
      if (!/^\d/.test(permalink)) score += 15;

      // No special characters score
      if (!/[^a-zA-Z0-9\-_]/.test(permalink)) score += 10;

      return Math.min(100, score);
    },
    [options.separator]
  );

  // Calculate uniqueness score
  const calculateUniqueness = useCallback(
    (permalink: string): number => {
      const words = permalink.split(options.separator);
      const uniqueWords = new Set(words).size;
      return Math.min(100, (uniqueWords / words.length) * 100);
    },
    [options.separator]
  );

  // Calculate readability score
  const calculateReadability = useCallback(
    (permalink: string): number => {
      const words = permalink.split(options.separator);
      const avgWordLength =
        words.reduce((sum, word) => sum + word.length, 0) / words.length;

      // Optimal word length: 4-8 characters
      if (avgWordLength >= 4 && avgWordLength <= 8) return 100;
      if (avgWordLength >= 3 && avgWordLength <= 10) return 80;
      if (avgWordLength >= 2 && avgWordLength <= 12) return 60;
      return 40;
    },
    [options.separator]
  );

  // Validate permalink
  const validatePermalink = useCallback(
    (permalink: string): ValidationResult => {
      const issues: string[] = [];
      const suggestions: string[] = [];

      if (!permalink) {
        return {
          isValid: false,
          issues: ["Permalink is empty"],
          suggestions: ["Enter some text to generate a permalink"],
        };
      }

      // Length validation
      if (permalink.length < 5) {
        issues.push("Too short (minimum 5 characters)");
        suggestions.push("Add more descriptive words");
      }
      if (permalink.length > 100) {
        issues.push("Too long (maximum 100 characters recommended)");
        suggestions.push("Consider shortening the permalink");
      }

      // Character validation
      if (/[^a-zA-Z0-9\-_]/.test(permalink)) {
        issues.push("Contains special characters");
        suggestions.push("Use only letters, numbers, hyphens, and underscores");
      }

      // Starts with number
      if (/^\d/.test(permalink)) {
        issues.push("Starts with a number");
        suggestions.push("Start with a letter for better SEO");
      }

      // Multiple separators
      if (new RegExp(`\\${options.separator}{2,}`).test(permalink)) {
        issues.push("Contains multiple consecutive separators");
        suggestions.push("Remove duplicate separators");
      }

      // Ends with separator
      if (permalink.endsWith(options.separator)) {
        issues.push("Ends with a separator");
        suggestions.push("Remove trailing separator");
      }

      return {
        isValid: issues.length === 0,
        issues,
        suggestions,
      };
    },
    [options.separator]
  );

  // Generate multiple permalink variations - wrapped in useCallback to prevent recreation
  const generateVariations = useCallback(
    (text: string, currentOptions: PermalinkOptions): PermalinkResult[] => {
      const strategies: Array<{ key: string; name: string }> = [
        { key: "smart", name: "Smart SEO" },
        { key: "seo", name: "SEO Optimized" },
        { key: "uuid", name: "UUID Based" },
        { key: "hash", name: "Hash Based" },
        { key: "timestamp", name: "Timestamp" },
        { key: "custom", name: "Custom Pattern" },
      ];

      return strategies.map((strategy) => {
        const permalink = generatePermalink(text, strategy.key, currentOptions);
        return {
          original: text,
          permalink,
          strategy: strategy.name,
          length: permalink.length,
          seoScore: calculateSEOScore(permalink),
          uniqueness: calculateUniqueness(permalink),
          readability: calculateReadability(permalink),
          timestamp: Date.now(),
        };
      });
    },
    [
      generatePermalink,
      calculateSEOScore,
      calculateUniqueness,
      calculateReadability,
    ]
  );

  // Update permalinks when input or options change
  useEffect(() => {
    if (input.trim()) {
      const variations = generateVariations(input, options);
      setGeneratedPermalinks(variations);
      if (variations.length > 0) {
        setSelectedPermalink(variations[0].permalink);
      }
    } else {
      setGeneratedPermalinks([]);
      setSelectedPermalink("");
    }
  }, [
    input,
    options.strategy,
    options.separator,
    options.maxLength,
    options.preserveCase,
    options.removeStopWords,
    options.addPrefix,
    options.addSuffix,
    options.includeDate,
    options.dateFormat,
    options.customPattern,
    options.hashLength,
    options.includeRandom,
    options.randomLength,
    generateVariations,
    options,
  ]);

  // Validate selected permalink
  useEffect(() => {
    if (selectedPermalink) {
      const validation = validatePermalink(selectedPermalink);
      setValidationResult(validation);
    } else {
      setValidationResult(null);
    }
  }, [selectedPermalink, validatePermalink]);

  // Update output with selected permalink
  useEffect(() => {
    setOutput(selectedPermalink);
  }, [selectedPermalink, setOutput]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const regeneratePermalink = () => {
    if (input.trim()) {
      const variations = generateVariations(input, options);
      setGeneratedPermalinks(variations);
      if (variations.length > 0) {
        setSelectedPermalink(variations[0].permalink);
      }
    }
  };

  const exportPermalinks = () => {
    const data = {
      original: input,
      generated: new Date().toISOString(),
      permalinks: generatedPermalinks,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `permalinks-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Permalinks exported!");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Check className="w-4 h-4" />;
    if (score >= 60) return <Target className="w-4 h-4" />;
    return <X className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Enter your title or text to generate permalinks and URL slugs:
        </label>
        <TextArea
          value={input}
          onChange={setInput}
          placeholder="Enter your article title, blog post name, or any text to generate SEO-friendly permalinks, URL slugs, and text-to-slug conversions..."
          className="min-h-[120px]"
        />
      </div>

      {/* Options Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Generation Options
          </h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            {showAdvanced ? "Hide" : "Show"} Advanced
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Strategy Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Strategy</label>
            <select
              value={options.strategy}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  strategy: e.target.value as PermalinkOptions["strategy"],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="smart">Smart SEO</option>
              <option value="seo">SEO Optimized</option>
              <option value="uuid">UUID Based</option>
              <option value="hash">Hash Based</option>
              <option value="timestamp">Timestamp</option>
              <option value="custom">Custom Pattern</option>
            </select>
          </div>

          {/* Separator */}
          <div>
            <label className="block text-sm font-medium mb-2">Separator</label>
            <select
              value={options.separator}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  separator: e.target.value as PermalinkOptions["separator"],
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
              <option value=".">Dot (.)</option>
              <option value="">No Separator</option>
            </select>
          </div>

          {/* Max Length */}
          <div>
            <label className="block text-sm font-medium mb-2">Max Length</label>
            <input
              type="number"
              value={options.maxLength}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  maxLength: parseInt(e.target.value) || 60,
                }))
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="10"
              max="200"
            />
          </div>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="preserveCase"
                  checked={options.preserveCase}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      preserveCase: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="preserveCase" className="text-sm">
                  Preserve Case
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="removeStopWords"
                  checked={options.removeStopWords}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      removeStopWords: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="removeStopWords" className="text-sm">
                  Remove Stop Words
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeDate"
                  checked={options.includeDate}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeDate: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="includeDate" className="text-sm">
                  Include Date
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeRandom"
                  checked={options.includeRandom}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeRandom: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="includeRandom" className="text-sm">
                  Include Random
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prefix</label>
                <input
                  type="text"
                  value={options.addPrefix}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      addPrefix: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., blog"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Suffix</label>
                <input
                  type="text"
                  value={options.addSuffix}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      addSuffix: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date Format
                </label>
                <select
                  value={options.dateFormat}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      dateFormat: e.target
                        .value as PermalinkOptions["dateFormat"],
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="YYYY-MM-DD">2024-01-15</option>
                  <option value="YYYY/MM/DD">2024/01/15</option>
                  <option value="MM-DD-YYYY">01-15-2024</option>
                  <option value="DD-MM-YYYY">15-01-2024</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Random Length
                </label>
                <input
                  type="number"
                  value={options.randomLength}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      randomLength: parseInt(e.target.value) || 4,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="2"
                  max="10"
                />
              </div>
            </div>

            {options.strategy === "custom" && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Custom Pattern
                </label>
                <input
                  type="text"
                  value={options.customPattern}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      customPattern: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="{title}-{date}-{random}"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available variables: {"{title}"}, {"{date}"}, {"{random}"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Generated Permalinks */}
      {generatedPermalinks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Generated Permalinks & URL Slugs
            </h3>
            <div className="flex gap-2">
              <button
                onClick={regeneratePermalink}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
              <button
                onClick={exportPermalinks}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {generatedPermalinks.map((result, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedPermalink === result.permalink
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPermalink(result.permalink)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        {result.strategy}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({result.length} chars)
                      </span>
                    </div>
                    <div className="font-mono text-sm bg-white p-2 rounded border">
                      {result.permalink}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(result.permalink);
                    }}
                    className="ml-4 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Scores */}
                <div className="flex gap-4 mt-3">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${getScoreColor(
                      result.seoScore
                    )}`}
                  >
                    {getScoreIcon(result.seoScore)}
                    SEO: {result.seoScore}
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${getScoreColor(
                      result.uniqueness
                    )}`}
                  >
                    <Hash className="w-3 h-3" />
                    Unique: {result.uniqueness}
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${getScoreColor(
                      result.readability
                    )}`}
                  >
                    <Eye className="w-3 h-3" />
                    Readable: {result.readability}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation Results */}
      {validationResult && (
        <div className="bg-white border rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            {validationResult.isValid ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <X className="w-5 h-5 text-red-600" />
            )}
            Validation Results
          </h4>

          {validationResult.issues.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-red-600 mb-2">
                Issues Found:
              </h5>
              <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                {validationResult.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          {validationResult.suggestions.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-blue-600 mb-2">
                Suggestions:
              </h5>
              <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                {validationResult.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {validationResult.isValid && (
            <div className="text-green-600 text-sm">
              <Check className="w-4 h-4 inline mr-1" />
              This permalink is valid and follows best practices!
            </div>
          )}
        </div>
      )}

      {/* Output Section */}
      {selectedPermalink && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Selected Permalink/URL Slug:
            </label>
            <button
              onClick={() => copyToClipboard(selectedPermalink)}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <TextArea
            value={selectedPermalink}
            onChange={() => {}}
            readonly
            className="font-mono text-sm"
          />
        </div>
      )}

      {/* Quick Actions */}
      {input.trim() && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-3 text-blue-900">
            Quick Actions - Generate Slugs & Permalinks
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() =>
                setOptions((prev) => ({ ...prev, strategy: "smart" }))
              }
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              <Zap className="w-4 h-4" />
              Smart SEO
            </button>
            <button
              onClick={() =>
                setOptions((prev) => ({ ...prev, strategy: "seo" }))
              }
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              <Target className="w-4 h-4" />
              SEO Optimized
            </button>
            <button
              onClick={() =>
                setOptions((prev) => ({ ...prev, strategy: "uuid" }))
              }
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              <Shield className="w-4 h-4" />
              UUID Based
            </button>
            <button
              onClick={() =>
                setOptions((prev) => ({ ...prev, strategy: "hash" }))
              }
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              <Hash className="w-4 h-4" />
              Hash Based
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
