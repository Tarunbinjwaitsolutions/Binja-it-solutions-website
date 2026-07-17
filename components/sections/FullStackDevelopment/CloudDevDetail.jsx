"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cloud, Server, Database, Zap, ShieldCheck } from "lucide-react";
const aws = "/assets/images/aws.png";

const CloudDevDetail = () => {
  const cloudSolutions = [
    {
      title: "API Development & Integration",
      desc: "We build secure, high-speed APIs that serve as the backbone of your digital infrastructure, ensuring seamless communication between all your platforms.",
      icon: <Server className="text-orange-500" size={24} />,
    },
    {
      title: "Scalable Database Architecture",
      desc: "Using MongoDB and PostgreSQL, we design database schemas optimized for speed and data integrity, capable of handling millions of records efficiently.",
      icon: <Database className="text-orange-500" size={24} />,
    },
    {
      title: "AWS Cloud Deployment",
      desc: "Expertise in AWS Elastic Beanstalk, S3, and CloudFront to ensure your applications are globally accessible with 99.9% uptime.",
      icon: <Cloud className="text-orange-500" size={24} />,
    },
    {
      title: "Security & Performance",
      desc: "Implementation of AWS WAF and performance monitoring to protect against threats while maintaining lightning-fast load times.",
      icon: <Zap className="text-orange-500" size={24} />,
    },
  ];

  return (
    <section
      id="cloud-dev"
      className="py-12 px-8 lg:px-16 scroll-mt-20"
      style={{ backgroundColor: "var(--bg-alt)", color: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center lg:items-start gap-16">
        {/* Right Content: Technical Authority */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl text-orange-500 shadow-sm" style={{ backgroundColor: "var(--bg-primary)" }}>
              <Cloud size={28} />
            </div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">
              Backend & Cloud Solutions
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
            The power to scale <br />
            <span className="text-orange-600">without limits.</span>
          </h2>

          <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Infrastructure should be invisible. We specialize in building robust
            backend systems and cloud architectures that handle heavy traffic
            effortlessly, so you can focus on growing your business while we
            manage the engine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cloudSolutions.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow group transition-colors duration-300" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Left Visual Side: Technical Stack */}
        <div className="lg:w-1/2 relative lg:sticky lg:top-24">
          <div className="absolute -inset-10 bg-orange-500/5 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            {/* Main Visual: Using image1 (type-4.png) to represent technical depth */}
            <div className="relative rounded-[2.5rem] overflow-hidden border-8 origin-center w-3/4 mx-auto" style={{ borderColor: "var(--border)" }}>
              <img
                src={aws}
                alt="Cloud Infrastructure Management"
                className=" object-cover object-center grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Floating Technical Status Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 p-5 rounded-2xl shadow-xl border border-orange-100 hidden md:block" style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                  <ShieldCheck size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    Global Security
                  </p>
                  <p className="text-sm font-bold text-neutral-900">
                    AWS WAF Enabled
                  </p>
                </div>
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
              className="absolute -bottom-6 -right-6 bg-orange-900 text-white p-5 rounded-2xl shadow-xl hidden md:block"
            >
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">
                Response Time
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">120</span>
                <span className="text-xs font-medium text-neutral-400">ms</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CloudDevDetail;
