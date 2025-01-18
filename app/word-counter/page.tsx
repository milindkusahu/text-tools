import type { Metadata } from "next";
import ClientWordCounter from "./client";

export const metadata: Metadata = {
  title: "Word Counter - Count Words, Characters & Sentences",
  description:
    "Free online word counter tool. Count words, characters, sentences, and paragraphs in your text.",
  alternates: {
    canonical: "http://localhost:3000/word-counter",
  },
};

export default function WordCounterPage() {
  return <ClientWordCounter />;
}
