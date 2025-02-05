import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientTextCleaner from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Text Cleaner - Clean and Format Text Online",
  description:
    "Remove extra spaces, lines, and unwanted characters from your text. Clean and format text for better readability.",
  path: "/text-cleaner",
  keywords: [
    "text cleaner",
    "text formatter",
    "remove extra spaces",
    "clean text",
    "format text",
    "text cleanup",
    "whitespace remover",
  ],
});

export default function TextCleanerPage() {
  return <ClientTextCleaner />;
}
