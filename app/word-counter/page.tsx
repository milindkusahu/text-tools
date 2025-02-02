import type { Metadata } from "next";
import ClientWordCounter from "./client";

export const metadata: Metadata = {
  title: "Word Counter - Count Words, Characters & Sentences",
  description:
    "Free online word counter tool. Count words, characters, sentences, and paragraphs in your text.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/word-counter",
  },
};

export default function WordCounterPage() {
  return <ClientWordCounter />;
}
