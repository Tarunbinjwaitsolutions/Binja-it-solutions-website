"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function OurProcess({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 theme-bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-bold theme-text mb-6">Our Process</h2>
          <p className="text-lg theme-text-secondary leading-relaxed">
            A proven methodology to deliver results on time and within budget.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 theme-border -translate-y-1/2 border-t-2 border-dashed" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {data.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative text-center"
              >
                {/* Step Circle */}
                <div className="relative z-10 w-16 h-16 mx-auto theme-bg-card rounded-full border-4 theme-border flex items-center justify-center text-xl font-bold theme-accent mb-6 shadow-lg" style={{ borderColor: 'var(--accent)', boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                  {idx + 1}
                </div>
                
                <h3 className="text-xl font-bold theme-text mb-3">{step.title}</h3>
                <p className="theme-text-secondary text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
