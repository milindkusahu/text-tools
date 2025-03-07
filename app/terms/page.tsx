import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Terms of Service - TextStash",
  description:
    "Read the terms and conditions for using TextStash's online text tools and services.",
  path: "/terms",
  keywords: [
    "terms of service",
    "terms and conditions",
    "TextStash terms",
    "usage policy",
  ],
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

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
          These Terms of Service (`${"Terms"}`) govern your access to and use of
          the TextStash website, services, and tools available at{" "}
          <a href="https://www.textstash.com">https://www.textstash.com</a> (`$
          {"Service"}`). Please read these Terms carefully before using our
          Service.
        </p>
        <p>
          By accessing or using the Service, you agree to be bound by these
          Terms. If you disagree with any part of the terms, you may not access
          the Service.
        </p>

        <h2>Use of Service</h2>
        <p>
          TextStash provides various text manipulation tools for your use. You
          are responsible for how you use these tools and the content you
          process using them. All text processing happens locally in your
          browser.
        </p>
        <p>
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms. You agree not to use the Service:
        </p>
        <ul>
          <li>
            In any way that violates any applicable federal, state, local, or
            international law or regulation
          </li>
          <li>
            To transmit any material that is defamatory, obscene, invasive of
            another&apos;s privacy, harassing, or otherwise objectionable
          </li>
          <li>
            To engage in any conduct that restricts or inhibits anyone&apos;s
            use or enjoyment of the Service
          </li>
          <li>
            To attempt to probe, scan, or test the vulnerability of the system
            or network
          </li>
          <li>To overload, flood, or spam our servers</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of Milind Kumar Sahu and
          TextStash. The Service is protected by copyright, trademark, and other
          laws.
        </p>
        <p>
          Our trademarks and trade dress may not be used in connection with any
          product or service without the prior written consent of TextStash.
        </p>
        <p>
          The source code for TextStash is available under the MIT License on{" "}
          <a
            href="https://github.com/milindkusahu/text-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          . Any contributions to the project are subject to the terms of this
          license.
        </p>

        <h2>User Content</h2>
        <p>
          TextStash does not store or process your content on our servers. All
          text processing is done locally in your browser. We do not claim
          ownership of any content that you process using our tools.
        </p>

        <h2>Links to Other Websites</h2>
        <p>
          Our Service may contain links to third-party websites or services that
          are not owned or controlled by TextStash. We have no control over, and
          assume no responsibility for, the content, privacy policies, or
          practices of any third-party websites or services.
        </p>
        <p>
          You acknowledge and agree that TextStash shall not be responsible or
          liable, directly or indirectly, for any damage or loss caused or
          alleged to be caused by or in connection with the use of or reliance
          on any such content, goods, or services available on or through any
          such websites or services.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          In no event shall TextStash, nor its directors, employees, partners,
          agents, suppliers, or affiliates, be liable for any indirect,
          incidental, special, consequential, or punitive damages, including
          without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from:
        </p>
        <ul>
          <li>
            Your access to or use of or inability to access or use the Service
          </li>
          <li>Any conduct or content of any third party on the Service</li>
          <li>Any content obtained from the Service</li>
          <li>
            Unauthorized access, use, or alteration of your transmissions or
            content
          </li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          Your use of the Service is at your sole risk. The Service is provided
          on an `${"AS IS"}` and `${"AS AVAILABLE"}` basis. The Service is
          provided without warranties of any kind, whether express or implied,
          including, but not limited to, implied warranties of merchantability,
          fitness for a particular purpose, non-infringement, or course of
          performance.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will try to
          provide at least 30 days&apos; notice prior to any new terms taking
          effect. What constitutes a material change will be determined at our
          sole discretion.
        </p>
        <p>
          By continuing to access or use our Service after those revisions
          become effective, you agree to be bound by the revised terms. If you
          do not agree to the new terms, please stop using the Service.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:contact@textstash.com">contact@textstash.com</a>.
        </p>
      </div>
    </div>
  );
}
