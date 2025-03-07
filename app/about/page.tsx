import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "About TextStash - Online Text Tools",
  description:
    "Learn about TextStash, a collection of free online text tools to help developers, writers, and content creators manipulate and analyze text.",
  path: "/about",
  keywords: ["about", "text tools", "TextStash", "Milind Kumar Sahu"],
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About TextStash</h1>

      <div className="prose max-w-none">
        <p>
          TextStash is a comprehensive collection of free online text
          manipulation tools designed to help developers, writers, content
          creators, and anyone who works with text. Our mission is to provide
          easy-to-use, powerful tools that simplify common text-related tasks.
        </p>

        <h2>Our Story</h2>
        <p>
          TextStash was created by{" "}
          <a
            href="https://milindsahu.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Milind Kumar Sahu
          </a>
          , a developer who frequently found himself needing various text
          manipulation tools while working on projects. After using scattered
          tools across the web, he decided to build a centralized platform with
          all the essential text utilities in one place.
        </p>
        <p>
          What started as a personal project has grown into a suite of powerful
          tools used by thousands of people worldwide every day. The project is
          regularly updated with new tools and improvements based on user
          feedback.
        </p>

        <h2>Our Tools</h2>
        <p>TextStash offers a wide range of text tools, including:</p>
        <ul>
          <li>
            <strong>Word and Character Counters</strong> - Analyze text
            statistics with advanced metrics
          </li>
          <li>
            <strong>Case Converters</strong> - Transform text between different
            cases
          </li>
          <li>
            <strong>Text Comparison</strong> - Find differences between two
            texts
          </li>
          <li>
            <strong>Markdown Editor</strong> - Write and preview Markdown in
            real-time
          </li>
          <li>
            <strong>JSON Formatter</strong> - Format and validate JSON data
          </li>
          <li>
            <strong>Text Cleaner</strong> - Remove extra spaces, lines, and
            formatting
          </li>
          <li>
            <strong>Lorem Ipsum Generator</strong> - Create placeholder text for
            designs
          </li>
          <li>
            <strong>Email Extractor</strong> - Extract email addresses from text
          </li>
          <li>
            <strong>And many more...</strong>
          </li>
        </ul>

        <h2>Our Commitment</h2>
        <p>
          All TextStash tools run entirely in your browser. We don&apos;t store
          your text or send it to any server, ensuring your data remains private
          and secure. We&apos;re committed to providing high-quality, ad-free
          tools that respect your privacy.
        </p>
        <p>
          TextStash is and will always be free to use. We believe in creating
          useful tools that are accessible to everyone, regardless of their
          budget or technical expertise.
        </p>

        <h2>Open Source</h2>
        <p>
          TextStash is an open-source project. You can view the source code,
          report issues, or contribute on{" "}
          <a
            href="https://github.com/milindkusahu/text-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          . We welcome contributions from the community to help make TextStash
          even better.
        </p>

        <h2>Get in Touch</h2>
        <p>
          We&apos;re always looking to improve our tools and add new features.
          If you have suggestions, feedback, or questions, please don&apos;t
          hesitate to <a href="/contact">contact us</a>.
        </p>
        <p>Thank you for using TextStash!</p>
      </div>
    </div>
  );
}
