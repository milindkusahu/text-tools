import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientWordCounter from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Word Counter - Count Words, Characters & Sentences",
  description:
    "Free online word counter tool. Count words, characters, sentences, and paragraphs in your text.",
  path: "/word-counter",
  keywords: [
    "word counter",
    "character counter",
    "sentence counter",
    "paragraph counter",
    "text statistics",
    "word count tool",
    "text analysis",
  ],
});

export default function WordCounterPage() {
  return <ClientWordCounter />;
}
