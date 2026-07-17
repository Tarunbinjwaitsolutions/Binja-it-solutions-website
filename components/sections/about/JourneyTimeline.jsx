"use client";
import React from "react";
import { motion } from "framer-motion";

const journeyData = [
  {
    year: "2024",
    title: "Foundation & Early Innovation",
    description:
      "Built the technical foundation by mastering MERN stack excellence and launching early 3D interactive property platforms like Weblite.",
    image: "/assets/images/chooseimage1.jpg",
    side: "right",
  },
  {
    year: "2025",
    title: "DreamWheel & Scalable Architectures",
    description:
      "Engineered the DreamWheel project using React and Node.js, establishing a reputation for high-performance digital ecosystems.",
    image: "/assets/images/chooseimage2.jpg",
    side: "left",
  },
  {
    year: "2025",
    title: "Strategic Academic Milestone",
    description:
      "Completed Post Graduate Diploma in Management (PGDM) in Information Technology from MIT Pune, blending business strategy with tech.",
    image: "/assets/images/type-4.png",
    side: "right",
  },
  {
    year: "2026",
    title: "Leadership & Technical Growth",
    description:
      "Served as Technical Lead at Archism Technologies, overseeing complex deployments and managing high-level software engineering teams.",
    image: "/assets/images/Hire-our-people.jpg",
    side: "left",
  },
];

const JourneyTimeline = () => {
  return (
    <section className="py-12 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            Evolution
          </motion.p>
          <h2 className="text-4xl leading-tight font-serif font-bold">
            Our Journey
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent to-transparent transform -translate-x-1/2 hidden lg:block" style={{ backgroundColor: "var(--border)" }} />

          <div className="flex flex-col gap-10 lg:gap-0">
            {journeyData.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-center w-full lg:mb-32 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`lg:w-1/2 flex flex-col ${item.side === "left" ? "lg:items-end lg:text-right lg:pr-16" : "lg:items-start lg:text-left lg:pl-16"}`}
                >
                  <span className="text-orange-500 font-bold font-serif text-3xl mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg leading-relaxed max-w-md" style={{ color: "var(--text-muted)" }}>
                    {item.description}
                  </p>
                </motion.div>

                {/* Circular Image Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  viewport={{ once: true }}
                  className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden lg:block"
                >
                  <div className="w-24 h-24 rounded-full border-4 overflow-hidden" style={{ borderColor: "var(--border)" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </motion.div>

                {/* Mobile Image (Visible only on small screens) */}
                <div className="lg:hidden mt-8">
                  <div className="w-32 h-32 rounded-full border-4 border-white/10 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="lg:w-1/2 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
