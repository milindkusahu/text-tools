import { useEffect, useState, useMemo, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import {
  BarChart3,
  Clock,
  Hash,
  Type,
  FileText,
  TrendingUp,
  Copy,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

interface TextStats {
  // Basic counts
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;

  // Advanced metrics
  readingTime: number;
  speakingTime: number;
  averageWordsPerSentence: number;
  averageCharactersPerWord: number;
  averageSentencesPerParagraph: number;

  // Text analysis
  uniqueWords: number;
  mostCommonWords: Array<{ word: string; count: number; percentage: number }>;
  longestWords: string[];
  shortestWords: string[];

  // Readability scores
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  gunningFog: number;

  // Language detection
  language: string;
  isEnglish: boolean;

  // Text quality
  repetitionRate: number;
  vocabularyRichness: number;
}

export default function WordCounter({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Debounced analysis function for performance
  const analyzeText = useCallback((text: string): TextStats => {
    if (!text.trim()) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: 0,
        speakingTime: 0,
        averageWordsPerSentence: 0,
        averageCharactersPerWord: 0,
        averageSentencesPerParagraph: 0,
        uniqueWords: 0,
        mostCommonWords: [],
        longestWords: [],
        shortestWords: [],
        fleschReadingEase: 0,
        fleschKincaidGrade: 0,
        gunningFog: 0,
        language: "Unknown",
        isEnglish: false,
        repetitionRate: 0,
        vocabularyRichness: 0,
      };
    }

    // Basic text processing
    const cleanText = text.trim();
    const words = cleanText.split(/\s+/).filter((word) => word.length > 0);
    const characters = cleanText.length;
    const charactersNoSpaces = cleanText.replace(/\s/g, "").length;
    const sentences = cleanText
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;
    const paragraphs = cleanText
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length;
    const lines = cleanText.split("\n").length;

    // Advanced word analysis
    const wordCounts = new Map<string, number>();
    const wordLengths: number[] = [];
    let totalSyllables = 0;

    words.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, "");
      if (cleanWord) {
        wordCounts.set(cleanWord, (wordCounts.get(cleanWord) || 0) + 1);
        wordLengths.push(cleanWord.length);

        // Simple syllable counting for readability
        const syllables = Math.max(
          1,
          cleanWord.match(/[aeiouy]+/gi)?.length || 1
        );
        totalSyllables += syllables;
      }
    });

    const uniqueWords = wordCounts.size;
    const totalWords = words.length;

    // Most common words (top 10)
    const mostCommonWords = Array.from(wordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        percentage: (count / totalWords) * 100,
      }));

    // Longest and shortest words
    const sortedWords = Array.from(wordCounts.keys()).sort(
      (a, b) => b.length - a.length
    );
    const longestWords = sortedWords.slice(0, 5);
    const shortestWords = sortedWords.slice(-5).reverse();

    // Time calculations
    const readingTime = Math.ceil(totalWords / 250); // 250 WPM average
    const speakingTime = Math.ceil(totalWords / 150); // 150 WPM speaking

    // Averages
    const averageWordsPerSentence = sentences > 0 ? totalWords / sentences : 0;
    const averageCharactersPerWord =
      totalWords > 0 ? charactersNoSpaces / totalWords : 0;
    const averageSentencesPerParagraph =
      paragraphs > 0 ? sentences / paragraphs : 0;

    // Readability scores
    const averageSyllablesPerWord =
      totalWords > 0 ? totalSyllables / totalWords : 0;
    const averageWordsPerSentenceForReadability =
      sentences > 0 ? totalWords / sentences : 0;

    // Flesch Reading Ease
    const fleschReadingEase =
      206.835 -
      1.015 * averageWordsPerSentenceForReadability -
      84.6 * averageSyllablesPerWord;

    // Flesch-Kincaid Grade Level
    const fleschKincaidGrade =
      0.39 * averageWordsPerSentenceForReadability +
      11.8 * averageSyllablesPerWord -
      15.59;

    // Gunning Fog Index
    const complexWords = words.filter((word) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, "");
      const syllables = Math.max(
        1,
        cleanWord.match(/[aeiouy]+/gi)?.length || 1
      );
      return syllables >= 3;
    }).length;
    const gunningFog =
      0.4 *
      (averageWordsPerSentenceForReadability +
        (100 * complexWords) / totalWords);

    // Language detection (simple heuristic)
    const englishWords = [
      "the",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "can",
      "this",
      "that",
      "these",
      "those",
      "a",
      "an",
    ];
    const commonWords = Array.from(wordCounts.keys()).filter((word) =>
      englishWords.includes(word)
    );
    const isEnglish =
      commonWords.length > 0 &&
      commonWords.length / Math.min(uniqueWords, 50) > 0.1;
    const language = isEnglish ? "English" : "Unknown";

    // Text quality metrics
    const repetitionRate =
      uniqueWords > 0 ? ((totalWords - uniqueWords) / totalWords) * 100 : 0;
    const vocabularyRichness =
      totalWords > 0 ? (uniqueWords / totalWords) * 100 : 0;

    return {
      words: totalWords,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
      averageWordsPerSentence,
      averageCharactersPerWord,
      averageSentencesPerParagraph,
      uniqueWords,
      mostCommonWords,
      longestWords,
      shortestWords,
      fleschReadingEase: Math.max(0, Math.min(100, fleschReadingEase)),
      fleschKincaidGrade: Math.max(0, fleschKincaidGrade),
      gunningFog: Math.max(0, gunningFog),
      language,
      isEnglish,
      repetitionRate,
      vocabularyRichness,
    };
  }, []);

  // Memoized text analysis for performance
  const textStats = useMemo(() => analyzeText(input), [input, analyzeText]);

  // Update output with formatted results
  useEffect(() => {
    const formatOutput = () => {
      const stats = textStats;

      let result = `📊 TEXT ANALYSIS REPORT\n`;
      result += `═══════════════════════════════════════\n\n`;

      result += `📈 BASIC STATISTICS\n`;
      result += `Words: ${stats.words.toLocaleString()}\n`;
      result += `Characters: ${stats.characters.toLocaleString()}\n`;
      result += `Characters (no spaces): ${stats.charactersNoSpaces.toLocaleString()}\n`;
      result += `Sentences: ${stats.sentences.toLocaleString()}\n`;
      result += `Paragraphs: ${stats.paragraphs.toLocaleString()}\n`;
      result += `Lines: ${stats.lines.toLocaleString()}\n\n`;

      result += `⏱️ TIME ESTIMATES\n`;
      result += `Reading time: ${stats.readingTime} minute${
        stats.readingTime !== 1 ? "s" : ""
      }\n`;
      result += `Speaking time: ${stats.speakingTime} minute${
        stats.speakingTime !== 1 ? "s" : ""
      }\n\n`;

      result += `📊 AVERAGES\n`;
      result += `Words per sentence: ${stats.averageWordsPerSentence.toFixed(
        1
      )}\n`;
      result += `Characters per word: ${stats.averageCharactersPerWord.toFixed(
        1
      )}\n`;
      result += `Sentences per paragraph: ${stats.averageSentencesPerParagraph.toFixed(
        1
      )}\n\n`;

      result += `🎯 TEXT QUALITY\n`;
      result += `Unique words: ${stats.uniqueWords.toLocaleString()}\n`;
      result += `Vocabulary richness: ${stats.vocabularyRichness.toFixed(
        1
      )}%\n`;
      result += `Repetition rate: ${stats.repetitionRate.toFixed(1)}%\n`;
      result += `Language: ${stats.language}\n\n`;

      result += `📖 READABILITY SCORES\n`;
      result += `Flesch Reading Ease: ${stats.fleschReadingEase.toFixed(
        1
      )}/100\n`;
      result += `Flesch-Kincaid Grade: ${stats.fleschKincaidGrade.toFixed(
        1
      )}\n`;
      result += `Gunning Fog Index: ${stats.gunningFog.toFixed(1)}\n\n`;

      if (stats.mostCommonWords.length > 0) {
        result += `🔥 TOP WORDS\n`;
        stats.mostCommonWords.forEach((item, index) => {
          result += `${index + 1}. "${item.word}" (${
            item.count
          }x, ${item.percentage.toFixed(1)}%)\n`;
        });
        result += `\n`;
      }

      if (stats.longestWords.length > 0) {
        result += `📏 LONGEST WORDS\n`;
        stats.longestWords.forEach((word, index) => {
          result += `${index + 1}. "${word}" (${word.length} chars)\n`;
        });
      }

      return result;
    };

    setOutput(formatOutput());
  }, [textStats, setOutput]);

  const copyResults = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Analysis results copied to clipboard!");
    } catch {
      toast.error("Failed to copy results");
    }
  };

  const downloadResults = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `text-analysis-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Analysis downloaded!");
  };

  const getReadabilityLevel = (score: number) => {
    if (score >= 90)
      return { level: "Very Easy", color: "text-green-600", bg: "bg-green-50" };
    if (score >= 80)
      return { level: "Easy", color: "text-green-500", bg: "bg-green-50" };
    if (score >= 70)
      return {
        level: "Fairly Easy",
        color: "text-yellow-500",
        bg: "bg-yellow-50",
      };
    if (score >= 60)
      return {
        level: "Standard",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    if (score >= 50)
      return {
        level: "Fairly Difficult",
        color: "text-orange-500",
        bg: "bg-orange-50",
      };
    if (score >= 30)
      return { level: "Difficult", color: "text-red-500", bg: "bg-red-50" };
    return { level: "Very Difficult", color: "text-red-600", bg: "bg-red-50" };
  };

  const readability = getReadabilityLevel(textStats.fleschReadingEase);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Enter your text for analysis:
        </label>
        <TextArea
          value={input}
          onChange={setInput}
          placeholder="Paste or type your text here for comprehensive analysis..."
          className="min-h-[200px]"
        />
      </div>

      {/* Quick Stats Cards */}
      {input.trim() && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Type className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Words</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {textStats.words.toLocaleString()}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Characters
              </span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {textStats.characters.toLocaleString()}
            </div>
            <div className="text-xs text-green-700">
              {textStats.charactersNoSpaces.toLocaleString()} (no spaces)
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">
                Sentences
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {textStats.sentences.toLocaleString()}
            </div>
            <div className="text-xs text-purple-700">
              {textStats.paragraphs.toLocaleString()} paragraphs
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                Reading Time
              </span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {textStats.readingTime}m
            </div>
            <div className="text-xs text-orange-700">
              {textStats.speakingTime}m speaking
            </div>
          </div>
        </div>
      )}

      {/* Advanced Analysis Toggle */}
      {input.trim() && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Advanced Analysis
          </h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {showAdvanced ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showAdvanced ? "Hide" : "Show"} Details
          </button>
        </div>
      )}

      {/* Advanced Analysis Section */}
      {input.trim() && showAdvanced && (
        <div className="space-y-6">
          {/* Readability Scores */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Readability Analysis
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${readability.bg} border`}>
                <div className="text-sm font-medium mb-1">
                  Flesch Reading Ease
                </div>
                <div className={`text-2xl font-bold ${readability.color}`}>
                  {textStats.fleschReadingEase.toFixed(1)}
                </div>
                <div className={`text-sm ${readability.color}`}>
                  {readability.level}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="text-sm font-medium mb-1">Grade Level</div>
                <div className="text-2xl font-bold text-gray-700">
                  {textStats.fleschKincaidGrade.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Flesch-Kincaid</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="text-sm font-medium mb-1">Complexity</div>
                <div className="text-2xl font-bold text-gray-700">
                  {textStats.gunningFog.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Gunning Fog</div>
              </div>
            </div>
          </div>

          {/* Text Quality Metrics */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Text Quality Metrics
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    Vocabulary Richness
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {textStats.vocabularyRichness.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(textStats.vocabularyRichness, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Repetition Rate</span>
                  <span className="text-sm font-bold text-orange-600">
                    {textStats.repetitionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(textStats.repetitionRate, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Unique Words:</span>{" "}
                {textStats.uniqueWords.toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Avg Words/Sentence:</span>{" "}
                {textStats.averageWordsPerSentence.toFixed(1)}
              </div>
              <div>
                <span className="font-medium">Language:</span>{" "}
                {textStats.language}
              </div>
            </div>
          </div>

          {/* Most Common Words */}
          {textStats.mostCommonWords.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Most Common Words</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {textStats.mostCommonWords.slice(0, 10).map((item, index) => (
                  <div
                    key={item.word}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium">
                        &ldquo;{item.word}&rdquo;
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{item.count}x</div>
                      <div className="text-xs text-gray-500">
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Longest Words */}
          {textStats.longestWords.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Longest Words</h4>
              <div className="flex flex-wrap gap-2">
                {textStats.longestWords.map((word) => (
                  <span
                    key={word}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    title={`${word.length} characters`}
                  >
                    {word} ({word.length})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Output Section */}
      {input.trim() && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Complete Analysis Report:
            </label>
            <div className="flex gap-2">
              <button
                onClick={copyResults}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={downloadResults}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <TextArea
            value={output}
            onChange={() => {}}
            readonly
            className="min-h-[300px] font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
