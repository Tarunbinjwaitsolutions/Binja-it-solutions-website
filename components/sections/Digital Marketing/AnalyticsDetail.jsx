"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  CalendarDays,
  Target,
  TrendingUp,
} from "lucide-react";

const Analytics = "/assets/images/Analytics.png"; // Rename or swap asset if needed

export default function SocialMediaDetail() {
  const platformTools = [
    {
      name: "Profile Optimization & Branding (SMO)",
      desc: "Maximizing organic discovery and establishing cohesive brand profiles.",
      icon: <Sparkles className="text-orange-500" />,
    },
    {
      name: "Content Strategy & Scheduling",
      desc: "Creating high-engagement asset pipelines scheduled for peak traffic.",
      icon: <CalendarDays className="text-orange-500" />,
    },
    {
      name: "Meta & Paid Ad Campaigns (SMM)",
      desc: "Precision audience targeting and hyper-optimized scaling on FB & IG.",
      icon: <Target className="text-orange-500" />,
    },
    {
      name: "Audience Engagement & Growth Tracking",
      desc: "Monitoring key engagement trends to compound community growth.",
      icon: <TrendingUp className="text-orange-500" />,
    },
  ];

  return (
    <section
      id="platforms-domainplatforms-domain"
      className="py-12 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center lg:items-start gap-16">
        {/* Visual Content */}
        <div className="lg:w-1/2 relative lg:sticky lg:top-24">
          <div className="absolute -inset-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div>
              <img
                src={Analytics}
                alt="Social Media Performance Dashboard"
                className="w-full h-auto"
              />
            </div>

            {/* Floating Metric Badge */}
            <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl border" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", borderColor: "var(--border)" }}>
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">
                Audience Growth
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>+34.2%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-50 rounded-xl text-orange-500 shadow-sm">
              <Users size={28} />
            </div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">
              SMO & SMM Operations
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
            Dominate the feed with <br />
            <span className="text-orange-600">Strategic Management.</span>
          </h2>

          <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Inconsistent posting and unoptimized profiles waste organic reach.
            We solve the audience retention bottleneck through tactical search
            optimization (SMO) coupled with performance-focused ad deployments
            (SMM).
          </p>

          <div className="space-y-4">
            {platformTools.map((tool, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 p-4 rounded-xl border hover:bg-orange-50/30 transition-all" style={{ borderColor: "var(--border)" }}
              >
                <div className="p-3 rounded-lg shadow-sm border" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}>
                  {React.cloneElement(tool.icon, { size: 20 })}
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                    {tool.name}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
