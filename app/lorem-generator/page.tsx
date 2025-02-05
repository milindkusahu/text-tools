import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientLoremGenerator from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Lorem Ipsum Generator - Generate Placeholder Text",
  description:
    "Generate customizable Lorem Ipsum placeholder text for your designs and content. Choose paragraphs, sentences, or words with HTML support.",
  path: "/lorem-generator",
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text",
    "text generator",
    "sample text",
    "design placeholder",
    "html placeholder",
  ],
});

export default function LoremGeneratorPage() {
  return <ClientLoremGenerator />;
}
