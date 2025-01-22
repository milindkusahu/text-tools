import { Tool } from "./types";

export const tools: Tool[] = [
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, and sentences in your text",
    path: "/word-counter",
    icon: "Calculator",
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between different cases",
    path: "/case-converter",
    icon: "Type",
  },
  {
    id: "text-difference",
    name: "Text Difference",
    description: "Compare two texts and find the differences",
    path: "/text-difference",
    icon: "GitCompare",
  },
  {
    id: "markdown-editor",
    name: "Markdown Editor",
    description: "Write and preview Markdown in real-time",
    path: "/markdown-editor",
    icon: "FileEdit",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    path: "/json-formatter",
    icon: "Braces",
  },
  {
    id: "text-cleaner",
    name: "Text Cleaner",
    description: "Remove extra spaces, lines, and formatting",
    path: "/text-cleaner",
    icon: "Sparkles",
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for designs",
    path: "/lorem-generator",
    icon: "Type",
  },
  {
    id: "slug-generator",
    name: "URL Slug Generator",
    description: "Convert text to URL-friendly slugs",
    path: "/slug-generator",
    icon: "Link",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}
