"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeInUp, hoverScale } from "@/lib/animations";

const heroData = {
  headline: "Build, Automate & Grow Your Business with Smart IT Solutions",
  paragraph:
    "From AI-powered tools to modern websites and business software, we create solutions that save time, improve efficiency, and help your business scale.",
  videoSrc: "/Hero-Video.mp4",
  posterSrc: "",
};

const Hero = () => {
  return (
    <div className="relative w-full pt-30 h-screen flex items-center justify-start text-white overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={heroData.posterSrc}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={heroData.videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full z-1" style={{ backgroundColor: "var(--hero-overlay)" }} />

      {/* Content */}
      <motion.div
        className="relative z-10 px-8 lg:px-16 flex flex-col items-start"
        initial="hidden"
        animate="visible"
        variants={staggerContainer as any}
      >
        <motion.h1
          variants={fadeInUp as any}
          className="text-3xl md:text-5xl lg:text-6xl w-[95%] lg:w-[85%] font-serif font-bold my-4 leading-tight bg-gradient-to-r from-white via-blue-100 to-gray-400 bg-clip-text text-transparent"
        >
          {heroData.headline.split(" ").map((word, index, arr) => (
            <React.Fragment key={index}>
              <span
                className="
    inline-block
    bg-gradient-to-r
    from-white
    via-blue-100
    bg-clip-text    
    transition-all
    duration-300
    hover:bg-none
    hover:text-orange-400
    
  " >
                {word}
              </span>
              {index !== arr.length - 1 && " "}
            </React.Fragment>
          ))}
        </motion.h1>
        <motion.p
          variants={fadeInUp as any}
          className="max-w-xl text-md md:text-lg text-neutral-200 mb-8"
        >
          {heroData.paragraph}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp as any} className="flex gap-4 mb-8">
          <Link href="/contact">
            <motion.button
              variants={hoverScale as any}
              whileHover="hover"
              whileTap="tap"
              className="relative overflow-hidden bg-transparent text-xl border border-orange-400 text-orange-400 font-semibold px-6 py-3 rounded-md transition-all duration-300 hover:border-orange-500 hover:text-white hover:shadow-[0_0_15px_rgba(251,146,60,0.5)] group"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"></div>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
