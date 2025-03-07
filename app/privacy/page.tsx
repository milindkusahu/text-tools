import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Privacy Policy - TextStash",
  description:
    "Learn about how TextStash collects, uses, and protects your data with our privacy policy.",
  path: "/privacy",
  keywords: [
    "privacy policy",
    "data protection",
    "TextStash privacy",
    "text tools privacy",
  ],
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="prose max-w-none">
        <p>
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h2>Introduction</h2>
        <p>
          At TextStash, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website at{" "}
          <a href="https://www.textstash.com">https://www.textstash.com</a>.
        </p>
        <p>
          Please read this privacy policy carefully. If you do not agree with
          the terms of this privacy policy, please do not access the site.
        </p>

        <h2>Information We Collect</h2>
        <p>
          <strong>
            We do not collect any personal information when you use our text
            tools.
          </strong>{" "}
          All text processing happens locally in your browser, and we do not
          store or transmit your text to any server.
        </p>
        <p>
          We may collect anonymous usage data through services like Google
          Analytics, which may include:
        </p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Referral source</li>
          <li>Length of visit, page views</li>
          <li>Navigation paths</li>
          <li>
            Information about the timing, frequency and pattern of your service
            use
          </li>
        </ul>
        <p>
          This information is used solely to improve our website and tools. It
          does not include any personally identifiable information.
        </p>

        <h2>Cookies</h2>
        <p>
          TextStash uses cookies to enhance your browsing experience. Cookies
          are small files that a site or its service provider transfers to your
          computer&apos;s hard drive through your web browser (if you allow)
          that enables the site to recognize your browser and remember certain
          information.
        </p>
        <p>We use cookies to:</p>
        <ul>
          <li>Understand and save user&apos;s preferences for future visits</li>
          <li>
            Compile aggregate data about site traffic and site interactions
          </li>
          <li>Remember tool settings for better user experience</li>
        </ul>
        <p>
          You can choose to have your computer warn you each time a cookie is
          being sent, or you can choose to turn off all cookies through your
          browser settings. Since each browser is different, look at your
          browser&apos;s Help Menu to learn the correct way to modify your
          cookies.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services such as Google Analytics to help us
          understand website usage. These services may use cookies and tracking
          technologies to help us analyze how visitors use our site. The
          information generated about your use of our website will be
          transmitted to and stored by these third parties on their servers.
        </p>
        <p>
          These third-party service providers have their own privacy policies
          addressing how they use such information.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement reasonable security measures to maintain the safety of
          your data. However, please remember that no method of transmission
          over the Internet or method of electronic storage is 100% secure.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from children
          under 13.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the `${"Last updated"}` date.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at <a href="mailto:contact@textstash.com">contact@textstash.com</a>.
        </p>
      </div>
    </div>
  );
}
