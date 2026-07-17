"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface PortfolioItem {
  clientName: string;
  problem: string;
  solution: string;
  results: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    clientName: "TechNova Solutions",
    problem: "Outdated CRM resulting in slow lead tracking and high drop-off rates.",
    solution: "Developed a custom Agentic AI CRM system with automated workflows.",
    results: "35% increase in lead conversion and 50% reduction in manual tracking.",
  },
  {
    clientName: "GreenLeaf E-commerce",
    problem: "Poor mobile performance and complicated checkout process.",
    solution: "Redesigned the frontend using modern web technologies and optimized the payment gateway.",
    results: "200% increase in mobile sales within the first two months.",
  },
  {
    clientName: "Apex Healthcare",
    problem: "Manual patient scheduling leading to operational bottlenecks.",
    solution: "Implemented an AI-driven smart scheduling application with WhatsApp integration.",
    results: "Saved 20 hours a week in administrative tasks and improved patient satisfaction.",
  },
];

const Portfolio: React.FC = () => {
  return (
    <section className="py-16 px-8 lg:px-16 bg-transparent" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp as any}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
            Portfolio
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Discover how we have helped businesses overcome their digital challenges with tailored solutions.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp as any}
              whileHover={{ scale: 1.05, y: -10 }}
              className="rounded-2xl shadow-sm hover:shadow-[0_15px_30px_rgba(249,115,22,0.1)] border border-neutral-100 p-8 flex flex-col h-full transition-all duration-300 group overflow-hidden relative"
              style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <h3 className="text-xl font-bold mb-6 pb-4 border-b transition-colors duration-300 group-hover:text-orange-500 relative z-10" style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}>
                {item.clientName}
              </h3>

              <div className="flex-grow space-y-4 relative z-10">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: "var(--text-subtle)" }}>Problem</p>
                  <p className="text-sm transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>{item.problem}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: "var(--text-subtle)" }}>Solution</p>
                  <p className="text-sm transition-colors duration-300" style={{ color: "var(--text-secondary)" }}>{item.solution}</p>
                </div>
                <div className="p-4 rounded-lg mt-4 border transition-colors duration-300 group-hover:bg-orange-50/10 group-hover:border-orange-500/30" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <p className="text-xs uppercase tracking-wider font-semibold mb-1 transition-colors duration-300" style={{ color: "var(--accent)" }}>Results</p>
                  <p className="text-sm font-medium transition-colors duration-300" style={{ color: "var(--text-primary)" }}>{item.results}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
