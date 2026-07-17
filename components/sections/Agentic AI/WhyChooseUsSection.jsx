"use client";
import React from "react";
import { motion } from "framer-motion";
import { Ear, Wrench, Receipt, Building2, CalendarCheck, Handshake } from "lucide-react";

const reasons = [
  {
    title: "Listening Comes First",
    desc: "Before we build anything, we invest time into getting to know everything about your company – its processes, problems, and objectives. Everything that we do revolves around your specific needs.",
    icon: Ear
  },
  {
    title: "100% Custom Built",
    desc: "We don't sell you a finished product and say nothing more. Every single artificial intelligence solution that we develop is bespoke in nature – tailored specifically for your company.",
    icon: Wrench
  },
  {
    title: "Upfront & Transparent Pricing",
    desc: "There will be no surprises on any invoice ever sent to you by our agency. What you see upfront is what you get. We'll show you the exact cost of our services before you buy them.",
    icon: Receipt
  },
  {
    title: "Start-ups to Enterprises",
    desc: "No matter if you're a startup or an enterprise, our artificial intelligence solutions will work at all scales and develop along with you as your demands change.",
    icon: Building2
  },
  {
    title: "Guaranteed Delivery",
    desc: "We plan a clear timeline of completion and we always respect it. With us, you can forget about delays or mysterious absence; you will always have a clear picture of how things progress.",
    icon: CalendarCheck
  },
  {
    title: "Long-Term AI Partner",
    desc: "We won't leave after delivering a project; we will continue to optimize it together with you as your company evolves and faces new challenges.",
    icon: Handshake
  }
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 px-8 lg:px-16" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Why Businesses Hire Us
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            We are more than just developers; we are your strategic partners in the age of Agentic AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.1)] hover:-translate-y-1 transition-all duration-300 border hover:border-orange-500/50"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors duration-300 pointer-events-none" />
                
                <div className="relative z-10">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                    {reason.title}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: "var(--text-muted)" }}>
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
