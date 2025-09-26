"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsToolsOpen(false);
      }
    };

    if (isToolsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isToolsOpen]);

  // Close mobile menu when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleTools = () => setIsToolsOpen(!isToolsOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const closeBoth = () => {
    setIsMenuOpen(false);
    setIsToolsOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl font-bold text-blue-600">TextStash</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Home
            </Link>

            <div className="relative">
              <button
                ref={buttonRef}
                onClick={toggleTools}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
              >
                Tools
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isToolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Dropdown */}
              {isToolsOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 mt-1 animate-in slide-in-from-top-2 duration-200"
                >
                  <div className="max-h-96 overflow-y-auto">
                    {tools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        onClick={closeBoth}
                        className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <div className="font-medium">{tool.name}</div>
                        {tool.description && (
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {tool.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="bg-white w-full max-h-screen overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              <Link
                href="/"
                onClick={closeMenu}
                className="block py-3 px-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Home
              </Link>

              {/* Mobile Tools Section */}
              <div>
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="flex items-center justify-between w-full py-3 px-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  aria-expanded={isToolsOpen}
                >
                  <span>Tools</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isToolsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isToolsOpen && (
                  <div className="pl-4 mt-2 space-y-1 border-l-2 border-gray-100 ml-2">
                    {tools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        onClick={closeMenu}
                        className="block py-2 px-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="font-medium">{tool.name}</div>
                        {tool.description && (
                          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {tool.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                onClick={closeMenu}
                className="block py-3 px-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
