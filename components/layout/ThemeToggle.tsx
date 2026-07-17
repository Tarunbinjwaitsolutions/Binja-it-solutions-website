"use client";

import React from "react";
import { useTheme, themeConfig } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = { Sun, Moon };

interface ThemeToggleProps {
  compact?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false }) => {
  const { theme, setTheme } = useTheme();
  const config = themeConfig[theme];
  const Icon = iconMap[config.icon];

  return (
    <button
      onClick={() => setTheme(config.next)}
      title={config.tip}
      aria-label={config.tip}
      className={`
        relative flex items-center gap-1.5 rounded-full border transition-all duration-300
        ${compact ? "px-2 py-1.5" : "px-3 py-1.5"}
        ${theme === "light"
          ? "border-gray-200 bg-gray-100 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
          : "border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
        } hover:scale-105 active:scale-95
      `}
    >
      <div className="relative flex items-center justify-center overflow-hidden" style={{ width: 16, height: 16 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute"
          >
            <Icon size={15} className="shrink-0" />
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
};

export default ThemeToggle;
