"use client";

import React, { useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";

const ThemeSelector: React.FC = () => {
  const { mode, toggleMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full border border-border bg-surface hover:bg-muted transition-colors shadow-sm"
        title="Theme Settings"
      >
        <div
          className={`w-4 h-4 rounded-full bg-primary shadow-sm shadow-amber-500/20`}
        />
        {mode === "light" ? (
          <svg
            className="w-5 h-5 text-zinc-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-zinc-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 p-4 bg-surface rounded-xl shadow-2xl border border-border z-50 animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider px-2">
              Appearance
            </h3>

            <button
              onClick={toggleMode}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-muted hover:opacity-90 transition-all border border-border shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full bg-primary animate-pulse`}
                />
                <span className="text-sm font-bold text-foreground opacity-70">
                  Dark Mode
                </span>
              </div>
              <div
                className={`w-10 h-5 rounded-full relative transition-colors ${mode === "dark" ? "bg-amber-500" : "bg-zinc-200"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 shadow-sm ${mode === "dark" ? "translate-x-5" : ""}`}
                />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
