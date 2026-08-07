"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PenTool, Code, Smartphone, Database, Gauge, LineChart } from "lucide-react";

const getIcon = (name) => {
  switch (name) {
    case "PenTool": return <PenTool className="w-8 h-8 theme-accent" />;
    case "Code": return <Code className="w-8 h-8 theme-accent" />;
    case "Smartphone": return <Smartphone className="w-8 h-8 theme-accent" />;
    case "Database": return <Database className="w-8 h-8 theme-accent" />;
    case "Gauge": return <Gauge className="w-8 h-8 theme-accent" />;
    case "LineChart": return <LineChart className="w-8 h-8 theme-accent" />;
    default: return <Code className="w-8 h-8 theme-accent" />;
  }
};

export default function WhatsIncluded({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`included-card-${index}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`included-card-${index}`);
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section className="py-24 theme-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold theme-text mb-6">What's Included</h2>
          <p className="text-lg theme-text-secondary leading-relaxed">
            Everything you need for a complete digital solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ perspective: "1000px" }}
            >
              <div
                id={`included-card-${idx}`}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="h-full theme-bg-card border theme-border rounded-2xl p-8 flex flex-col transition-all duration-300 ease-out group hover:shadow-[0_8px_30px_color-mix(in_srgb,var(--accent)_15%,transparent)] hover:border-[var(--accent)]"
              >
                <div style={{ transform: "translateZ(30px)" }}>
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl font-bold theme-text group-hover:theme-accent transition-colors">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
