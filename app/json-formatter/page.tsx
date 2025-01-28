import type { Metadata } from "next";
import ClientJsonFormatter from "./client";

export const metadata: Metadata = {
  title: "JSON Formatter - Format and Validate JSON Online",
  description:
    "Format, validate, and beautify your JSON with this online tool. Features include minification, custom indentation, and error detection.",
  alternates: {
    canonical: "https://text-tools-nine.vercel.app/json-formatter",
  },
};

export default function JsonFormatterPage() {
  return <ClientJsonFormatter />;
}
