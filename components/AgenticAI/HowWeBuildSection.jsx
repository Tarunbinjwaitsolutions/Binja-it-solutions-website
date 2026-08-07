"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MessageCircle, Target, Code, CheckCircle, Rocket, Headset } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Free Consultation & Discovery",
    desc: "First, we learn more about your company — its processes, structure, and main pain points. No technical language here. No aggressive selling. We simply have an honest discussion of your needs and difficulties.",
    icon: MessageCircle
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    desc: "Having learned about your needs, we develop a detailed action plan — what we will make, how it will be implemented, how long it will take, and what results you should get. You will know all the details before we even start coding.",
    icon: Target
  },
  {
    step: "03",
    title: "Custom Development & Integration",
    desc: "A team of Agentic specialists develops your solution entirely from scratch — a fully customizable solution tailored specifically for your company. It will integrate seamlessly with your existing technologies, CRM, WhatsApp, and other tools.",
    icon: Code
  },
  {
    step: "04",
    title: "Testing & Quality Check",
    desc: "Before deploying your AI tool into production, we thoroughly test it under all kinds of situations and conditions to ensure absolute reliability.",
    icon: CheckCircle
  },
  {
    step: "05",
    title: "Launch and Team Training",
    desc: "We deploy your AI solution and train your team on its efficient usage. No confusions, no complexities – just straightforward training to leverage the full potential from day one.",
    icon: Rocket
  },
  {
    step: "06",
    title: "Continuous Support & Optimization",
    desc: "Once you have the solution deployed, we do not abandon it. We constantly monitor and optimize your AI solution as your business evolves over time.",
    icon: Headset
  }
];

const StepCard = ({ item, index }) => {
  const cardRef = useRef(null);

  // Triggers once when the card scrolls into the bottom of the viewport
  const isRevealed = useInView(cardRef, { once: true, margin: "-100px" });

  // Active state tracks if the card has reached the middle of the screen (the "activation line")
  const isActive = useInView(cardRef, { margin: "-45% 0px -45% 0px" });

  const Icon = item.icon;

  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full my-8">

      {/* Timeline Marker (Circle) */}
      <div
        className={`absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-700 z-20
          ${isActive ? "shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-110" : "scale-100"}`
        }
        style={isActive ? { borderColor: "var(--accent-light)", backgroundColor: "var(--accent)" } : { borderColor: "var(--bg-primary)", backgroundColor: "var(--bg-alt)" }}
      >
        <span className="font-bold text-sm transition-colors duration-700" style={{ color: isActive ? "white" : "var(--text-muted)" }}>
          {item.step}
        </span>
      </div>

      {/* Card Container */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-[calc(100%-4rem)] ml-auto md:ml-0 md:w-[calc(50%-4rem)] relative"
      >
        {/* Active Glow Behind Card */}
        <div className={`absolute inset-0 bg-orange-500/20 blur-xl rounded-3xl transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}`} />

        {/* Card Body */}
        <div
          className={`relative p-8 sm:p-10 rounded-3xl transition-all duration-700 overflow-hidden border
            ${isActive ? "shadow-[0_15px_40px_rgba(249,115,22,0.12)] -translate-y-2" : "shadow-sm"}`
          }
          style={isActive ? { backgroundColor: "var(--bg-card)", borderColor: "var(--accent)" } : { backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          {/* Header Row: Icon & Title */}
          <div className="flex items-center gap-4 sm:gap-5 mb-5">
            {/* Icon */}
            <div
              className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-700 border
                ${isActive ? "shadow-[0_0_15px_rgba(249,115,22,0.25)] scale-105" : "shadow-sm scale-100"}`
              }
              style={isActive ? { backgroundColor: "var(--bg-card)", borderColor: "var(--accent)" } : { backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <Icon className="w-7 h-7 transition-colors duration-700" style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }} />
            </div>

            {/* Title */}
            <h3 className="text-[26px] sm:text-[32px] font-bold leading-tight transition-colors duration-700" style={{ color: "var(--text-primary)" }}>
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[17px] sm:text-[18px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {item.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function HowWeBuildSection() {
  const containerRef = useRef(null);

  // Track scroll progress within the container for the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="py-32 px-8 lg:px-16 relative overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-orange-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
            How We Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
              AI Solution
            </span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            A straightforward, completely hassle-free process. We take care of everything from discovery to deployment.
          </p>
        </div>

        <div ref={containerRef} className="relative py-10">

          {/* Static Background Line */}
          <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-1 bg-neutral-100 -translate-x-1/2 rounded-full" />

          {/* Animated Orange Line */}
          <motion.div
            className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-1 bg-gradient-to-b from-orange-400 to-orange-500 -translate-x-1/2 rounded-full origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-8 md:gap-0">
            {steps.map((item, i) => (
              <StepCard key={i} item={item} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
