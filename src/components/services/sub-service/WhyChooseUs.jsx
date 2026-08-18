"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 theme-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold theme-text mb-6">Why Choose Binjwa IT Solutions?</h2>
            <p className="text-lg theme-text-secondary leading-relaxed mb-8">
              We don't just build software; we build partnerships. Our commitment to quality, transparency, and innovation ensures your project is in the best hands.
            </p>
            <ul className="space-y-4">
              {data.map((usp, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg font-medium theme-text">
                  <CheckCircle className="theme-accent shrink-0" size={24} />
                  {usp}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 opacity-10 blur-[80px] rounded-[40px] pointer-events-none" style={{ backgroundColor: 'var(--accent)' }} />
            <div className="relative theme-bg-card rounded-3xl p-8 border theme-border shadow-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Team"
                width={800}
                height={500}
                className="w-full h-auto rounded-2xl object-cover mix-blend-overlay dark:mix-blend-normal opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
