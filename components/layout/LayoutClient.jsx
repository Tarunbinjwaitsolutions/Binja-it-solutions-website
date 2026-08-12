"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/Compliance/Banner/Banner";
import dynamic from 'next/dynamic';
import ChatbotWidget from "@/components/Chatbot/ChatbotWidget";

// Lazy load heavy widgets to unblock the main thread
const VoiceBotWidget = dynamic(() => import("@/components/Chatbot/VoiceBotWidget"), { ssr: false });
const ChatbotWidgetLazy = dynamic(() => import("@/components/Chatbot/ChatbotWidget"), { ssr: false });

const bannerImages = {
  // We will dynamically import the first banner from public folder if needed,
  // or statically point to it if it exists. For now, we will assume null to avoid Vite syntax.
  // The original used import.meta.glob which is Vite specific.
  // We can load it from public/assets/banner if there is one.
};
const bannerImageUrl = "/assets/banner/default.jpg"; // Placeholder, adjust if needed
const hasBanner = false; // Adjust based on actual files

/**
 * LayoutClient acts as the primary global wrapper for the application.
 * It injects and renders the following elements globally across all pages:
 * - A Framer Motion scroll progress bar (top)
 * - The dynamic Banner component (conditionally rendered)
 * - react-hot-toast Toaster for global notifications
 * - The main Navbar component
 * - The Page content (`children`)
 * - The global Footer component
 * - Lazy-loaded AI VoiceBot and Chatbot widgets anchored to the bottom right
 */
export default function LayoutClient({ children }) {
  const [showBanner, setShowBanner] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleShowBanner = () => {
    if (hasBanner) setShowBanner(true);
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-[100]"
        style={{ scaleX, boxShadow: "0 0 10px rgba(249,115,22,0.8)" }}
      />
      <Banner showBanner={showBanner} handleCloseBanner={handleCloseBanner} bannerImageUrl={bannerImageUrl} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="transition-colors duration-500 relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <Navbar handleShowBanner={handleShowBanner} hasBanner={hasBanner} />
        <main>
          {children}
        </main>
        <Footer />
      </div>
      {/* Bot Widgets Container */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-end hover:-translate-y-1 transition-transform duration-300">
          <VoiceBotWidget />
        </div>
        <div className="pointer-events-auto flex flex-col items-end hover:-translate-y-1 transition-transform duration-300">
          <ChatbotWidgetLazy />
        </div>
      </div>
    </>
  );
}
