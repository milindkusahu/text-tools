import type { Metadata } from "next";
import ClientMarkdownEditor from "./client";

export const metadata: Metadata = {
  title: "Markdown Editor - Write and Preview Markdown",
  description:
    "Write, edit, and preview Markdown with a real-time preview. Perfect for writing documentation, README files, and formatted text.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/markdown-editor",
  },
};

export default function MarkdownEditorPage() {
  return <ClientMarkdownEditor />;
}
