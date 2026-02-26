import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";
type ColorTheme = "blue" | "green" | "rose" | "violet";

interface ThemeContextType {
  mode: ThemeMode;
  colorTheme: ColorTheme;
  toggleMode: () => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem("theme-mode") as ThemeMode) || "light";
  });
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    return (localStorage.getItem("color-theme") as ColorTheme) || "blue";
  });

  useEffect(() => {
    document.documentElement.className = mode;
    document.documentElement.setAttribute("data-color-theme", colorTheme);
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("color-theme", colorTheme);
  }, [mode, colorTheme]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ mode, colorTheme, toggleMode, setColorTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
