import type { Metadata } from "next";
import ClientSlugGenerator from "./client";

export const metadata: Metadata = {
  title: "URL Slug Generator - Create SEO-friendly URLs",
  description:
    "Convert any text into clean, SEO-friendly URL slugs. Perfect for blog posts, articles, and web pages.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/slug-generator",
  },
};

export default function SlugGeneratorPage() {
  return <ClientSlugGenerator />;
}
