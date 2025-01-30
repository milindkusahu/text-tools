import type { Metadata } from "next";
import ClientLoremGenerator from "./client";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Generate Placeholder Text",
  description:
    "Generate customizable Lorem Ipsum placeholder text for your designs and content. Choose paragraphs, sentences, or words with HTML support.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/lorem-generator",
  },
};

export default function LoremGeneratorPage() {
  return <ClientLoremGenerator />;
}
