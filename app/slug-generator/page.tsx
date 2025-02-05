import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientSlugGenerator from "./client";

export const metadata: Metadata = constructMetadata({
  title: "URL Slug Generator - Create SEO-friendly URLs",
  description:
    "Convert any text into clean, SEO-friendly URL slugs. Perfect for blog posts, articles, and web pages.",
  path: "/slug-generator",
  keywords: [
    "url slug generator",
    "slug generator",
    "url generator",
    "seo friendly urls",
    "permalink generator",
    "url converter",
    "web friendly urls",
  ],
});

export default function SlugGeneratorPage() {
  return <ClientSlugGenerator />;
}
