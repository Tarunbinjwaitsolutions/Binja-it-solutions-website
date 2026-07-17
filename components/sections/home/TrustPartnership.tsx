"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface TrustItem {
  title: string;
  description: string;
}

const trustData: TrustItem[] = [
  {
    title: "One-Stop Solution for Businesses",
    description: "From technology, AI and marketing services to compliance, we have got everything covered under one roof",
  },
  {
    title: "Automation through AI",
    description: "Utilizing latest AI-driven automation along with best industry practices for your business to keep pace ahead",
  },
  {
    title: "Professional Experts",
    description: "Team having different experiences in technology, taxation, compliance and digital marketing",
  },
  {
    title: "Transparent Communication",
    description: "Project execution with clear timelines, transparent communication and no surprise expenses",
  },
  {
    title: "Economical & Scalable Solutions",
    description: "Services based on your requirements to give your business that extra edge",
  },
  {
    title: "Long Term Support",
    description: "Not just during project completion, but also post-completion support",
  },
];

const TrustPartnership: React.FC = () => {
  return (
    <section className="py-16 px-8 lg:px-16 transition-colors duration-300" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp as any}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Why Businesses Trust &amp; Partner With <span className="text-orange-500">Binjwa IT Solutions</span>
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            In Binjwa IT Solutions, our services are not only technological but we make sure that we work alongside you as your partner in development and growth. We have certain aspects which make us stand out:
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {trustData.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp as any}
              whileHover={{ scale: 1.03, y: -5 }}
              className="flex gap-4 items-start p-6 rounded-xl shadow-sm border border-neutral-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] group relative overflow-hidden"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="text-orange-500 shrink-0 mt-1 transition-transform group-hover:scale-110" size={24} />
              </motion.div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors duration-300">{item.title}</h3>
                <p className="leading-relaxed text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp as any}
          className="text-center"
        >
          <p className="text-lg italic font-medium" style={{ color: "var(--text-secondary)" }}>
            Partner with Binjwa IT Solutions and transform challenges into opportunities — with solutions designed to accelerate growth, enhance efficiency, and create lasting business value.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustPartnership;
