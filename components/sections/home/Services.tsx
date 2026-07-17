"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Code2, Bot, TrendingUp, ShieldCheck } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface Service {
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactElement;
  path: string;
}

const servicesData = {
  title: "OUR SERVICES",
  description:
    "Binjwa IT Solutions helps businesses to streamline operations, embrace digital transformation and grow with confidence through innovative technology and smart automation. Whether you're building a new platform, upgrading existing systems or automating business processes, we'll deliver scalable, reliable solutions tailored to your unique requirements.\n\nWe don't just sell technology, we deliver solutions that will improve productivity, save costs and keep your business ahead in an ever changing digital world. With a strong focus on quality, security and performance, we ensure your business is ready for success today and prepared for the opportunities of tomorrow.",
  services: [
    { title: "Agentic AI Solutions", subtitle: "AI Automation & Agentic AI Solutions", desc: "Streamline workflows and automate business operations using custom AI agent solutions and AI automation.", icon: <Bot size={44} />, path: "/ai-solutions" },
    { title: "Web & App Development Suite", subtitle: "Web, Mobile App & CRM Development", desc: "Create web and mobile application solutions that are scalable and built to enhance user experience and optimize business operations.", icon: <Code2 size={44} />, path: "/full-stack-development" },
    { title: "Compliance Solutions", subtitle: "Compliance, Tax & Regulatory Solutions", desc: "Comply with expert tax, regulatory, and business compliance solutions to increase efficiency and reduce risks.", icon: <ShieldCheck size={44} />, path: "/compliance" },
    { title: "Digital Marketing", subtitle: "SEO & Digital Marketing Services", desc: "Generate more visibility online and increase business using SEO, performance advertising, social media management.", icon: <TrendingUp size={44} />, path: "/digital-marketing" },
  ] as Service[],
};

interface PremiumCardProps {
  service: Service;
  index: number;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ service, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={fadeInUp as any}
      className="h-full w-full [perspective:1000px]"
    >
      <Link href={service.path} className="block h-full">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
          whileHover={{ y: -8, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="relative group p-8 lg:p-10 rounded-3xl border flex flex-col items-center text-center transition-all duration-500 shadow-sm hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] h-full overflow-hidden cursor-pointer"
        >
          {/* Navy Blue Hover Background - slides up from the bottom on hover, slides back down on leave */}
          <div
            className="absolute inset-0 z-0 bg-[#0B1F3A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center h-full w-full transform-gpu" style={{ transform: "translateZ(30px)" }}>

            {/* Icon Container */}
            <div
              className="relative p-8 rounded-3xl border flex items-center justify-center mb-6 transition-colors duration-500 group-hover:!border-white/20"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <span className="transition-colors duration-500 group-hover:!text-white" style={{ color: "inherit" }}>
                {service.icon}
              </span>
            </div>

            <div className="mt-auto flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-300 ease-out">
              <h3 className="text-xl font-bold mb-4 transition-colors duration-500 group-hover:!text-white relative z-10" style={{ color: "var(--text-primary)" }}>
                {service.title}
              </h3>

              <h4 className="text-sm font-semibold mb-4 transition-colors duration-300 group-hover:!text-white relative z-10" style={{ color: "var(--text-primary)" }}>
                {service.subtitle}
              </h4>

              <p className="text-sm leading-relaxed transition-colors duration-500 group-hover:!text-white relative z-10" style={{ color: "var(--text-muted)" }}>
                {service.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section className="py-24 px-8 lg:px-16 transition-colors duration-300 overflow-hidden relative" style={{ backgroundColor: "var(--bg-secondary)" }}>
      {/* AI-Inspired Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Transparent Blue Blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full mix-blend-screen" />
        {/* Subtle Glass Circles */}
        <div className="absolute top-[20%] right-[15%] w-64 h-64 border border-blue-500/10 rounded-full opacity-50" />
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 border border-blue-400/10 rounded-full opacity-50" />
        {/* Digital Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(var(--text-primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer as any}
          className="flex flex-col md:flex-row gap-12 mb-20 items-start"
        >
          <motion.div variants={fadeInUp as any} className="md:w-1/3">
            <div className="h-1 w-12 bg-orange-500 mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ color: "var(--text-primary)" }}>
              {servicesData.title}
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp as any} className="md:w-2/3">
            <div className="text-lg leading-relaxed max-w-2xl space-y-4" style={{ color: "var(--text-muted)" }}>
              {servicesData.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicesData.services.map((service, index) => (
            <PremiumCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
