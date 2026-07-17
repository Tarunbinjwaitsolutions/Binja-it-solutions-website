"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Briefcase, Smile, Calendar, Star, Headphones, LucideIcon } from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

const statsData = {
  headline: "Our Achievements",
  stats: [
    { icon: Briefcase, value: 30, suffix: "+", label: "Projects Delivered", description: "Successfully delivered tailored solutions for various clients." },
    { icon: Smile, value: 50, suffix: "+", label: "Happy Clients", description: "Building strong relationships across industries." },
    { icon: Calendar, value: 2025, prefix: "Since ", label: "In Business", description: "Continuously innovating and growing." },
    { icon: Star, value: 98, suffix: "%", label: "Client Satisfaction", description: "Our commitment to excellence is reflected in our client feedback." },
    { icon: Headphones, value: 24, suffix: "/7", label: "Support Available", description: "We provide round-the-clock support for our partners." },
  ] as StatItem[],
};

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, prefix = "", suffix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
          }
        }
      });
    }
  }, [isInView, value, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

const StatsSection: React.FC = () => {
  return (
    <section className="relative py-20 px-6 sm:px-8 lg:px-16 transition-colors duration-300 overflow-hidden" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>

      {/* Abstract Background Blobs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp as any}
          className="flex flex-col items-center text-center pb-14"
        >
          <div className="h-1.5 w-16 bg-orange-500 mb-6 rounded-full" />
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
            {statsData.headline}
          </h2>
        </motion.div>

        {/* 3 cards top row, 2 cards centered bottom row */}
        <motion.div
          variants={staggerContainer as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {statsData.stats.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp as any}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-8 rounded-[24px] backdrop-blur-xl transition-all duration-300 ease-out cursor-pointer group flex flex-col relative overflow-hidden"
              style={{
                backgroundColor: "var(--stat-card-bg)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
              }}
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-orange-500 rounded-[24px] shadow-[0_0_25px_rgba(249,115,22,0.3)]"></div>

              <div className="flex flex-col h-full relative z-10">
                {/* Icon */}
                <div className="w-13 h-13 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300 shadow-sm border border-orange-500/20 group-hover:border-transparent">
                  <item.icon className="w-8 h-8 text-orange-500 group-hover:text-white transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
                </div>

                {/* Numbers */}
                <h6 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight group-hover:text-orange-500 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
                  <AnimatedNumber value={item.value} prefix={item.prefix} suffix={item.suffix} />
                </h6>

                {/* Label & Description */}
                <p className="text-orange-500 font-bold mb-3 uppercase tracking-wider text-sm">
                  {item.label}
                </p>
                <p className="leading-relaxed text-sm md:text-base font-medium opacity-80" style={{ color: "var(--text-primary)" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
