"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const advantageData = {
  title: "We know you have options. Here's why businesses across India keep choosing",
  highlight: "Binjwa IT Solutions — and keep coming back.",
  items: [
    { id: "01.", title: "We Actually Listen to You", description: "Most agencies hand you a template and call it done. We don't. Before writing a single line of code, we sit down and understand your business, your goals, and your problems — then we build something that actually fits.", icon: "👂" },
    { id: "02.", title: "One Team. Everything You Need.", description: "No need to hire a web developer here, a marketing agency there, and a compliance consultant somewhere else. We handle your website, app, AI automation, digital marketing, and compliance — all under one roof. One call. One team. Zero confusion.", icon: "🤝" },
    { id: "03.", title: "We Bring AI to Your Business — Simply", description: "AI sounds complicated. We make it simple. Whether it's automating your customer follow-ups, managing leads, or handling repetitive tasks — we set it all up for you so you can focus on growing your business, not managing it.", icon: "🤖" },
    { id: "04.", title: "You Get More. You Spend Less.", description: "Premium quality doesn't always mean premium price. We offer honest, transparent pricing with no hidden charges — so you always know exactly what you're paying for and what you're getting in return.", icon: "💰" },
    { id: "05.", title: "We Care About Your Results, Not Just Delivery", description: "Launching your project is just the beginning for us. We track performance, suggest improvements, and stay by your side long after go-live. Your growth is our success — that's not just a tagline, that's how we work.", icon: "📈" },
    { id: "06.", title: "Your Business is Safe With Us", description: "We build with security and reliability in mind — every time. From secure code to data protection and compliance support, we make sure your digital assets are protected and your business stays legally safe.", icon: "🔒" },
    { id: "07.", title: "We Respect Your Time", description: "We know delays cost you money. That's why we set clear timelines, give you regular updates, and deliver on our promises. No ghosting. No excuses. Just honest, on-time work.", icon: "⏱️" },
    { id: "08.", title: "We Grow When You Grow", description: "We don't disappear after the invoice is paid. As your business grows, your technology needs to grow too — and we're right there to scale your solutions, add new features, and support every new chapter of your journey.", icon: "🌱" },
  ] as AdvantageItem[],
};

const Advantages = () => {
  return (
    <section className="py-16 px-8 lg:px-16 transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold inline-block relative max-w-4xl leading-tight" style={{ color: "var(--text-primary)" }}>
            ADVANTAGES
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-24 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            </div>
          </h2>
          <p className="mt-6 text-lg max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            {advantageData.title} <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{advantageData.highlight}</span>
          </p>
        </motion.div>

        <motion.div variants={staggerContainer as any} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {advantageData.items.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp as any}
              className="flex flex-col items-center group p-8 rounded-2xl transition-all border relative overflow-hidden duration-300"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--bg-card-hover)"; e.currentTarget.style.boxShadow = "var(--card-shadow)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "var(--bg-card)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative z-10 h-16 w-16 rounded-full shadow-sm flex items-center justify-center mb-6 text-3xl transition-transform duration-300" 
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                {item.icon}
              </motion.div>
              <h3 className="relative z-10 text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-orange-500" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
              <p className="relative z-10 text-sm leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, type: "spring" }}
          className="mt-12 p-8 rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.2)] max-w-3xl mx-auto relative overflow-hidden group"
          style={{ backgroundColor: "var(--indigo-brand)" }}
        >
          <div className="absolute inset-0 bg-white/5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
          <p className="text-2xl md:text-3xl font-serif italic font-medium leading-relaxed text-white relative z-10">
            "We don't just build solutions — we build businesses."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Advantages;
