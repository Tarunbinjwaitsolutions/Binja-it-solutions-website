"use client";
import React from "react";
import { motion } from "framer-motion";
const tax = "/assets/images/tax.jpg";

export default function ComplianceHero() {
  return (
    <section className="relative pt-30 md:pt-0 py-12 px-8 lg:px-16 overflow-hidden flex lg:h-screen justify-center items-center" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-500 font-bold tracking-widest uppercase text-xs">
              Legal & Financial Precision
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Compliance <br />
            <span style={{ color: "var(--text-muted)" }}>& Tax Solutions</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-xl" style={{ color: "var(--text-muted)" }}>
            Navigate the complexities of business law and taxation with ease.
            From GST filing to legal documentation, we ensure your business
            stays compliant and audit-ready.
          </p>
        </motion.div>

        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0  blur-[120px] rounded-full" />
          <img
            src={tax}
            alt="Financial Compliance"
            className="relative z-10 rounded-4xl "
          />
        </div>
      </div>
    </section>
  );
}
