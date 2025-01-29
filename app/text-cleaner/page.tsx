import type { Metadata } from "next";
import ClientTextCleaner from "./client";

export const metadata: Metadata = {
  title: "Text Cleaner - Clean and Format Text Online",
  description:
    "Remove extra spaces, lines, and unwanted characters from your text. Clean and format text for better readability.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/text-cleaner",
  },
};

export default function TextCleanerPage() {
  return <ClientTextCleaner />;
}
