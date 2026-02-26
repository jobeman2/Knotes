"use client";

import React, { useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";

const colorPresets = [
  { name: "Blue", value: "blue", class: "bg-blue-600" },
  { name: "Green", value: "green", class: "bg-green-600" },
  { name: "Rose", value: "rose", class: "bg-rose-600" },
  { name: "Violet", value: "violet", class: "bg-violet-600" },
  { name: "Amber", value: "amber", class: "bg-amber-600" },
] as const;

const ThemeSelector: React.FC = () => {
  const { mode, colorTheme, toggleMode, setColorTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        title="Theme Settings"
      >
        <div className={`w-4 h-4 rounded-full bg-primary`} />
        {mode === "light" ? (
          <svg
            className="w-5 h-5 text-gray-700"
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
            className="w-5 h-5 text-gray-200"
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
          <div className="absolute right-0 mt-2 w-56 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-in fade-in zoom-in duration-200">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">
              Appearance
            </h3>

            <button
              onClick={toggleMode}
              className="w-full flex items-center justify-between p-2 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
            >
              <span className="text-sm font-medium">
                {mode === "light" ? "Light Mode" : "Dark Mode"}
              </span>
              <div className="w-8 h-4 bg-gray-300 dark:bg-gray-500 rounded-full relative">
                <div
                  className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${mode === "dark" ? "translate-x-4" : ""}`}
                />
              </div>
            </button>

            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">
              Color Preset
            </h3>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setColorTheme(preset.value)}
                  className={`w-8 h-8 rounded-full ${preset.class} border-2 transition-all ${
                    colorTheme === preset.value
                      ? "border-black dark:border-white scale-110 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  title={preset.name}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
