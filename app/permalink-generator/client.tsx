"use client";

import { useState } from "react";
import PermalinkGenerator from "@/components/tools/PermalinkGenerator";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const permalinkGeneratorInfo = {
  features: [
    "Multiple generation strategies: Smart SEO, UUID-based, Hash-based, Timestamp, and Custom patterns",
    "Advanced SEO optimization with stop word removal and intelligent word selection",
    "Real-time validation with comprehensive issue detection and suggestions",
    "Smart scoring system for SEO, uniqueness, and readability metrics",
    "Customizable separators, prefixes, suffixes, and length limits",
    "Date and random string integration for unique permalinks and slugs",
    "Export functionality to save multiple permalink and slug variations",
    "Professional validation with best practice recommendations",
    "Instant preview of all generation strategies with side-by-side comparison",
    "Advanced pattern customization with variable substitution",
    "Copy-to-clipboard functionality for easy integration",
    "Responsive design optimized for all devices and screen sizes",
    "Perfect for creating URL slugs, permalinks, and SEO-friendly URLs",
  ],
  howToUse: [
    "Enter your article title, blog post name, or any text in the input field",
    "Choose your preferred generation strategy from the dropdown menu",
    "Customize options like separator, max length, and advanced settings",
    "View all generated permalink and slug variations with their quality scores",
    "Click on any permalink or slug to select it as your final choice",
    "Review validation results and follow suggestions for optimization",
    "Copy the selected permalink/slug or export all variations for later use",
    "Use the quick action buttons to quickly switch between popular strategies",
  ],
  faqs: [
    {
      question:
        "What makes this permalink/slug generator different from others?",
      answer:
        "Our generator offers multiple intelligent strategies, real-time validation, quality scoring, and advanced customization options. It goes beyond basic slug generation to provide SEO-optimized, validated permalinks and URL slugs with comprehensive analysis.",
    },
    {
      question: "What is the Smart SEO strategy?",
      answer:
        "The Smart SEO strategy intelligently selects the most meaningful words from your text, removes stop words, and creates SEO-friendly permalinks and URL slugs optimized for search engines and readability.",
    },
    {
      question: "How does the validation system work?",
      answer:
        "Our validation system checks for length, character usage, SEO best practices, and common issues. It provides specific suggestions to improve your permalink's or slug's quality and search engine performance.",
    },
    {
      question: "What are the quality scores based on?",
      answer:
        "Quality scores evaluate SEO optimization (length, word count, character variety), uniqueness (word diversity), and readability (average word length). Scores help you choose the best permalink or slug variation.",
    },
    {
      question: "Can I customize the generation patterns?",
      answer:
        "Yes! The custom pattern strategy allows you to create your own templates using variables like {title}, {date}, and {random}. You can also add prefixes, suffixes, and choose different separators for your slugs and permalinks.",
    },
    {
      question: "What's the difference between UUID and Hash strategies?",
      answer:
        "UUID strategy generates cryptographically secure unique identifiers, perfect for privacy-focused applications. Hash strategy creates shorter, deterministic hashes based on your input text, ideal for consistent URL slugs.",
    },
    {
      question: "How do I choose the best permalink or slug for my content?",
      answer:
        "Consider your use case: Smart SEO for blog posts and articles, UUID for private content, Hash for consistent short URLs, or Custom for specific requirements. Check the quality scores and validation results to make an informed decision.",
    },
    {
      question: "Can I export multiple permalink and slug variations?",
      answer:
        "Yes! You can export all generated variations as a JSON file, including metadata like generation time, quality scores, and strategy information for future reference.",
    },
    {
      question: "What are the recommended permalink and slug lengths?",
      answer:
        "Optimal permalinks and URL slugs are 30-60 characters long with 3-5 meaningful words. Our validation system will warn you if your permalink or slug is too short, too long, or doesn't follow SEO best practices.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely! All permalink and slug generation happens in your browser. Your text is never sent to our servers or stored anywhere. Complete privacy and security guaranteed.",
    },
    {
      question: "What's the difference between a permalink and a slug?",
      answer:
        "A slug is the URL-friendly part of a web address (like 'my-article-title'), while a permalink is the complete URL (like 'https://example.com/my-article-title'). Our tool generates both - the slug part that you can use in your URLs.",
    },
  ],
};

export default function ClientPermalinkGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const restoreItem = (restoreInput: string, restoreOutput: string) => {
    setInput(restoreInput);
    setOutput(restoreOutput);
  };

  return (
    <ToolPageLayout
      title="Permalink Generator - Slug Generator & URL Creator"
      description="Professional permalink generator, slug generator, and URL slug creator with multiple strategies, SEO optimization, real-time validation, and advanced customization. Create perfect URLs, slugs, and permalinks for blogs, websites, and content management systems with intelligent analysis and quality scoring."
      toolInfo={permalinkGeneratorInfo}
      input={input}
      output={output}
      onRestoreItem={restoreItem}
      toolId="permalink-generator"
    >
      <PermalinkGenerator
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
      />
    </ToolPageLayout>
  );
}
