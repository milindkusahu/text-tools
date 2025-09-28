import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Text to Binary/Hex Converter - Free Online Tool",
  description:
    "Convert text to binary, hexadecimal, octal, and other encoding formats instantly. Perfect for developers, cybersecurity professionals, and data analysis.",
  path: "/text-to-binary-hex",
  keywords: [
    "text to binary",
    "text to hex",
    "binary converter",
    "hexadecimal converter",
    "text encoding",
    "binary encoding",
    "hex encoding",
    "octal converter",
    "ascii converter",
    "unicode converter",
    "developer tools",
    "cybersecurity tools",
    "data encoding",
  ],
  tool: "Text to Binary/Hex Converter",
  theme: "purple",
});

export default function TextToBinaryHexPage() {
  return null;
}
