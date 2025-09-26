import { useState, useEffect, useCallback, useMemo } from "react";
import { ToolProps } from "@/lib/types";
import {
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Download,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
  requireAllTypes: boolean;
  customChars: string;
  useCustomChars: boolean;
}

interface SecurityAnalysis {
  strength: "Very Weak" | "Weak" | "Fair" | "Good" | "Strong" | "Very Strong";
  score: number;
  entropy: number;
  timeToCrack: string;
  issues: string[];
  suggestions: string[];
}

interface PasswordHistoryItem {
  password: string;
  timestamp: number;
  analysis: SecurityAnalysis;
}

export default function PasswordGenerator({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistoryItem[]>(
    []
  );
  const [securityAnalysis, setSecurityAnalysis] =
    useState<SecurityAnalysis | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: true,
    excludeAmbiguous: true,
    requireAllTypes: true,
    customChars: "",
    useCustomChars: false,
  });

  // Character sets as constants
  const CHARACTER_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    similar: "il1Lo0O",
    ambiguous: "{}[]()/\\'\"`~,;.<>",
  };

  // Memoized character set calculation
  const charset = useMemo(() => {
    if (options.useCustomChars && options.customChars) {
      return options.customChars;
    }

    let chars = "";
    if (options.includeUppercase) chars += CHARACTER_SETS.uppercase;
    if (options.includeLowercase) chars += CHARACTER_SETS.lowercase;
    if (options.includeNumbers) chars += CHARACTER_SETS.numbers;
    if (options.includeSymbols) chars += CHARACTER_SETS.symbols;

    if (options.excludeSimilar) {
      chars = chars
        .split("")
        .filter((char) => !CHARACTER_SETS.similar.includes(char))
        .join("");
    }

    if (options.excludeAmbiguous) {
      chars = chars
        .split("")
        .filter((char) => !CHARACTER_SETS.ambiguous.includes(char))
        .join("");
    }

    return chars;
  }, [options]);

  // Enhanced password analysis with better entropy calculation
  const analyzePassword = useCallback((pwd: string) => {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 0;

    // Length analysis with better scoring
    if (pwd.length < 8) {
      issues.push("Password is too short (less than 8 characters)");
      suggestions.push("Use at least 12 characters for better security");
      score += Math.max(0, pwd.length * 2);
    } else if (pwd.length >= 16) {
      score += 30;
    } else if (pwd.length >= 12) {
      score += 20;
    } else {
      score += 10;
    }

    // Character variety analysis with accurate charset sizes
    let charsetSize = 0;
    let varietyScore = 0;

    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower) {
      charsetSize += 26;
      varietyScore += 5;
    }
    if (hasUpper) {
      charsetSize += 26;
      varietyScore += 5;
    }
    if (hasNumber) {
      charsetSize += 10;
      varietyScore += 5;
    }
    if (hasSymbol) {
      charsetSize += 32;
      varietyScore += 10;
    }

    score += varietyScore;

    // Enhanced entropy calculation
    const actualEntropy = pwd.length * Math.log2(charsetSize);
    score += Math.min(25, Math.floor(actualEntropy / 4));

    // Pattern analysis with more comprehensive checks
    if (/(.)\1{2,}/.test(pwd)) {
      issues.push("Contains repeated characters");
      suggestions.push("Avoid repeating the same character multiple times");
      score -= 10;
    }

    if (/123|abc|qwe|asd|zxc|987|cba|poi|lkj/i.test(pwd)) {
      issues.push("Contains common sequences");
      suggestions.push("Avoid common keyboard patterns and sequences");
      score -= 15;
    }

    // Enhanced common patterns check
    const commonPatterns = [
      /password/i,
      /admin/i,
      /user/i,
      /login/i,
      /welcome/i,
      /123456/,
      /qwerty/i,
      /abc123/i,
      /password123/i,
      /\d{4,}/, // Long number sequences
    ];

    if (commonPatterns.some((pattern) => pattern.test(pwd))) {
      issues.push("Contains common words or patterns");
      suggestions.push("Avoid dictionary words and predictable patterns");
      score -= 20;
    }

    // Bonus for good practices
    if (pwd.length >= 16 && hasLower && hasUpper && hasNumber && hasSymbol) {
      score += 10;
    }

    // Normalize score
    score = Math.max(0, Math.min(100, score));

    // Strength calculation with refined thresholds
    let strength: SecurityAnalysis["strength"];
    if (score < 25) strength = "Very Weak";
    else if (score < 45) strength = "Weak";
    else if (score < 60) strength = "Fair";
    else if (score < 75) strength = "Good";
    else if (score < 90) strength = "Strong";
    else strength = "Very Strong";

    // More accurate time to crack estimation
    const combinations = Math.pow(charsetSize, pwd.length);
    const attemptsPerSecond = 1e9; // 1 billion attempts per second (modern GPU)
    const secondsToCrack = combinations / (2 * attemptsPerSecond);

    let timeToCrack: string;
    if (secondsToCrack < 1) timeToCrack = "Instantly";
    else if (secondsToCrack < 60) timeToCrack = "Less than a minute";
    else if (secondsToCrack < 3600)
      timeToCrack = `${Math.floor(secondsToCrack / 60)} minutes`;
    else if (secondsToCrack < 86400)
      timeToCrack = `${Math.floor(secondsToCrack / 3600)} hours`;
    else if (secondsToCrack < 31536000)
      timeToCrack = `${Math.floor(secondsToCrack / 86400)} days`;
    else if (secondsToCrack < 31536000000)
      timeToCrack = `${Math.floor(secondsToCrack / 31536000)} years`;
    else if (secondsToCrack < 31536000000000)
      timeToCrack = `${Math.floor(secondsToCrack / 31536000000)} billion years`;
    else timeToCrack = "Universe lifetime+";

    return {
      strength,
      score,
      entropy: Math.round(actualEntropy * 10) / 10, // Round to 1 decimal
      timeToCrack,
      issues,
      suggestions,
    };
  }, []);

  // Enhanced password generation with better randomness
  const generatePassword = useCallback(async () => {
    if (charset.length === 0) {
      toast.error(
        "No character set available. Please enable at least one character type."
      );
      return;
    }

    setIsGenerating(true);

    try {
      // Generate password with cryptographically secure randomness
      let newPassword = "";
      const array = new Uint8Array(options.length);

      // Use crypto.getRandomValues for better randomness
      crypto.getRandomValues(array);

      for (let i = 0; i < options.length; i++) {
        newPassword += charset[array[i] % charset.length];
      }

      // Enhanced character type enforcement
      if (options.requireAllTypes && !options.useCustomChars) {
        const requiredSets = [];
        if (options.includeUppercase)
          requiredSets.push(CHARACTER_SETS.uppercase);
        if (options.includeLowercase)
          requiredSets.push(CHARACTER_SETS.lowercase);
        if (options.includeNumbers) requiredSets.push(CHARACTER_SETS.numbers);
        if (options.includeSymbols) requiredSets.push(CHARACTER_SETS.symbols);

        // Check and ensure all required types are present
        for (const charSet of requiredSets) {
          if (!newPassword.split("").some((char) => charSet.includes(char))) {
            // Replace a random character with one from the missing set
            const randomArray = new Uint8Array(2);
            crypto.getRandomValues(randomArray);

            const randomIndex = randomArray[0] % newPassword.length;
            const randomChar = charSet[randomArray[1] % charSet.length];

            newPassword =
              newPassword.substring(0, randomIndex) +
              randomChar +
              newPassword.substring(randomIndex + 1);
          }
        }
      }

      const analysis = analyzePassword(newPassword);

      setPassword(newPassword);
      setOutput(newPassword);
      setSecurityAnalysis(analysis);

      // Add to enhanced history with timestamp and analysis
      setPasswordHistory((prev) => [
        { password: newPassword, timestamp: Date.now(), analysis },
        ...prev.slice(0, 9),
      ]);
    } catch (error) {
      toast.error("Failed to generate password");
    } finally {
      setIsGenerating(false);
    }
  }, [charset, options, analyzePassword, setOutput]);

  // Bulk password generation
  const generateBulkPasswords = useCallback(
    async (count: number = 10) => {
      const passwords: string[] = [];

      for (let i = 0; i < count; i++) {
        if (charset.length === 0) continue;

        let newPassword = "";
        const array = new Uint8Array(options.length);
        crypto.getRandomValues(array);

        for (let j = 0; j < options.length; j++) {
          newPassword += charset[array[j] % charset.length];
        }

        passwords.push(newPassword);
      }

      const text = passwords.join("\n");
      try {
        await navigator.clipboard.writeText(text);
        toast.success(`${count} passwords generated and copied to clipboard!`);
      } catch {
        // Fallback - create download
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "passwords.txt";
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`${count} passwords generated and downloaded!`);
      }
    },
    [charset, options]
  );

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Password copied to clipboard!");
    } catch {
      toast.error("Failed to copy password");
    }
  };

  const updateOption = useCallback((key: keyof PasswordOptions, value: any) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearHistory = useCallback(() => {
    setPasswordHistory([]);
    toast.success("Password history cleared");
  }, []);

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Very Weak":
        return "text-red-600 bg-red-50 border-red-200";
      case "Weak":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "Fair":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Strong":
        return "text-green-600 bg-green-50 border-green-200";
      case "Very Strong":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStrengthIcon = (strength: string) => {
    switch (strength) {
      case "Very Weak":
      case "Weak":
        return <AlertTriangle className="w-4 h-4" />;
      case "Fair":
        return <Clock className="w-4 h-4" />;
      case "Good":
      case "Strong":
      case "Very Strong":
        return <Shield className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="space-y-6">
      {/* Generated Password Display */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Generated Password</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => copyToClipboard(password)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={!password}
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={generatePassword}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              disabled={isGenerating}
            >
              <RefreshCw
                className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`}
              />
              Generate
            </button>
            <button
              onClick={() => generateBulkPasswords(10)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              title="Generate 10 passwords"
            >
              <Download className="w-4 h-4" />
              Bulk
            </button>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4 font-mono text-lg break-all select-all">
          {showPassword ? password : "•".repeat(password.length)}
        </div>

        {/* Security Analysis */}
        {securityAnalysis && (
          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              {getStrengthIcon(securityAnalysis.strength)}
              <span className="font-semibold">Security Analysis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div
                className={`p-3 rounded-lg border ${getStrengthColor(
                  securityAnalysis.strength
                )}`}
              >
                <div className="text-sm font-medium">Strength</div>
                <div className="text-lg font-bold">
                  {securityAnalysis.strength}
                </div>
                <div className="text-xs">
                  Score: {securityAnalysis.score}/100
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm font-medium text-gray-600">Entropy</div>
                <div className="text-lg font-bold text-gray-900">
                  {securityAnalysis.entropy} bits
                </div>
                <div className="text-xs text-gray-500">Randomness measure</div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm font-medium text-gray-600">
                  Time to Crack
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {securityAnalysis.timeToCrack}
                </div>
                <div className="text-xs text-gray-500">At 1B attempts/sec</div>
              </div>
            </div>

            {securityAnalysis.issues.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium text-red-600 mb-2">
                  Issues Found:
                </h4>
                <ul className="text-sm text-red-600 space-y-1">
                  {securityAnalysis.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {securityAnalysis.suggestions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-blue-600 mb-2">
                  Suggestions:
                </h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  {securityAnalysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Password Options */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Password Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Length */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Length: {options.length} characters
            </label>
            <input
              type="range"
              min="4"
              max="128"
              value={options.length}
              onChange={(e) => updateOption("length", parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>128</span>
            </div>
          </div>

          {/* Character Types */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">Character Types</label>

            {[
              {
                key: "includeUppercase",
                label: "Uppercase (A-Z)",
                chars: CHARACTER_SETS.uppercase,
              },
              {
                key: "includeLowercase",
                label: "Lowercase (a-z)",
                chars: CHARACTER_SETS.lowercase,
              },
              {
                key: "includeNumbers",
                label: "Numbers (0-9)",
                chars: CHARACTER_SETS.numbers,
              },
              {
                key: "includeSymbols",
                label: "Symbols (!@#$%^&*)",
                chars: CHARACTER_SETS.symbols,
              },
            ].map(({ key, label, chars }) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options[key as keyof PasswordOptions] as boolean}
                  onChange={(e) =>
                    updateOption(key as keyof PasswordOptions, e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{label}</span>
                <span className="text-xs text-gray-400">
                  ({chars.length} chars)
                </span>
              </label>
            ))}
          </div>

          {/* Advanced Options */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Advanced Options
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.excludeSimilar}
                onChange={(e) =>
                  updateOption("excludeSimilar", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm">
                Exclude similar characters (il1Lo0O)
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.excludeAmbiguous}
                onChange={(e) =>
                  updateOption("excludeAmbiguous", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm">
                Exclude ambiguous characters ({"{}[]()/\\'\"~,;.<>"})
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.requireAllTypes}
                onChange={(e) =>
                  updateOption("requireAllTypes", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm">
                Require all selected character types
              </span>
            </label>
          </div>

          {/* Custom Characters */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Custom Character Set
            </label>

            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={options.useCustomChars}
                onChange={(e) =>
                  updateOption("useCustomChars", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm">Use custom characters only</span>
            </label>

            <input
              type="text"
              value={options.customChars}
              onChange={(e) => updateOption("customChars", e.target.value)}
              placeholder="Enter custom characters..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!options.useCustomChars}
            />
            <p className="text-xs text-gray-500 mt-1">
              {options.customChars.length} characters available
              {charset.length > 0 &&
                ` • Final charset: ${charset.length} characters`}
            </p>
          </div>
        </div>
      </div>

      {/* Password History */}
      {passwordHistory.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Passwords</h3>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear History
            </button>
          </div>
          <div className="space-y-2">
            {passwordHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm break-all">
                    {showPassword
                      ? item.password
                      : "•".repeat(item.password.length)}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                    <span
                      className={`px-2 py-1 rounded ${getStrengthColor(
                        item.analysis.strength
                      )}`}
                    >
                      {item.analysis.strength}
                    </span>
                    <span>{item.analysis.entropy} bits</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(item.password)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ml-3"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
