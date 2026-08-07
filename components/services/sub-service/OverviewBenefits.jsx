"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Smartphone, Search, Layers, ShieldCheck } from "lucide-react";

const getIcon = (name) => {
  switch (name) {
    case "Zap": return <Zap className="w-8 h-8 theme-accent" />;
    case "Smartphone": return <Smartphone className="w-8 h-8 theme-accent" />;
    case "Search": return <Search className="w-8 h-8 theme-accent" />;
    case "Layers": return <Layers className="w-8 h-8 theme-accent" />;
    case "ShieldCheck": return <ShieldCheck className="w-8 h-8 theme-accent" />;
    default: return <Zap className="w-8 h-8 theme-accent" />;
  }
};

export default function OverviewBenefits({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`benefit-card-${index}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`benefit-card-${index}`);
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
          <h2 className="text-3xl lg:text-4xl font-bold theme-text mb-6">Overview & Benefits</h2>
          <p className="text-lg theme-text-secondary leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ perspective: "1000px" }}
            >
              <div
                id={`benefit-card-${idx}`}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="h-full theme-bg-card border theme-border rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 ease-out hover:shadow-[0_8px_30px_color-mix(in_srgb,var(--accent)_15%,transparent)] hover:border-[var(--accent)]"
              >
                <div style={{ transform: "translateZ(30px)" }}>
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
                    {getIcon(benefit.icon)}
                  </div>
                  <h3 className="text-lg font-bold theme-text">{benefit.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
