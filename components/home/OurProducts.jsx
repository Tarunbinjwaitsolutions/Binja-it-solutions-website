"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, MessageSquare, Blocks, Activity, CalendarDays, BarChart3, HeartHandshake, Users } from "lucide-react";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";

const AgenticAIMockup = () => (
  <div className="w-full h-full min-h-[260px] bg-[#18181b] rounded-xl border border-neutral-800 shadow-xl overflow-hidden flex flex-col relative z-10">
    {/* Window Header */}
    <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-1.5 shrink-0">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      <div className="ml-3 text-[10px] font-medium text-neutral-500 hidden sm:block">workflow_builder.ai</div>
    </div>
    {/* Window Body */}
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-12 sm:w-16 border-r border-neutral-800 bg-neutral-900/50 flex flex-col items-center py-3 gap-3 shrink-0">
        <div className="w-7 h-7 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30"><Bot size={14} /></div>
        <div className="w-7 h-7 rounded bg-neutral-800 text-neutral-400 flex items-center justify-center cursor-pointer hover:bg-neutral-700 transition-colors"><Blocks size={14} /></div>
        <div className="w-7 h-7 rounded bg-neutral-800 text-neutral-400 flex items-center justify-center cursor-pointer hover:bg-neutral-700 transition-colors"><Activity size={14} /></div>
      </div>
      {/* Canvas */}
      <div className="flex-1 bg-[#121214] p-4 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

        {/* SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <path d="M 60 40 C 100 40, 100 90, 140 90" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" className="animate-[dash_3s_linear_infinite]" style={{ strokeDashoffset: 20 }} />
          <path d="M 60 40 C 100 40, 100 140, 140 140" fill="none" stroke="#3f3f46" strokeWidth="1.5" />
        </svg>
        <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>

        {/* Nodes */}
        <div className="relative z-10 w-full h-full">
          <div className="absolute top-6 left-2 sm:left-4 w-24 sm:w-28 bg-neutral-800 border border-neutral-700 rounded-md p-2 shadow-lg flex items-center gap-2 hover:border-neutral-600 transition-colors cursor-pointer">
            <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center"><MessageSquare size={10} /></div>
            <div className="flex flex-col gap-1 w-full"><div className="w-3/4 h-1 sm:h-1.5 bg-neutral-600 rounded" /><div className="w-1/2 h-1 bg-neutral-700 rounded" /></div>
          </div>
          
          <div className="absolute top-16 left-24 sm:left-32 w-28 sm:w-32 bg-orange-500/10 border border-orange-500/40 rounded-md p-2 shadow-[0_0_15px_rgba(249,115,22,0.15)] flex items-center gap-2 animate-pulse">
            <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded bg-orange-500 text-white flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.5)]"><Bot size={10} /></div>
            <div className="flex flex-col gap-1 w-full"><div className="w-3/4 h-1 sm:h-1.5 bg-orange-200/80 rounded" /><div className="w-1/2 h-1 bg-orange-200/50 rounded" /></div>
          </div>
          
          <div className="absolute top-32 left-24 sm:left-32 w-24 sm:w-28 bg-neutral-800 border border-neutral-700 rounded-md p-2 shadow-lg flex items-center gap-2 hover:border-neutral-600 transition-colors cursor-pointer">
            <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded bg-green-500/20 text-green-400 flex items-center justify-center"><Activity size={10} /></div>
            <div className="flex flex-col gap-1 w-full"><div className="w-3/4 h-1 sm:h-1.5 bg-neutral-600 rounded" /><div className="w-1/2 h-1 bg-neutral-700 rounded" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SMMMockup = () => (
  <div className="w-full h-full min-h-[260px] bg-[#18181b] rounded-xl border border-neutral-800 shadow-xl overflow-hidden flex flex-col relative z-10 p-4 gap-4">
    {/* Header / Stats */}
    <div className="flex gap-3">
      <div className="flex-1 bg-neutral-800/60 border border-neutral-700/50 rounded-lg p-3 flex flex-col gap-1 hover:bg-neutral-800 transition-colors cursor-pointer">
        <div className="text-neutral-400 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">Total Reach</div>
        <div className="text-lg sm:text-xl font-bold text-white">2.4M</div>
        <div className="text-green-400 text-[9px] sm:text-[10px] font-medium flex items-center gap-1">+14.5% <Activity size={10} /></div>
      </div>
      <div className="flex-1 bg-neutral-800/60 border border-neutral-700/50 rounded-lg p-3 flex flex-col gap-1 hover:bg-neutral-800 transition-colors cursor-pointer">
        <div className="text-neutral-400 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">Engagement</div>
        <div className="text-lg sm:text-xl font-bold text-white">128K</div>
        <div className="text-orange-400 text-[9px] sm:text-[10px] font-medium flex items-center gap-1">+5.2% <HeartHandshake size={10} /></div>
      </div>
    </div>

    {/* Chart */}
    <div className="flex-1 bg-neutral-800/60 border border-neutral-700/50 rounded-lg p-3 sm:p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <div className="text-[10px] sm:text-xs font-medium text-neutral-300">Audience Growth</div>
        <div className="text-[9px] text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded hidden sm:block">Last 7 Days</div>
      </div>
      <div className="flex-1 flex items-end justify-between gap-1 pt-2 border-t border-neutral-700/50 h-24">
        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
          <div key={i} className="w-full bg-neutral-700 rounded-t-sm relative group cursor-pointer transition-all hover:bg-neutral-600" style={{ height: `${height}%` }}>
            <div className="absolute bottom-0 w-full bg-orange-500 rounded-t-sm transition-all group-hover:bg-orange-400" style={{ height: `${height * 0.7}%` }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const productsData = [
  {
    badge: "AI Automation",
    title: "Agentic AI",
    description: "Intelligent AI-powered automation that learns and adapts to your business processes. Automate complex workflows with autonomous agents.",
    features: [
      { icon: Bot, title: "Autonomous Task Execution", desc: "Automate complex workflows with intelligent agents that learn." },
      { icon: MessageSquare, title: "Natural Language Processing", desc: "Interact with and build workflows using conversational commands." },
      { icon: Blocks, title: "Seamless Integrations", desc: "Connect effortlessly with your existing business tools." },
      { icon: Activity, title: "Real-time Adaptation", desc: "AI that continuously learns and optimizes your processes on the fly." }
    ],
    link: "/products/agentic-ai",
    visual: <AgenticAIMockup />
  },
  {
    badge: "Digital Growth",
    title: "Social Media Management",
    description: "Complete social media management platform for scheduling, analytics, and engagement. Manage all your social channels from one dashboard.",
    features: [
      { icon: CalendarDays, title: "Multi-Channel Scheduling", desc: "Plan and publish content across all your platforms from one dashboard." },
      { icon: BarChart3, title: "Advanced Analytics", desc: "Gain deep insights into engagement, reach, and audience growth." },
      { icon: HeartHandshake, title: "Engagement Automation", desc: "Monitor interactions and automate responses to build your community." },
      { icon: Users, title: "Team Collaboration", desc: "Streamline approvals and work seamlessly on content planning." }
    ],
    link: "/products/smm",
    visual: <SMMMockup />
  }
];

const OurProducts = () => {
  return (
    <section className="py-24 px-6 lg:px-20 transition-colors duration-300 relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-96 h-96 opacity-30 blur-[120px] rounded-full" style={{ backgroundColor: "var(--accent)" }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-blue-500/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
            Our Products
          </h2>
          <div className="w-24 h-1.5 mx-auto bg-orange-500 rounded-full" />
          <p className="mt-8 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Discover our flagship solutions designed to scale your business, automate your workflows, and drive unparalleled growth.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-8 lg:gap-12"
        >
          {productsData.map((product, index) => {
            const MainIcon = product.features[0].icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                className="group relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-md transition-all duration-300 flex flex-col lg:flex-row bg-white border border-gray-100"
              >
                {/* Subtle orange glow inside the card on hover */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Left Column: Content */}
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center flex-1 w-full lg:w-[55%] xl:w-[60%] relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100">
                      <MainIcon size={16} />
                    </div>
                    <span className="text-orange-500 font-bold tracking-wide uppercase text-xs">{product.badge}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-900 leading-tight">
                    {product.title}
                  </h3>

                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
                    {product.description}
                  </p>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-8">
                    {product.features.map((feat, i) => (
                      <div key={i} className="group/feature flex flex-col gap-1 p-2 -ml-2 rounded-lg hover:bg-orange-50/50 transition-colors cursor-default">
                        <div className="flex items-center gap-2 text-gray-800 font-semibold transition-colors group-hover/feature:text-orange-600">
                          <feat.icon size={16} className="text-orange-500 shrink-0 group-hover/feature:scale-110 transition-transform" />
                          <h4 className="text-xs md:text-sm">{feat.title}</h4>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed pl-6">{feat.desc}</p>
                      </div>
                    ))}
                  </div>

                  <Link href={product.link} className="inline-block mt-auto w-fit">
                    <button className="flex items-center gap-2 font-semibold text-sm md:text-base text-white bg-orange-500 hover:bg-orange-600 px-6 py-2.5 rounded-full transition-all duration-300 shadow hover:shadow-lg hover:gap-3 hover:-translate-y-0.5">
                      Explore <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="w-full lg:w-[45%] xl:w-[40%] p-6 md:p-8 flex items-center justify-center relative z-10 lg:border-l border-gray-100 bg-neutral-900/5">
                  <div className="w-full h-full relative transform transition-transform duration-500 group-hover:scale-[1.02]">
                    {product.visual}
                  </div>
                </div>

              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default OurProducts;
