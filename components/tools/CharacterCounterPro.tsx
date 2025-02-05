import { useState, useCallback } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";
import { Copy, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import toast from "react-hot-toast";

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  averageWordLength: number;
  longestWord: string;
}

const SOCIAL_LIMITS = {
  twitter: 280,
  facebook: 63206,
  instagram: 2200,
  linkedin: 3000,
};

export default function CharacterCounterPro({ input, setInput }: ToolProps) {
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    averageWordLength: 0,
    longestWord: "",
  });

  const analyzeText = useCallback((text: string) => {
    // Basic counts
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const sentences = text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length;
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((para) => para.trim().length > 0).length;
    const lines = text.split("\n").length;

    // Advanced stats
    const wordArray = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const averageWordLength =
      words > 0
        ? wordArray.reduce((acc, word) => acc + word.length, 0) / words
        : 0;
    const longestWord = wordArray.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      ""
    );

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      averageWordLength,
      longestWord,
    });
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(input);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const handleTextChange = (newText: string) => {
    setInput(newText);
    analyzeText(newText);
  };

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Input Text:</label>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
        <TextArea
          value={input}
          onChange={handleTextChange}
          placeholder="Type or paste your text here..."
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-500">Characters</div>
          <div className="text-2xl font-semibold">{stats.characters}</div>
          <div className="text-sm text-gray-500">
            (no spaces: {stats.charactersNoSpaces})
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-500">Words</div>
          <div className="text-2xl font-semibold">{stats.words}</div>
          <div className="text-sm text-gray-500">
            (avg length: {stats.averageWordLength.toFixed(1)})
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-500">Sentences</div>
          <div className="text-2xl font-semibold">{stats.sentences}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-sm text-gray-500">Paragraphs</div>
          <div className="text-2xl font-semibold">{stats.paragraphs}</div>
          <div className="text-sm text-gray-500">(lines: {stats.lines})</div>
        </div>
      </div>

      {/* Social Media Limits */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Social Media Limits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm">
            <Twitter className="w-5 h-5 text-blue-400" />
            <div className="flex-grow">
              <div className="text-sm text-gray-500">Twitter</div>
              <div className="flex justify-between items-baseline">
                <span className="text-xl font-semibold">
                  {stats.characters}
                </span>
                <span className="text-sm text-gray-500">
                  / {SOCIAL_LIMITS.twitter}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-400 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (stats.characters / SOCIAL_LIMITS.twitter) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm">
            <Instagram className="w-5 h-5 text-pink-500" />
            <div className="flex-grow">
              <div className="text-sm text-gray-500">Instagram</div>
              <div className="flex justify-between items-baseline">
                <span className="text-xl font-semibold">
                  {stats.characters}
                </span>
                <span className="text-sm text-gray-500">
                  / {SOCIAL_LIMITS.instagram}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-pink-500 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (stats.characters / SOCIAL_LIMITS.instagram) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm">
            <Linkedin className="w-5 h-5 text-blue-600" />
            <div className="flex-grow">
              <div className="text-sm text-gray-500">LinkedIn</div>
              <div className="flex justify-between items-baseline">
                <span className="text-xl font-semibold">
                  {stats.characters}
                </span>
                <span className="text-sm text-gray-500">
                  / {SOCIAL_LIMITS.linkedin}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (stats.characters / SOCIAL_LIMITS.linkedin) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm">
            <Facebook className="w-5 h-5 text-blue-500" />
            <div className="flex-grow">
              <div className="text-sm text-gray-500">Facebook</div>
              <div className="flex justify-between items-baseline">
                <span className="text-xl font-semibold">
                  {stats.characters}
                </span>
                <span className="text-sm text-gray-500">
                  / {SOCIAL_LIMITS.facebook}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (stats.characters / SOCIAL_LIMITS.facebook) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      {stats.longestWord && (
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Additional Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500">Longest word: </span>
              <span className="font-medium">{stats.longestWord}</span>
              <span className="text-gray-500 ml-1">
                ({stats.longestWord.length} characters)
              </span>
            </div>
            <div>
              <span className="text-gray-500">Average word length: </span>
              <span className="font-medium">
                {stats.averageWordLength.toFixed(1)}
              </span>
              <span className="text-gray-500 ml-1">characters</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
