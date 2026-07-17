"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Zap,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
const mob = "/assets/images/mob.png";

const MobileDevDetail = () => {
  const problemSolvers = [
    {
      title: "Fragmented User Reach",
      desc: "We build high-performance cross-platform apps that ensure your brand looks and feels consistent on both Android and iOS devices.",
      icon: <Smartphone className="text-orange-500" size={24} />,
    },
    {
      title: "Delayed User Engagement",
      desc: "Integration of real-time features and push notifications to keep your users connected and informed the second something happens.",
      icon: <Zap className="text-orange-500" size={24} />,
    },
    {
      title: "Security & Trust Risks",
      desc: "Implementation of secure biometric authentication and encrypted data handling to protect your users' most sensitive information.",
      icon: <ShieldCheck className="text-orange-500" size={24} />,
    },
    {
      title: "Stagnant Performance",
      desc: "Continuous maintenance and support cycles to ensure your application stays compatible with the latest OS updates and hardware.",
      icon: <RefreshCw className="text-orange-500" size={24} />,
    },
  ];

  return (
    <section
      id="mobile-dev"
      className="py-12 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center lg:items-stretch gap-10 xl:gap-12">
        {/* Left Content: The Problem/Solution Messaging */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-[48%]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl border shadow-sm" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
              <Smartphone size={28} />
            </div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">
              Mobile App Development
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
            Put your business in the <br />
            <span className="text-orange-600">palm of their hand.</span>
          </h2>

          <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Mobile accessibility isn't just an option,it's where your customers
            live. We specialize in building scalable applications that combine
            native performance with seamless cross-platform efficiency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problemSolvers.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow transition-colors duration-300" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="mb-4">{item.icon}</div>
                <h4 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Visual Side */}
        <div className="lg:w-[52%] relative lg:sticky lg:top-24 lg:self-stretch flex items-center">
          {/* Decorative Background Element */}
          <div className="absolute -inset-10 " />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-none mx-auto"
          >
            {/* Main Mockup Container */}
            <div className="bg-transparent w-full overflow-hidden aspect-square">
              <img
                src={mob}
                alt="Mobile App Interface"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Floating UI Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-4 left-4 p-4 rounded-2xl shadow-xl border border-neutral-100 hidden md:block" style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-xs font-bold text-neutral-700">
                  Verified Secure
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-4 right-4 p-4 rounded-2xl shadow-xl border border-neutral-100 hidden md:block" style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">
                Performance
              </p>
              <p className="text-sm font-bold text-neutral-900">99.9% Uptime</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileDevDetail;
