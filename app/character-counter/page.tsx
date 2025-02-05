import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientCharacterCounter from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Character Counter Pro - Advanced Text Analysis",
  description:
    "Professional character counter with social media limits, word statistics, and advanced text analysis tools.",
  path: "/character-counter",
  keywords: [
    "character counter",
    "word statistics",
    "social media counter",
    "text analysis",
  ],
});

export default function CharacterCounterPage() {
  return <ClientCharacterCounter />;
}
