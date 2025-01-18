"use client";

import { ReactNode } from "react";
import { Share2, BookmarkPlus, ArrowLeftRight } from "lucide-react";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  toolInfo: {
    features: string[];
    howToUse: string[];
    faqs: Array<{ question: string; answer: string }>;
  };
}

export default function ToolPageLayout({
  title,
  description,
  children,
  toolInfo,
}: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tool Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">{description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              {children}
            </div>

            {/* Tool Information Section */}
            <div className="space-y-8">
              {/* Features */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {toolInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-blue-600">•</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Use */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How to Use
                </h2>
                <ol className="space-y-3">
                  {toolInfo.howToUse.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="font-bold text-blue-600 mr-3">
                        {index + 1}.
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {toolInfo.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                  <Share2 className="w-4 h-4" />
                  Share Result
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                  <BookmarkPlus className="w-4 h-4" />
                  Save for Later
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                  <ArrowLeftRight className="w-4 h-4" />
                  Swap Input/Output
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
