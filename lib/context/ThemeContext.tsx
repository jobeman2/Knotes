"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";
type ColorTheme = "blue" | "green" | "rose" | "violet" | "amber";

interface ThemeContextType {
  mode: ThemeMode;
  colorTheme: ColorTheme;
  setMode: (mode: ThemeMode) => void;
  setColorTheme: (theme: ColorTheme) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue");
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
    const savedColor = localStorage.getItem("color-theme") as ColorTheme;
    if (savedMode) setMode(savedMode);
    if (savedColor) setColorTheme(savedColor);
    setMounted(true);
  }, []);

  // Apply classes and persist
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Handle Dark Mode
    if (mode === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme-mode", mode);

    // Handle Color Theme
    root.setAttribute("data-color-theme", colorTheme);
    localStorage.setItem("color-theme", colorTheme);
  }, [mode, colorTheme, mounted]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider
      value={{ mode, colorTheme, setMode, setColorTheme, toggleMode }}
    >
      <div className={mounted ? "" : "invisible"}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
