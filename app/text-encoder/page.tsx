import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientTextEncoder from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Text Encoder/Decoder - Base64, URL, HTML Encoding",
  description:
    "Free online text encoder and decoder. Convert text using Base64, URL encoding, and HTML entities. Perfect for developers and content creators.",
  path: "/text-encoder",
  keywords: [
    "text encoder",
    "text decoder",
    "base64 encoder",
    "base64 decoder",
    "url encoding",
    "url decoding",
    "html entities",
    "text encoding",
    "text decoding",
    "base64 converter",
    "url encoder",
    "html encoder",
  ],
});

export default function TextEncoderPage() {
  return <ClientTextEncoder />;
}
