"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Zap,
  Users,
  IndianRupee,
  Rocket,
  Headphones,
  Check,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface WhyChooseItem {
  id: string;
  label: string;
  title: string;
  points: string[];
  icon: React.ReactElement;
  image: string;
}

const whyChooseData: WhyChooseItem[] = [
  {
    id: "1/6",
    label: "Innovation",
    title: "Innovative Solutions",
    points: [
      "We provide innovative solutions based on the most advanced technologies, intelligent automation, and industry practices that allow organizations to outshine their competitors.",
    ],
    icon: <Target size={26} />,
    image: "/assets/images/All-in-One.jpg",
  },
  {
    id: "2/6",
    label: "Partnership",
    title: "Trusted Partnership",
    points: [
      "We consider it crucial to establish a strong relationship with our customers through our reliable assistance and effective communication.",
    ],
    icon: <Zap size={26} />,
    image: "/assets/images/chooseimage2.jpg",
  },
  {
    id: "3/6",
    label: "Team",
    title: "Expert Team",
    points: [
      "We have skilled experts who can provide knowledge about technology, compliance, taxation, and digital marketing for you to get customized solutions.",
    ],
    icon: <Users size={26} />,
    image: "/assets/images/type-4.jpg",
  },
  {
    id: "4/6",
    label: "Approach",
    title: "Customized Approach",
    points: [
      "Each business has its own distinctiveness and requirements. We listen to your aspirations and make strategies accordingly.",
    ],
    icon: <IndianRupee size={26} />,
    image: "/assets/images/chooseimage3.jpg",
  },
  {
    id: "5/6",
    label: "Results",
    title: "Results-Driven Execution",
    points: [
      "In whatever service you avail yourself from us, whether it be development and automation or marketing and compliance, we emphasize delivering results.",
    ],
    icon: <Rocket size={26} />,
    image: "/assets/images/Hire-our-people.png",
  },
  {
    id: "6/6",
    label: "Support",
    title: "Continuous Support",
    points: [
      "We don't just stop there. Our job is not over when your projects are completed but rather the beginning of ongoing support for your business.",
    ],
    icon: <Headphones size={26} />,
    image: "/assets/images/itservices.png",
  },
];

const floatingImageVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

interface PremiumIconProps {
  icon: React.ReactElement;
}

const PremiumIcon: React.FC<PremiumIconProps> = ({ icon }) => {
  return (
    <motion.div
      className="relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group/icon cursor-default"
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Soft Glow Behind */}
      <div
        className="absolute inset-0 opacity-20 blur-xl rounded-xl group-hover/icon:opacity-50 transition-opacity duration-500 animate-pulse pointer-events-none"
        style={{ backgroundColor: "var(--accent)" }}
      />
      {/* Glassmorphism Container */}
      <motion.div
        className="relative z-10 w-full h-full rounded-xl border backdrop-blur-md flex items-center justify-center transition-all duration-400"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-secondary) 80%, transparent)",
          borderColor: "var(--border)",
          color: "var(--accent)"
        }}
        whileHover={{ scale: 1.1, rotate: 6, boxShadow: "0 0 15px var(--accent)" }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

interface FeatureCardProps {
  feature: WhyChooseItem;
  isEven: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, isEven }) => {
  const leftContentVariants = {
    hidden: { opacity: 0, x: isEven ? 40 : -40, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const rightImageVariants = {
    hidden: { opacity: 0, x: isEven ? -40 : 40, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative w-full rounded-2xl p-8 md:p-12 mb-8 flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 overflow-hidden border transition-all duration-400 group/card`}
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {/* Hover Effects: Gradient Border Glow & Glass Background */}
      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, transparent) 0%, color-mix(in srgb, blue 5%, transparent) 100%)" }} />
      <div className="absolute inset-0 border-[1.5px] border-transparent group-hover/card:border-[var(--accent)] opacity-0 group-hover/card:opacity-30 rounded-2xl transition-all duration-500 pointer-events-none z-10" />

      {/* Left Edge Active Indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] opacity-0 scale-y-0 group-hover/card:opacity-100 group-hover/card:scale-y-100 transition-all duration-500 origin-top z-20"
        style={{ background: "linear-gradient(to bottom, var(--accent), #3b82f6)", boxShadow: "0 0 10px var(--accent)" }} />

      <motion.div variants={leftContentVariants as any} className="flex-1 text-left relative z-10">
        {/* Heading Layout: [Icon] Title */}
        <div className="flex items-center gap-4 md:gap-5 mb-6">
          <PremiumIcon icon={feature.icon} />
          <h3 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
            {feature.title}
          </h3>
        </div>

        <motion.ul variants={staggerContainer as any} className="space-y-4">
          {feature.points.map((point, idx) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20, scale: 0.95 },
                visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 300 } }
              }}
              key={idx}
              className="flex items-start gap-3 text-base md:text-lg group/bullet"
              style={{ color: "var(--text-secondary)" }}
            >
              <div className="mt-1.5 shrink-0 transition-all duration-300 group-hover/bullet:drop-shadow-[0_0_8px_var(--accent)] group-hover/bullet:scale-110" style={{ color: "var(--accent)" }}>
                <Check size={20} strokeWidth={3} />
              </div>
              <span>{point}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div variants={rightImageVariants as any} className="flex-1 w-full flex justify-center items-center relative z-10">
        <motion.div
          variants={floatingImageVariants as any}
          animate="animate"
          className="relative rounded-xl overflow-hidden border-[4px] max-w-md transition-all duration-500 group-hover/card:scale-105 group-hover/card:shadow-xl"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="absolute inset-0 border border-transparent group-hover/card:border-[var(--accent)] opacity-0 group-hover/card:opacity-40 transition-colors duration-500 z-20 pointer-events-none rounded-xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={feature.image} alt={feature.title} className="w-full h-auto object-cover aspect-video transition-transform duration-700 group-hover/card:scale-110" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const WhyChooseUsStack: React.FC = () => {
  return (
    <section className="py-24 px-6 lg:px-20 transition-colors duration-300 relative overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Subtle Background Enhancements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-96 h-96 opacity-5 blur-[120px] rounded-full" style={{ backgroundColor: "var(--accent)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-blue-500 opacity-5 blur-[150px] rounded-full" />
        {/* Very light AI particles grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(var(--text-primary) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
            Why Businesses Choose <br />
            <span style={{ color: "var(--accent)" }}>Binjwa IT Solutions</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {whyChooseData.map((feature, index) => (
            <FeatureCard key={index} feature={feature} isEven={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsStack;
