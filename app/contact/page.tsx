import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Contact Us - TextStash",
  description:
    "Get in touch with the TextStash team. We'd love to hear your feedback, suggestions, or answer any questions you may have.",
  path: "/contact",
  keywords: [
    "contact",
    "feedback",
    "support",
    "TextStash contact",
    "get in touch",
  ],
});

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="prose max-w-none mb-8">
        <p>
          We&apos;d love to hear from you! Whether you have questions, feedback,
          suggestions for new tools, or just want to say hello, feel free to get
          in touch with us.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Email</h3>
              <a
                href="mailto:contact@textstash.com"
                className="text-blue-600 hover:underline"
              >
                contact@textstash.com
              </a>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">GitHub</h3>
              <a
                href="https://github.com/milindkusahu/text-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/milindkusahu/text-tools
              </a>
              <p className="text-sm text-gray-600">
                For bug reports, feature requests, or contributions, please use
                GitHub issues.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Website</h3>
              <a
                href="https://milindsahu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                milindsahu.com
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="What is this regarding?"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>

            <p className="text-xs text-gray-500 mt-2">
              Note: This form is for demonstration purposes. To send a message,
              please email us directly at contact@textstash.com.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
