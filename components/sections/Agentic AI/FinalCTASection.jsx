"use client";
import React from "react";
import Link from 'next/link';
import { ArrowRight, MessageSquareCode } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTASection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (

        <section className="py-20 px-8 lg:px-16 overflow-hidden relative" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="max-w-5xl mx-auto rounded-[3rem] relative overflow-hidden px-8 py-16 md:px-12 md:py-20 text-center shadow-[0_8px_40px_rgb(0,0,0,0.03)] border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--accent)" }}>


                {/* Soft Background Blobs */}
                <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

                {/* Subtle Decorative Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />

                {/* Minimal Curved Lines / Shapes */}
                <svg className="absolute top-10 left-10 w-24 h-24 text-orange-500/5 rotate-45 pointer-events-none" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                </svg>
                <svg className="absolute bottom-10 right-10 w-32 h-32 -rotate-12 pointer-events-none" style={{ color: "var(--text-primary)", opacity: 0.05 }} viewBox="0 0 100 100">
                    <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative z-10 flex flex-col items-center"
                >
                    {/* Floating Icon Container */}
                    <motion.div
                        variants={itemVariants}
                        animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-16 h-16 rounded-2xl shadow-[0_8px_30px_rgb(249,115,22,0.15)] border flex items-center justify-center mb-10 relative group cursor-pointer"
                        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--accent)" }}
                    >
                        <div className="absolute inset-0 bg-orange-500/5 rounded-2xl group-hover:bg-orange-500/10 transition-colors duration-300" />
                        <MessageSquareCode className="w-8 h-8 text-orange-500 relative z-10" />
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl"
                        style={{ color: "var(--text-primary)" }}>
                        Ready to <span style={{ color: "var(--accent)" }}>Automate</span> Your <span style={{ color: "var(--accent)" }}>Business</span>?
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl mb-12 max-w-2xl leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                    >

                        Save yourself time by leaving tasks to AI, which can do them faster, better, and more affordably. Let's create something that suits your business, even when you're sleeping.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
                    >
                        {/* Primary Button */}
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 font-bold rounded-full overflow-hidden hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgb(249,115,22,0.25)] transition-all duration-300"
                            style={{ backgroundColor: "var(--accent)", color: "white" }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get a Free Consultation
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>

                        {/* Secondary Button */}
                        <a
                            href="https://wa.me/1234567890" // Placeholder link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-bold border-2 rounded-full hover:shadow-[0_8px_30px_rgb(249,115,22,0.1)] hover:-translate-y-1 transition-all duration-300 group"
                            style={{ color: "var(--text-primary)", backgroundColor: "var(--bg-card)", borderColor: "var(--accent)" }}
                        >
                            WhatsApp Us Now
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
