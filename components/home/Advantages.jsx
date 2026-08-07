"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";

const advantageData = {
    title: "We know you have options. Here's why businesses across India keep choosing",
    highlight: "Binjwa IT Solutions — and keep coming back.",
    items: [
        { title: "We Actually Listen to You", description: "Most agencies hand you a template and call it done. We don't. Before writing a single line of code, we sit down and understand your business, your goals, and your problems — then we build something that actually fits." },
        { title: "One Team. Everything You Need.", description: "No need to hire a web developer here, a marketing agency there, and a compliance consultant somewhere else. We handle your website, app, AI automation, digital marketing, and compliance — all under one roof. One call. One team. Zero confusion." },
        { title: "We Bring AI to Your Business — Simply", description: "AI sounds complicated. We make it simple. Whether it's automating your customer follow-ups, managing leads, or handling repetitive tasks — we set it all up for you so you can focus on growing your business, not managing it." },
        { title: "You Get More. You Spend Less.", description: "Premium quality doesn't always mean premium price. We offer honest, transparent pricing with no hidden charges — so you always know exactly what you're paying for and what you're getting in return." },
        { title: "We Care About Your Results, Not Just Delivery", description: "Launching your project is just the beginning for us. We track performance, suggest improvements, and stay by your side long after go-live. Your growth is our success — that's not just a tagline, that's how we work." },
        { title: "Your Business is Safe With Us", description: "We build with security and reliability in mind — every time. From secure code to data protection and compliance support, we make sure your digital assets are protected and your business stays legally safe." },
        { title: "We Respect Your Time", description: "We know delays cost you money. That's why we set clear timelines, give you regular updates, and deliver on our promises. No ghosting. No excuses. Just honest, on-time work." },
        { title: "We Grow When You Grow", description: "We don't disappear after the invoice is paid. As your business grows, your technology needs to grow too — and we're right there to scale your solutions, add new features, and support every new chapter of your journey." },
    ],
};

const Advantages = () => {
    return (
        <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Image with Next.js Image optimization */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Team Collaboration Background" 
                    fill 
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Section Heading Area */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }} 
                    className="mb-16 md:mb-24 max-w-3xl"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Advantages
                    </h2>
                    <p className="text-xl md:text-2xl text-white/80 font-light">
                        {advantageData.title} <span className="font-semibold text-white">{advantageData.highlight}</span>
                    </p>
                </motion.div>

                {/* Glassmorphism Cards Grid */}
                <motion.div 
                    variants={staggerContainer} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.1 }} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto"
                >
                    {advantageData.items.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className={`flex flex-col justify-center text-center p-8 md:p-10 rounded-3xl transition-all duration-300
                                        bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl
                                        hover:bg-white/15 hover:border-white/30 hover:-translate-y-2
                                        ${index % 2 !== 0 ? 'md:mt-12' : ''}`}
                        >
                            <p className="text-lg md:text-xl font-serif italic text-white/95 leading-relaxed mb-6">
                                "{item.description}"
                            </p>
                            <div className="mt-auto pt-6 border-t border-white/10">
                                <h3 className="text-sm md:text-base font-bold text-white tracking-wide uppercase">
                                    {item.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Advantages;
