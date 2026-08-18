"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export default function ProblemsWeSolve({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`problem-card-${index}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`problem-card-${index}`);
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section className="py-24 theme-bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold theme-text mb-6">Problems We Solve</h2>
          <p className="text-lg theme-text-secondary leading-relaxed">
            Overcoming the digital hurdles holding your business back.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ perspective: "1000px" }}
            >
              <div
                id={`problem-card-${idx}`}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="h-full theme-bg-card border theme-border rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all duration-300 ease-out hover:shadow-[0_8px_30px_color-mix(in_srgb,var(--accent)_10%,transparent)] hover:border-[var(--accent)]"
              >
                <div style={{ transform: "translateZ(30px)" }} className="flex flex-col sm:flex-row w-full gap-6 items-center">
                  
                  {/* Problem */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 text-red-500">
                      <AlertTriangle size={20} />
                      <span className="font-semibold text-sm tracking-wide uppercase">The Problem</span>
                    </div>
                    <p className="theme-text font-medium">{item.problem}</p>
                  </div>

                  {/* Arrow separator (hidden on mobile, visible on sm+) */}
                  <div className="hidden sm:flex theme-text-muted">
                    <ArrowRight size={24} />
                  </div>

                  {/* Solution */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 theme-accent">
                      <CheckCircle2 size={20} />
                      <span className="font-semibold text-sm tracking-wide uppercase">Our Solution</span>
                    </div>
                    <p className="theme-text-secondary">{item.solution}</p>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
