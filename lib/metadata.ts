import { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://text-tools-nine.vercel.app";

export const defaultMetadata: Metadata = {
  title: {
    default: "Text Tools - Online Text Utilities",
    template: "%s | Text Tools",
  },
  description:
    "Free online text tools for case conversion, word counting, and more text manipulation utilities.",
  keywords: [
    "text tools",
    "online utilities",
    "text manipulation",
    "word counter",
    "case converter",
  ],
  authors: [{ name: "Milind Kumar Sahu" }],
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    siteName: "Text Tools",
    title: "Text Tools - Online Text Utilities",
    description:
      "Free online text tools for case conversion, word counting, and more text manipulation utilities.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Text Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Tools - Online Text Utilities",
    description:
      "Free online text tools for case conversion, word counting, and more text manipulation utilities.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
