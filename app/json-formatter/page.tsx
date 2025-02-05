import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import ClientJsonFormatter from "./client";

export const metadata: Metadata = constructMetadata({
  title: "JSON Formatter - Format and Validate JSON Online",
  description:
    "Format, validate, and beautify your JSON with this online tool. Features include minification, custom indentation, and error detection.",
  path: "/json-formatter",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "json parser",
    "json prettifier",
    "code formatting",
  ],
});

export default function JsonFormatterPage() {
  return <ClientJsonFormatter />;
}
