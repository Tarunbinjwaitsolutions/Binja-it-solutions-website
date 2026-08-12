"use client";

/**
 * SmoothScrollProvider integrates Lenis for smooth scrolling across the application.
 * It uses requestAnimationFrame for the render loop and synchronizes with GSAP's ScrollTrigger.
 *
 * HOW TO EXCLUDE ELEMENTS FROM SMOOTH SCROLL:
 * If you have a modal, dropdown, or overlay with internal scrolling that conflicts with Lenis,
 * simply add the `data-lenis-prevent` attribute to the scrollable container.
 * Example: <div className="overflow-y-auto" data-lenis-prevent>...</div>
 */

import React, { useEffect, createContext, useContext, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger to ensure it's available
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false, // Ensure mobile touch scroll still feels natural and native
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // GSAP ticker integration to ensure both run on the same requestAnimationFrame
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Disable GSAP lag smoothing to avoid conflicts with Lenis
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      // Cleanup on unmount
      lenisInstance.destroy();
      gsap.ticker.remove((time) => {
        lenisInstance.raf(time * 1000);
      });
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
