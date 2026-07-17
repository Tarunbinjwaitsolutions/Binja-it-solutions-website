"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, HeartPulse, GraduationCap, CircleDollarSign, ShoppingCart, Factory, Rocket, Briefcase } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface Industry {
  name: string;
  icon: React.ReactElement;
}

const industries: Industry[] = [
  { name: "Real Estate", icon: <Building2 size={32} /> },
  { name: "Healthcare", icon: <HeartPulse size={32} /> },
  { name: "Education", icon: <GraduationCap size={32} /> },
  { name: "Finance", icon: <CircleDollarSign size={32} /> },
  { name: "E-commerce", icon: <ShoppingCart size={32} /> },
  { name: "Manufacturing", icon: <Factory size={32} /> },
  { name: "Startups", icon: <Rocket size={32} /> },
  { name: "Professional Services", icon: <Briefcase size={32} /> },
];

const IndustriesWeServe: React.FC = () => {
  return (
    <section className="py-16 px-8 lg:px-16 transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp as any}
          className="text-3xl md:text-4xl font-bold leading-tight mb-12"
          style={{ color: "var(--text-primary)" }}
        >
          Industries We Serve
        </motion.h2>
        <motion.div variants={staggerContainer as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={fadeInUp as any}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative flex flex-col items-center justify-center p-8 rounded-xl border transition-all cursor-pointer group overflow-hidden"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-orange-400/0 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="relative z-10 group-hover:text-orange-500 transition-colors mb-4"
                style={{ color: "var(--accent)" }}
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {industry.icon}
              </motion.div>
              <h3 className="relative z-10 font-semibold transition-colors duration-300 group-hover:text-orange-500" style={{ color: "var(--text-primary)" }}>{industry.name}</h3>
              {/* Animated glowing border effect */}
              <div className="absolute inset-0 border-2 border-orange-500 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 shadow-[0_0_15px_rgba(249,115,22,0.4)] pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
