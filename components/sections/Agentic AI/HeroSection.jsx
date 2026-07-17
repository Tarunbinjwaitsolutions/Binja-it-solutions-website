"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Sparkles } from "lucide-react";
import Link from 'next/link';
const aiRobotImage = "/assets/images/ai.png";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen pt-25 pb-10 px-8 lg:px-16 overflow-hidden flex items-center bg-white transition-colors duration-200">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col rounded-full lg:flex-row items-center gap-16 relative z-10 w-full">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:w-1/2 flex flex-col items-start text-left"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm mb-6">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                            The Future of Autonomy
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-900 leading-tight">
                        Agentic AI Solutions <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                            That Work 24/7
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-xl leading-relaxed">
                        Automate your business even while you sleep, saving time, cutting
                        costs & scaling it with intelligent AI agents & automation making
                        your workload effortless.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-neutral-900 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get a Free Consultation
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>

                        <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-bold text-neutral-900 bg-transparent border-2 border-neutral-200 rounded-full hover:border-orange-500 :border-orange-500 hover:text-orange-600 :text-orange-400 transition-all"
                        >
                            Work With Us
                        </Link>
                    </div>
                </motion.div>

                {/* Right Content - Main Visual Layout */}
                <div className="lg:w-1/2 relative w-full aspect-square max-w-lg lg:max-w-none mx-auto flex items-center justify-center pointer-events-none mt-12 lg:mt-0">
                    <div className="absolute z-20 w-full h-full flex items-center justify-center scale-95 lg:scale-[1.05]">
                        {/* Gentle breathing motion */}
                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[90%] h-[90%] flex items-center justify-center relative"
                        >
                            {/* Soft ambient orange radial glow behind the image */}
                            <div className="absolute inset-0 m-auto w-[70%] h-[70%] bg-[#f97316] rounded-full blur-[80px] opacity-25 z-0" />

                            {/* Static Robot Image */}
                            <img
                                src={aiRobotImage}
                                alt="Premium AI Robot"
                                className="w-full h-full object-contain mix-blend-multiply filter contrast-[1.02] relative z-10"
                            />

                            {/* Soft shadow specifically beneath the laptop to create depth */}
                            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[3%] bg-black/15 blur-[12px] rounded-[100%] z-20" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

