"use client";
import React from "react";
import { motion } from "framer-motion";

const img1 = "/assets/images/img1.jpg";

const missionData = {
  mission: {
    title: "Our Mission",
    content:
      "At Binjwa IT Solutions, we deliver digital solutions, AI automation, and end-to-end business support, from web development to legal compliance, helping businesses scale with smart technology and seamless execution.",
  },
  values: {
    title: "Our Value",
    content:
      "We set a standard for technical excellence by integrating industry-leading frameworks with seamless user experiences. Leveraging a background in Information Technology and full-stack engineering, we help organizations worldwide scale with confidence and clarity.",
  },
  image: img1, // Reference to your existing image assets
};

const MissionValues = () => {
  return (
    <section className="py-16 px-8 lg:px-16" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Column - Image with Decorative Lines */}
        <div className="lg:w-1/2 relative">
          {/* Decorative Connecting Lines - Matching image_99405b.png style */}
          <div className="absolute -top-10 -left-10 w-full h-full pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <line
                x1="20"
                y1="50"
                x2="80"
                y2="120"
                stroke="var(--text-primary)"
                strokeWidth="1"
              />
              <line
                x1="10"
                y1="200"
                x2="100"
                y2="180"
                stroke="var(--text-primary)"
                strokeWidth="1"
              />
              <line
                x1="380"
                y1="350"
                x2="320"
                y2="300"
                stroke="var(--text-primary)"
                strokeWidth="1"
              />
              <circle cx="20" cy="50" r="3" fill="var(--text-primary)" />
              <circle cx="10" cy="200" r="3" fill="var(--text-primary)" />
              <circle cx="380" cy="350" r="3" fill="var(--text-primary)" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-4xl overflow-hidden border-4 z-10" style={{ borderColor: "var(--border)" }}
          >
            <img
              src={missionData.image}
              alt="Strategic Planning"
              className="w-full h-90 md:h-112.5 object-cover"
            />
          </motion.div>
        </div>

        {/* Right Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 flex flex-col gap-10"
        >
          <div>
            <h2 className="text-4xl font-bold leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
              {missionData.mission.title}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {missionData.mission.content}
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
              {missionData.values.title}
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {missionData.values.content}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionValues;
