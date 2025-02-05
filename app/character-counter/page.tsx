import type { Metadata } from "next";
import ClientCharacterCounter from "./client";

export const metadata: Metadata = {
  title: "Character Counter Pro - Advanced Text Analysis",
  description:
    "Professional character counter with social media limits, word statistics, and advanced text analysis tools.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/character-counter",
  },
};

export default function CharacterCounterPage() {
  return <ClientCharacterCounter />;
}
