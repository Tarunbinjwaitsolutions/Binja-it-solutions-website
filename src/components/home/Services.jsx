"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";

const servicesData = {
  title: "OUR SERVICES",
  description:
    "Binjwa IT Solutions helps businesses to streamline operations, embrace digital transformation and grow with confidence through innovative technology and smart automation. Whether you're building a new platform, upgrading existing systems or automating business processes, we'll deliver scalable, reliable solutions tailored to your unique requirements.\n\nWe don't just sell technology, we deliver solutions that will improve productivity, save costs and keep your business ahead in an ever changing digital world. With a strong focus on quality, security and performance, we ensure your business is ready for success today and prepared for the opportunities of tomorrow.",
  services: [
    {
      title: "Agentic AI Solutions",
      desc: "Workflow Automation | Custom AI Agents | Intelligent Operations",
      path: "/ai-solutions",
      color: "bg-indigo-500",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
    },
    {
      title: "Web & App Development Suite",
      desc: "Scalable Web Apps | Mobile Experiences | Custom CRM Systems",
      path: "/full-stack-development",
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
    },
    {
      title: "Compliance Solutions",
      desc: "Tax Strategy | Regulatory Advisory | Risk Management",
      path: "/compliance",
      color: "bg-emerald-500",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
    },
    {
      title: "Digital Marketing",
      desc: "SEO Optimization | Performance Ads | Social Media Growth",
      path: "/digital-marketing",
      color: "bg-rose-500",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
    },
  ],
};

const PremiumCard = ({ service }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative overflow-hidden rounded-[2rem] h-full border group shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {/* Desktop Background Shape */}
      <div
        className={`hidden sm:block absolute right-0 top-0 bottom-0 w-[45%] lg:w-[50%] ${service.color} opacity-95 transition-transform duration-500 group-hover:scale-105 origin-right`}
        style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}
      />

      {/* Mobile Background Shape */}
      <div
        className={`block sm:hidden absolute right-0 bottom-0 left-0 h-[55%] ${service.color} opacity-95 transition-transform duration-500 group-hover:scale-105 origin-bottom`}
        style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row h-full w-full">
        {/* Left Content Area (Top on Mobile) */}
        <div className="flex flex-col justify-center flex-1 p-8 sm:p-10 z-10">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium tracking-wide uppercase opacity-80 mb-8" style={{ color: "var(--text-muted)" }}>
            {service.desc}
          </p>

          {/* <div className="mt-auto">
            <Link href={service.path} className="inline-block">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1 border border-gray-200 text-sm">
                Explore 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div> */}
        </div>

        {/* Right Image Area (Bottom on Mobile) */}
        <div className="flex items-center justify-center sm:justify-end p-8 sm:p-8 shrink-0 w-full sm:w-[40%] lg:w-[45%]">
          <div className="relative w-[180px] sm:w-full aspect-[4/5] sm:max-w-[220px] rounded-[2.5rem] overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500 border-[6px] border-white/20">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 180px, 220px"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="py-24 px-8 lg:px-16 transition-colors duration-300 overflow-hidden relative" style={{ backgroundColor: "var(--bg-secondary)" }}>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(var(--text-primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row gap-12 mb-20 items-start"
        >
          <motion.div variants={fadeInUp} className="md:w-1/3">
            <div className="h-1 w-12 bg-orange-500 mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ color: "var(--text-primary)" }}>
              {servicesData.title}
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="md:w-2/3">
            <div className="text-lg leading-relaxed max-w-2xl space-y-4" style={{ color: "var(--text-muted)" }}>
              {servicesData.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {servicesData.services.map((service, index) => (
            <PremiumCard key={index} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;