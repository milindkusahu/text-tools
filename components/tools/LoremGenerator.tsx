import { useState, useEffect, useCallback } from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface LoremGeneratorProps {
  output: string;
  setOutput: (value: string) => void;
}

type LoremType = "paragraphs" | "sentences" | "words";

interface GeneratorOptions {
  type: LoremType;
  count: number;
  startWithLorem: boolean;
  includeHTML: boolean;
}

const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "dolore",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

export default function LoremGenerator({
  output,
  setOutput,
}: LoremGeneratorProps) {
  const [options, setOptions] = useState<GeneratorOptions>({
    type: "paragraphs",
    count: 3,
    startWithLorem: true,
    includeHTML: false,
  });

  const generateWord = useCallback(() => {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }, []);

  const generateSentence = useCallback(() => {
    const wordCount = Math.floor(Math.random() * 10) + 8; // 8-18 words per sentence
    const sentence = Array(wordCount)
      .fill("")
      .map(() => generateWord())
      .join(" ");
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  }, [generateWord]);

  const generateParagraph = useCallback(() => {
    const sentenceCount = Math.floor(Math.random() * 3) + 3; // 3-6 sentences per paragraph
    return Array(sentenceCount)
      .fill("")
      .map(() => generateSentence())
      .join(" ");
  }, [generateSentence]);

  const generateText = useCallback(
    (options: GeneratorOptions) => {
      let text = "";

      switch (options.type) {
        case "words":
          text = Array(options.count)
            .fill("")
            .map(() => generateWord())
            .join(" ");
          if (options.startWithLorem && options.count >= 2) {
            text =
              "lorem ipsum" +
              text.slice(text.indexOf(" ", text.indexOf(" ") + 1));
          }
          break;

        case "sentences":
          text = Array(options.count)
            .fill("")
            .map(() => generateSentence())
            .join(" ");
          if (options.startWithLorem) {
            text =
              "Lorem ipsum dolor sit amet." + text.slice(text.indexOf(".") + 1);
          }
          break;

        case "paragraphs":
          text = Array(options.count)
            .fill("")
            .map(() => generateParagraph())
            .join("\n\n");
          if (options.startWithLorem) {
            text =
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
              text.slice(text.indexOf(".") + 1);
          }
          break;
      }

      if (options.includeHTML && options.type === "paragraphs") {
        text = text
          .split("\n\n")
          .map((p) => `<p>${p}</p>`)
          .join("\n");
      }

      return text;
    },
    [generateWord, generateSentence, generateParagraph]
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  useEffect(() => {
    const text = generateText(options);
    setOutput(text);
  }, [options, generateText, setOutput]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Generate:</label>
            <select
              value={options.type}
              onChange={(e) =>
                setOptions({ ...options, type: e.target.value as LoremType })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Count:</label>
            <input
              type="number"
              value={options.count}
              onChange={(e) =>
                setOptions({
                  ...options,
                  count: Math.max(1, parseInt(e.target.value) || 1),
                })
              }
              min="1"
              max="100"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.startWithLorem}
              onChange={(e) =>
                setOptions({ ...options, startWithLorem: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Start with &ldquo;Lorem ipsum&rdquo;</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeHTML}
              onChange={(e) =>
                setOptions({ ...options, includeHTML: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Include HTML tags</span>
          </label>
        </div>
      </div>

      {/* Output */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Generated Text:</label>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
        <div className="min-h-[200px] p-4 border rounded-lg whitespace-pre-wrap font-serif">
          {output}
        </div>
      </div>
    </div>
  );
}
