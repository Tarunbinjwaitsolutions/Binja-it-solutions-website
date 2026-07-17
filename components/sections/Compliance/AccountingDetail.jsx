"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  BarChart3,
  Landmark,
  Calculator,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
const wer = "/assets/images/wer.jpg";

export function AccountingDetail() {
  const accountingServices = [
    {
      title: "Accounting & Bookkeeping",
      desc: "Daily ledger maintenance and error-free cash flow tracking.",
      icon: <Calculator size={18} />,
    },
    {
      title: "Audit Services",
      desc: "Independent internal and statutory audits to verify records.",
      icon: <ShieldCheck size={18} />,
    },
    {
      title: "Financial Statement Preparation",
      desc: "P&L accounts, balance sheets, and cash flow reports generated instantly.",
      icon: <Landmark size={18} />,
    },
    {
      title: "Project Report for Loans",
      desc: "High-conviction CMA data and reports optimized for bank approvals.",
      icon: <BarChart3 size={18} />,
    },
    {
      title: "CA Consultation Services",
      desc: "On-demand strategic advice for tax savings and business structure planning.",
      icon: <UserCheck size={18} />,
    },
  ];

  return (
    <section
      className="py-12 px-8 lg:px-16 scroll-mt-20"
      style={{ backgroundColor: "var(--bg-alt)", color: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center lg:items-start gap-16">
        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl text-amber-600 shadow-sm" style={{ backgroundColor: "var(--bg-primary)" }}>
              <BookOpen size={28} />
            </div>
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">
              Accounting & Finance
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
            Clear financials. <br />
            <span className="text-amber-600">Confident decisions.</span>
          </h2>

          <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            We solve the "black hole" of business spending. Our professional
            financial management and consulting services provide a 360-degree
            view of your standing, making loan approvals and regulatory audits
            effortless.
          </p>

          {/* Clean, detailed list layout */}
          <div className="space-y-3">
            {accountingServices.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl border shadow-sm transition-all hover:border-amber-300" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="text-amber-600 shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <span className="font-bold text-sm block mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </span>
                  <p className="text-xs leading-tight" style={{ color: "var(--text-muted)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Left Visual */}
        <div className="lg:w-1/2 relative lg:sticky lg:top-20">
          <div className="absolute -inset-10 bg-amber-500/5 rounded-full blur-3xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="rounded-[2.5rem] overflow-hidden border-8 shadow-2xl" style={{ borderColor: "var(--border)" }}>
              <img
                src={wer}
                alt="Accounting Dashboard"
                className="w-full h-auto object-cover aspect-video"
              />
            </div>

            {/* Floating Metric Badge */}
            <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl shadow-xl border" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", borderColor: "var(--border)" }}>
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">
                Audit Readiness
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-sm font-bold">100% Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
