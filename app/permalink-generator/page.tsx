import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientPermalinkGenerator from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Advanced Permalink Generator - Slug Generator & URL Creator",
  description:
    "Professional permalink generator, slug generator, and URL slug creator with multiple strategies, SEO optimization, and validation. Create perfect URLs and slugs for blogs and websites.",
  path: "/permalink-generator",
  keywords: [
    "permalink generator",
    "slug generator",
    "URL slug generator",
    "text to slug",
    "URL generator",
    "SEO permalink",
    "URL slug",
    "SEO friendly URL",
    "blog permalink",
    "website URL",
    "content URL",
    "URL optimization",
    "permalink creator",
    "URL builder",
    "SEO URL generator",
    "custom permalink",
    "smart permalink",
    "slug creator",
    "text slug converter",
    "URL slug maker",
    "permalink maker",
    "slugify text",
    "URL friendly text",
    "SEO slug generator",
    "blog slug generator",
    "website slug generator",
  ],
});

export default function PermalinkGeneratorPage() {
  return <ClientPermalinkGenerator />;
}
