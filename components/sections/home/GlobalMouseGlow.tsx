"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GlobalMouseGlow: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // Start off-screen

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      <motion.div
        animate={{
          x: mousePos.x - 400,
          y: mousePos.y - 400,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
        className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0 opacity-[0.08] dark:opacity-[0.15] mix-blend-screen"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
        }}
      />
      {/* Tiny sharp cursor dot */}
      <motion.div
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white/50 pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  );
};

export default GlobalMouseGlow;
