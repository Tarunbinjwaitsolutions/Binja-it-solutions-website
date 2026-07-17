"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, CheckCircle2, ArrowRight } from "lucide-react";

const dashboard = "/assets/images/dashboard.png";

const WebDevDetail = () => {
  const solutions = [
    {
      problem: "Slow, outdated legacy sites",
      solution:
        "High-performance React-based architectures for instant load times.",
    },
    {
      problem: "Fragmented business data",
      solution:
        "Custom Admin Dashboards & Portals to centralize your operations.",
    },
    {
      problem: "Poor mobile experience",
      solution:
        "Responsive UI/UX implementation ensuring a seamless look on any device.",
    },
    {
      problem: "Manual repetitive tasks",
      solution:
        "API integrations and SaaS platforms that automate your digital workflow.",
    },
  ];

  return (
    <section id="web-dev" className="py-12 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-16">
        {/* Left: Content & Problem Solver */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl border shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
              <Globe size={28} />
            </div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">
              Web Application Development
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
            We don't just build websites,we build{" "}
            <span className="text-orange-600">Business Engines.</span>
          </h2>

          <p className="text-lg mb-10 leading-relaxed italic" style={{ color: "var(--text-muted)" }}>
            In today's digital economy, your website is your hardest-working
            employee. We solve your growth bottlenecks by developing custom web
            applications that are scalable, secure, and intuitive.
          </p>

          <div className="space-y-6">
            {solutions.map((item, idx) => (
              <div
                key={idx}
                className="group p-5 rounded-2xl border hover:bg-orange-50/30 transition-all" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-orange-500">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tighter mb-1" style={{ color: "var(--text-muted)" }}>
                      The Problem: {item.problem}
                    </p>
                    <p className="text-base font-medium" style={{ color: "var(--text-primary)" }}>
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Visual Element */}
        <div className="lg:w-1/2 relative lg:sticky lg:top-24 lg:self-stretch">
          <div className="relative z-10  rounded-[2.5rem] overflow-hidden">
            {/* Context: Highlighting your work like DreamWheel or SwasthFit backend */}
            <img
              src={dashboard}
              alt="Web Development Dashboard"
              className="w-full h-full object-contain object-top scale-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
            {/* Floating Tech Badge */}
            <div className="absolute bottom-6 right-6 backdrop-blur-md p-4 rounded-2xl shadow-xl border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
              <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-2">
                Core Tech Stack
              </p>
              <div className="flex gap-3 font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                <span>React</span>
                <span className="text-neutral-300">|</span>
                <span>Node.js</span>
                <span className="text-neutral-300">|</span>
                <span>MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebDevDetail;
