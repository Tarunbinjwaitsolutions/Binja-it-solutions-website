"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function RelatedServices({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`related-card-${index}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`related-card-${index}`);
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold theme-text mb-4">Related Services</h2>
            <p className="text-lg theme-text-secondary">Explore other solutions that complement your project.</p>
          </div>
          <Link href="/services/web-app-development" className="inline-flex items-center gap-2 theme-accent font-semibold hover:brightness-110 transition-colors group">
            View All Services
            <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ perspective: "1000px" }}
              className="block outline-none h-full"
            >
              <Link href={service.url} className="block outline-none h-full focus:outline-none">
                <div
                  id={`related-card-${idx}`}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  className="h-full theme-bg-card border theme-border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-[0_8px_30px_color-mix(in_srgb,var(--accent)_10%,transparent)] hover:border-[var(--accent)] group"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div style={{ transform: "translateZ(30px)" }}>
                    <h3 className="text-xl font-bold theme-text mb-4 group-hover:theme-accent transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <div style={{ transform: "translateZ(20px)" }} className="mt-8 flex justify-end">
                    <div className="w-10 h-10 rounded-full theme-bg-alt flex items-center justify-center group-hover:theme-accent-bg group-hover:text-white transition-colors theme-text-secondary">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
