"use client";
import React from "react";
import { motion } from "framer-motion";
const office = "/assets/images/office.jpeg";
const img2 = "/assets/images/img2.jpg";
const img3 = "/assets/images/img3.jpg";

const aboutHeroData = {
  headline: "Empowering Brands through Innovation and Technical Precision",
  subtext:
    "We bridge the gap between creative vision and complex digital architecture. From design excellence to AI automation, we build the future of business.",
  ctaText: "Explore Our Journey",
  // Using your asset names from previous components
  images: [
    {
      src: img3,
      alt: "Team Collaboration",
    },
    {
      src: office,
      alt: "Development Focus",
    },
    {
      src: img2,
      alt: "Creative Planning",
    },
  ],
};

const AboutHero = () => {
  return (
    <section className="relative w-full pt-40 md:min-h-screen overflow-hidden flex items-center py-16 px-8 lg:px-16" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <h1 className="text-2xl md:text-5xl font-serif font-bold mb-8" style={{ color: "var(--text-primary)" }}>
            About <span className="text-orange-500 ">Binjwa IT Solutions</span>{" "}
            <br />
            with Vision and <br />
            Scalability
          </h1>
          <p className="text-xl leading-relaxed max-w-xl mb-10" style={{ color: "var(--text-muted)" }}>
            {aboutHeroData.subtext}
          </p>
          {/* <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-200">
            {aboutHeroData.ctaText}
          </button> */}
        </motion.div>

        {/* Right Image Collage */}
        <div className="relative h-87.5 md:h-150 w-full">
          {/* Decorative Connecting Lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            viewBox="0 0 400 400"
          >
            <path
              d="M50,100 L350,50 M350,50 L300,350 M50,100 L150,300"
              stroke="var(--text-primary)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="50" cy="100" r="3" fill="var(--text-primary)" />
            <circle cx="350" cy="50" r="3" fill="var(--text-primary)" />
            <circle cx="150" cy="300" r="3" fill="var(--text-primary)" />
          </svg>

          {/* Top Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-0 right-0 w-2/3 md:w-3/5 aspect-video rounded-2xl overflow-hidden border-4 z-20"
            style={{ borderColor: "var(--border)" }}
          >
            <img
              src={aboutHeroData.images[0].src}
              className="w-full h-full object-cover"
              alt="Teamwork"
            />
          </motion.div>

          {/* Middle Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-16 md:top-1/4 left-0 w-1/2 aspect-square rounded-2xl overflow-hidden border-4 z-10"
            style={{ borderColor: "var(--border)" }}
          >
            <img
              src={aboutHeroData.images[1].src}
              className="w-full h-full object-cover"
              alt="Coding"
            />
          </motion.div>

          {/* Bottom Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-0 md:bottom-0 right-10 w-1/2 aspect-square rounded-2xl overflow-hidden border-4 border-white z-30"
          >
            <img
              src={aboutHeroData.images[2].src}
              className="w-full h-full object-cover"
              alt="Planning"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
