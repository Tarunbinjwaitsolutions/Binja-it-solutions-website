"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaPinterest, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

const platforms = [
  { name: "Facebook", icon: FaFacebook, color: "#1877F2" },
  { name: "Instagram", icon: FaInstagram, color: "#E4405F" },
  { name: "LinkedIn", icon: FaLinkedin, color: "#0A66C2" },
  { name: "X (Twitter)", icon: FaXTwitter, color: "#FFFFFF" },
  { name: "Threads", icon: SiThreads, color: "#FFFFFF" },
  { name: "TikTok", icon: FaTiktok, color: "#00f2fe" },
  { name: "YouTube", icon: FaYoutube, color: "#FF0000" },
  { name: "Pinterest", icon: FaPinterest, color: "#E60023" },
  { name: "WhatsApp", icon: FaWhatsapp, color: "#25D366" },
];

export function LandingEcosystem() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden bg-[#09090B]">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F16522]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Ecosystem Orbit (Left Side on Desktop) */}
          <div className="order-2 lg:order-1 relative w-full max-w-[600px] mx-auto aspect-square flex items-center justify-center">
          {/* Outer Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              ...(isHovered && { duration: 50 }), // Slow down on hover
            }}
            className="absolute w-[80%] h-[80%] md:w-[70%] md:h-[70%] border-[2px] border-dashed border-[#F16522]/20 rounded-full"
          >
            {/* Icons */}
            {platforms.map((platform, index) => {
              const angle = (index / platforms.length) * 360;
              // Calculate position using basic trigonometry
              // 0 deg is right, so we offset by -90 to start at top
              const radius = 50; // 50% from center to edge of the container
              const radian = (angle - 90) * (Math.PI / 180);
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              return (
                <div
                  key={platform.name}
                  className="absolute w-0 h-0 flex items-center justify-center"
                  style={{
                    left: `calc(50% + ${x}%)`,
                    top: `calc(50% + ${y}%)`,
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                      ...(isHovered && { duration: 50 }),
                    }}
                    className="relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 group-hover:scale-125 group-hover:border-[#F16522]/50 group-hover:shadow-[0_0_20px_rgba(241,101,34,0.3)]">
                      <platform.icon 
                        className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-300"
                        style={{ color: platform.color }}
                      />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A1A1A] border border-white/10 text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                      <p className="text-sm font-semibold">{platform.name}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Inner orbit detail */}
          <div className="absolute w-[50%] h-[50%] md:w-[45%] md:h-[45%] border border-[#F16522]/10 rounded-full" />

          {/* Center Logo */}
          <motion.div 
            className="absolute z-20 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#1A1A1A] flex items-center justify-center shadow-[0_0_30px_rgba(241,101,34,0.2)] border-2 border-[#F16522]/30 overflow-hidden"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-bold text-[#F16522] text-3xl">binj-AI</span>
          </motion.div>
        </div>

        {/* Text Content (Right Side on Desktop) */}
        <div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
          >
            One Platform.<br />
            <span className="text-[#F16522]">All Your Social Media.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0"
          >
            Seamlessly manage, schedule, and analyze your content across the entire social media ecosystem from a single powerful dashboard.
          </motion.p>
        </div>

        </div>
      </div>
    </section>
  );
}
