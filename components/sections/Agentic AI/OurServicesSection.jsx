"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot, MessageCircle, Share2, Users, Settings, Lightbulb, ArrowRight } from "lucide-react";

const services = [
  {
    title: "AI Agents & Automation",
    icon: Bot,
    color: "text-orange-500",
    desc: "Our custom AI agents take care of all your business operations automatically – from lead generation to follow-up, order processing to reporting – without any human intervention.",
    bullets: [
      "Perform repetitive tasks automatically – 24x7",
      "Make intelligent decisions based on business rules",
      "Integrate with your current system seamlessly",
      "No error, no delay, no manual effort",
      "Easily scalable with business growth"
    ]
  },
  {
    title: "AI Chatbots & Assistants",
    icon: MessageCircle,
    color: "text-orange-500",
    desc: "Intelligent virtual assistants that are always online on your website, app, and messaging platforms, ready to answer questions, generate leads, and book appointments.",
    bullets: [
      "Answer customer queries instantly – round the clock",
      "Capture and qualify leads automatically",
      "Book appointments on your behalf",
      "Tackle FAQs to keep your team busy with complex queries",
      "Multiple languages support"
    ]
  },
  {
    title: "WhatsApp Automation",
    icon: Share2,
    color: "text-orange-500",
    desc: "Advanced WhatsApp automation solutions that send messages, nurture leads, give updates, gather data, and manage customer conversations completely automated.",
    bullets: [
      "Send automatic follow-up messages right away",
      "Update about orders, remind, and notify customers",
      "Gather customer data through chat conversations",
      "Converse without doing anything manually",
      "Launch your own marketing campaign on WhatsApp"
    ]
  },
  {
    title: "CRM Automation",
    icon: Users,
    color: "text-orange-500",
    desc: "Ensure all leads get captured, scored, assigned, and followed up in time. Your sales team will concentrate only on closing deals, not on chasing people.",
    bullets: [
      "Automatically capture leads from any source",
      "Score and prioritize leads for your team",
      "Automatically assign leads appropriately",
      "Send follow-up emails and messages in time",
      "Manage all interactions from one dashboard"
    ]
  },
  {
    title: "Workflow Automation",
    icon: Settings,
    color: "text-orange-500",
    desc: "We map, design and automate all your company's workflows from data entry, approvals, to reporting so that everything works seamlessly without manual effort.",
    bullets: [
      "Stop wasting your time with manual data entry",
      "Automate all approvals and receive instant notifications",
      "Integrate various tools and platforms into one system",
      "Make reports and summaries automatically",
      "Get rid of all human errors from your workflow"
    ]
  },
  {
    title: "AI Consulting",
    icon: Lightbulb,
    color: "text-orange-500",
    desc: "Don't know how to use AI? We help you determine exactly what areas of your business can be optimized through AI to save time and money.",
    bullets: [
      "Complete audit of all business processes",
      "Determine exactly where AI can save you time",
      "Custom AI strategy and roadmap for your company",
      "Practical tool and technology recommendations",
      "Step-by-step guidance and assistance"
    ]
  }
];

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-[460px] md:h-[480px] rounded-[32px] cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Outer shadow/hover wrapper. Does not rotate, but translates Y. 
          transformStyle: preserve-3d ensures the perspective applies to the inner rotating card. */}
      <motion.div
        className="w-full h-full rounded-[32px] bg-transparent"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? [
              "0 10px 20px -5px rgba(0,0,0,0.05)",
              "none",
              "0 25px 40px -10px rgba(249,115,22,0.15)"
            ]
            : [
              "0 25px 40px -10px rgba(249,115,22,0.15)",
              "none",
              "0 10px 20px -5px rgba(0,0,0,0.05)"
            ]
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* 3D Rotating Container */}
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* ================= FRONT FACE ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[32px] border-[1.5px] p-7 sm:p-8 flex flex-col"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--accent)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)"
            }}
          >
            {/* Absolute glow without filter or overflow-hidden */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,rgba(249,115,22,0)_70%)] pointer-events-none rounded-full" />

            <div className="flex items-center gap-5 mb-2 mt-2">
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-[14px] flex items-center justify-center border shadow-sm"
                style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)" }}
              >
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${service.color}`} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                {service.title}
              </h3>
            </div>

            <ul className="space-y-3.5 mb-5">
              {service.bullets.map((bullet, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 shadow-[0_0_6px_rgba(249,115,22,0.6)]" />
                  <span className="font-medium text-[15px] sm:text-[16px] leading-snug" style={{ color: "var(--text-muted)" }}>{bullet}</span>
                </div>
              ))}
            </ul>

            <div className="mt-auto pt-4 border-t flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
              <span className="text-xs sm:text-sm font-bold text-orange-500 uppercase tracking-wide">
                Hover to Explore
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
            </div>
          </div>

          {/* ================= BACK FACE ================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-[32px] bg-gradient-to-br from-orange-500/10 to-transparent border-[1.5px] p-7 sm:p-8 flex flex-col"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--accent)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="flex items-center gap-5 mb-6">
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-[14px] shadow-sm flex items-center justify-center border"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                {service.title}
              </h3>
            </div>

            <div className="flex-1 flex items-center">
              <p className="text-[15px] sm:text-base leading-relaxed font-medium" style={{ color: "var(--text-primary)" }}>
                {service.desc}
              </p>
            </div>

            <div 
              className="mt-auto w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-colors shadow-lg active:scale-95 flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)", color: "white" }}
            >
              Learn More
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function OurServicesSection() {
  return (
    <section className="py-24 px-8 lg:px-16 relative" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Our Agentic AI Services
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Every automation tool your business requires — beautifully designed and engineered under one roof.
          </p>
        </div>

        <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
