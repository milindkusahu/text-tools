"use client";

import { ReactNode, useState, useCallback } from "react";
import {
  Share2,
  BookmarkPlus,
  ArrowLeftRight,
  Check,
  Copy,
  Trash2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  toolInfo: {
    features: string[];
    howToUse: string[];
    faqs: Array<{ question: string; answer: string }>;
  };
  // Optional props for Quick Actions functionality
  input?: string;
  output?: string;
  onSwapInputOutput?: () => void;
  onRestoreItem?: (input: string, output: string) => void;
  toolId?: string;
}

export default function ToolPageLayout({
  title,
  description,
  children,
  toolInfo,
  input = "",
  output = "",
  onSwapInputOutput,
  onRestoreItem,
  toolId = "",
}: ToolPageLayoutProps) {
  const [savedItems, setSavedItems] = useState<
    Array<{
      id: string;
      title: string;
      input: string;
      output: string;
      timestamp: number;
    }>
  >([]);
  const [isSaved, setIsSaved] = useState(false);

  // Share functionality
  const shareResult = useCallback(async () => {
    if (!output.trim()) {
      toast.error("No result to share");
      return;
    }

    const shareData = {
      title: `${title} - Result`,
      text: output,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success("Result shared successfully!");
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(output);
        toast.success("Result copied to clipboard!");
      }
    } catch {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(output);
        toast.success("Result copied to clipboard!");
      } catch {
        toast.error("Failed to share result");
      }
    }
  }, [output, title]);

  // Save for later functionality
  const saveForLater = useCallback(() => {
    if (!input.trim() && !output.trim()) {
      toast.error("Nothing to save");
      return;
    }

    // Check if this exact combination already exists
    const existingItem = savedItems.find(
      (item) =>
        item.input === input && item.output === output && item.title === title
    );

    if (existingItem) {
      toast.error("This item is already saved!");
      return;
    }

    const itemId = `${toolId}-${Date.now()}`;
    const newItem = {
      id: itemId,
      title: title,
      input: input,
      output: output,
      timestamp: Date.now(),
    };

    setSavedItems((prev) => [newItem, ...prev.slice(0, 9)]); // Keep only 10 items
    setIsSaved(true);
    toast.success("Saved for later!");

    // Store in localStorage
    try {
      const existing = JSON.parse(
        localStorage.getItem("textTools_saved") || "[]"
      );
      const updated = [newItem, ...existing.slice(0, 9)];
      localStorage.setItem("textTools_saved", JSON.stringify(updated));
    } catch {
      // Ignore localStorage errors
    }

    // Reset saved state after 2 seconds
    setTimeout(() => setIsSaved(false), 2000);
  }, [input, output, title, toolId, savedItems]);

  // Copy result to clipboard
  const copyResult = useCallback(async () => {
    if (!output.trim()) {
      toast.error("No result to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      toast.success("Result copied to clipboard!");
    } catch {
      toast.error("Failed to copy result");
    }
  }, [output]);

  // Delete saved item
  const deleteSavedItem = useCallback((itemId: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== itemId));

    // Update localStorage
    try {
      const existing = JSON.parse(
        localStorage.getItem("textTools_saved") || "[]"
      );
      const updated = existing.filter(
        (item: { id: string }) => item.id !== itemId
      );
      localStorage.setItem("textTools_saved", JSON.stringify(updated));
      toast.success("Item deleted!");
    } catch {
      toast.error("Failed to delete item");
    }
  }, []);

  // Clear all saved items
  const clearAllSavedItems = useCallback(() => {
    setSavedItems([]);
    try {
      localStorage.removeItem("textTools_saved");
      toast.success("All saved items cleared!");
    } catch {
      toast.error("Failed to clear saved items");
    }
  }, []);

  // Restore saved item
  const restoreItem = useCallback(
    (item: { input: string; output: string }) => {
      if (onRestoreItem) {
        onRestoreItem(item.input, item.output);
        toast.success("Item restored!");
      }
    },
    [onRestoreItem]
  );

  // Load saved items from localStorage on mount
  useState(() => {
    try {
      const saved = localStorage.getItem("textTools_saved");
      if (saved) {
        setSavedItems(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  });
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
                <button
                  onClick={shareResult}
                  disabled={!output.trim()}
                  className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Share2 className="w-4 h-4" />
                  Share Result
                </button>
                <button
                  onClick={copyResult}
                  disabled={!output.trim()}
                  className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Copy className="w-4 h-4" />
                  Copy Result
                </button>
                <button
                  onClick={saveForLater}
                  disabled={!input.trim() && !output.trim()}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isSaved
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {isSaved ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <BookmarkPlus className="w-4 h-4" />
                  )}
                  {isSaved ? "Saved!" : "Save for Later"}
                </button>
                {onSwapInputOutput && (
                  <button
                    onClick={onSwapInputOutput}
                    disabled={!input.trim() || !output.trim()}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    Swap Input/Output
                  </button>
                )}
              </div>
            </div>

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Saved Items</h3>
                  <button
                    onClick={clearAllSavedItems}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                    title="Clear all saved items"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {savedItems.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 rounded-lg group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </div>
                          {item.output && (
                            <div className="text-xs text-gray-600 mt-1 truncate">
                              {item.output}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                          {onRestoreItem && (
                            <button
                              onClick={() => restoreItem(item)}
                              className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                              title="Restore this item"
                            >
                              <ArrowLeftRight className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteSavedItem(item.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete this item"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {savedItems.length > 5 && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    +{savedItems.length - 5} more items
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
