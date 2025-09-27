import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientTextToSpeech from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Text to Speech - Convert Text to Audio with Multiple Voices",
  description:
    "Free online text to speech converter. Convert any text to speech with multiple voices, languages, and customizable settings. Perfect for accessibility and content creation.",
  path: "/text-to-speech",
  keywords: [
    "text to speech",
    "tts",
    "speech synthesis",
    "voice generator",
    "text to audio",
    "speech converter",
    "voice synthesis",
    "accessibility",
    "screen reader",
    "audio generator",
    "voice settings",
    "speech rate",
    "voice pitch",
  ],
});

export default function TextToSpeechPage() {
  return <ClientTextToSpeech />;
}
