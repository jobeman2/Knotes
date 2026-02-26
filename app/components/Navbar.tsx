"use client";

import Link from "next/link";
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-bold text-primary tracking-tight"
            >
              SmartNotes
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Register
              </Link>
              <Link
                href="/test"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Test
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
