import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.textstash.com";

export const defaultMetadata: Metadata = {
  title: {
    default: "Text Tools - Online Text Utilities",
    template: "%s",
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
        url: `/api/og?title=${encodeURIComponent(
          "Text Tools"
        )}&description=${encodeURIComponent("Online Text Utilities")}`,
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
    images: [
      `/api/og?title=${encodeURIComponent(
        "Text Tools"
      )}&description=${encodeURIComponent("Online Text Utilities")}`,
    ],
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

export interface MetadataParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  tool?: string;
  theme?: "blue" | "purple" | "green";
}

export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
  tool = "",
  theme = "blue",
}: MetadataParams): Metadata {
  const ogImageUrl = `/api/og?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}${
    tool ? `&tool=${encodeURIComponent(tool)}` : ""
  }${theme ? `&theme=${theme}` : ""}`;

  return {
    title,
    description,
    keywords: [...(defaultMetadata.keywords || []), ...keywords],
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `${baseUrl}${path}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
