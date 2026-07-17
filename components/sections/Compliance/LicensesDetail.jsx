"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileCheck, CheckCircle2 } from "lucide-react";
const Concept = "/assets/images/Concept.png";

export default function LicensesDetail() {
  const licensePoints = [
    {
      label: "FSSAI Food License",
      detail: "Mandatory certification for safe, legal food operations.",
    },
    {
      label: "MSME / Udyam",
      detail: "Register to unlock corporate subsidies and bank benefits.",
    },
    {
      label: "ISO Certification",
      detail: "Global standards to build trust and quality credibility.",
    },
    {
      label: "Trademark Registration",
      detail: "Defend your logo, brand name, and unique assets.",
    },
    {
      label: "Trade License",
      detail: "Municipal permissions required to operate open shop floors.",
    },
    {
      label: "DSC Services",
      desc: "Secure digital signatures required for all modern e-filings.",
    },
  ];

  return (
    <section
      id="licenses"
      className="py-12 px-8 lg:px-16 transition-colors duration-300 scroll-mt-20" style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16">
        {/* Left Visual */}
        <div className="lg:w-1/2 relative lg:sticky lg:top-24 order-2 lg:order-1">
          <div className="absolute -inset-10 bg-amber-500/5 rounded-full blur-3xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 shadow-2xl" style={{ borderColor: "var(--border)" }}
          >
            <img
              src={Concept}
              alt="Compliance Certification"
              className="w-full h-auto object-cover aspect-video grayscale-[0.2] hover:grayscale-0 transition-all"
            />
          </motion.div>
        </div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2 order-1 lg:order-2"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500 shadow-sm">
              <FileCheck size={28} />
            </div>
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">
              Licenses & Certification
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
            Get the green light <br />
            <span className="text-amber-600">to scale globally.</span>
          </h2>

          <p className="text-lg mb-10 leading-relaxed italic" style={{ color: "var(--text-muted)" }}>
            Missing a single certification can stall your business for months.
            We solve the licensing bottleneck by managing your operational
            permits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {licensePoints.map((item, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-2xl flex items-start gap-3" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <CheckCircle2
                  className="text-amber-600 shrink-0 mt-0.5"
                  size={18}
                />
                <div>
                  <h4 className="font-bold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {item.label}
                  </h4>
                  <p className="text-xs leading-normal" style={{ color: "var(--text-muted)" }}>
                    {item.detail || item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
