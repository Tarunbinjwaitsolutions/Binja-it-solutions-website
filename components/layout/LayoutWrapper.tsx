"use client";

import React, { useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Banner from "./Banner";
import dynamic from "next/dynamic";

const ChatbotWidget = dynamic(() => import("./ChatbotWidget"), { ssr: false });
const VoiceBotWidget = dynamic(() => import("./VoiceBotWidget"), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showBanner, setShowBanner] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // In the original project, src/assets/banner is empty, meaning hasBanner evaluates to false.
  // We keep this structure, but permit a fallback if the user drops in a banner.png later.
  const hasBanner = false;
  const bannerImageUrl: string | null = null;

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
      <div className="overflow-x-hidden transition-colors duration-500" style={{ backgroundColor: "var(--bg-primary)" }}>
        <Navbar handleShowBanner={handleShowBanner} hasBanner={hasBanner} />
        <main>{children}</main>
        <Footer />
      </div>
      {/* Bot Widgets Container */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-end hover:-translate-y-1 transition-transform duration-300">
          <VoiceBotWidget />
        </div>
        <div className="pointer-events-auto flex flex-col items-end hover:-translate-y-1 transition-transform duration-300">
          <ChatbotWidget />
        </div>
      </div>
    </>
  );
}
