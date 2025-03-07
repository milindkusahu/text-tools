import { constructMetadata } from "@/lib/metadata";
import ClientEmailExtractor from "./client";

export const metadata = constructMetadata({
  title: "Email Extractor - Extract Emails from Text",
  description:
    "Extract, validate, and export email addresses from text. Remove duplicates and format email lists for your needs.",
  path: "/email-extractor",
  keywords: [
    "email extractor",
    "email finder",
    "extract emails",
    "email validator",
    "email scraper",
  ],
});

export default function EmailExtractorPage() {
  return <ClientEmailExtractor />;
}
