"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FinalCTA({ data }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden theme-bg-secondary" ref={ref}>
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.5 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold theme-text mb-6 leading-tight">
            {data.heading}
          </h2>
          <p className="text-xl theme-text-secondary mb-10 max-w-2xl mx-auto">
            {data.subtext}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center h-14 px-10 text-lg font-semibold theme-accent-bg hover:brightness-110 text-white rounded-full transition-all w-full sm:w-auto shadow-lg hover:shadow-[0_4px_20px_color-mix(in_srgb,var(--accent)_40%,transparent)] hover:-translate-y-0.5">
              Book Your Demo
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center h-14 px-10 text-lg font-semibold bg-transparent hover:theme-bg-alt theme-text border-2 theme-border rounded-full transition-all w-full sm:w-auto hover:-translate-y-0.5">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
