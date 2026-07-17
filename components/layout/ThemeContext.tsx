"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const themes = ["light", "dark"] as const;
export type ThemeType = (typeof themes)[number];

export const themeConfig = {
  light: {
    next: "dark" as const,
    icon: "Sun" as const,
    label: "Light",
    tip: "Switch to Dark",
  },
  dark: {
    next: "light" as const,
    icon: "Moon" as const,
    label: "Dark",
    tip: "Switch to Light",
  },
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("binjwa-theme") as ThemeType) || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("binjwa-theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    const idx = themes.indexOf(theme);
    setTheme(themes[(idx + 1) % themes.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
