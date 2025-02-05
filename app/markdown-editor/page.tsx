import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientMarkdownEditor from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Markdown Editor - Write and Preview Markdown",
  description:
    "Write, edit, and preview Markdown with a real-time preview. Perfect for writing documentation, README files, and formatted text.",
  path: "/markdown-editor",
  keywords: [
    "markdown editor",
    "markdown preview",
    "markdown writer",
    "documentation editor",
    "readme editor",
    "text formatting",
    "real-time preview",
  ],
});

export default function MarkdownEditorPage() {
  return <ClientMarkdownEditor />;
}
