"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">TextStash</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            <div className="relative group">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                Tools <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.path}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-600"
            >
              Home
            </Link>
            <div className="py-2">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex items-center gap-1 text-gray-600"
              >
                Tools <ChevronDown className="w-4 h-4" />
              </button>
              {isToolsOpen && (
                <div className="pl-4 mt-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-gray-600"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-600"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
