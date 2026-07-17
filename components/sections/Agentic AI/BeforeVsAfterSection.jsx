"use client";
import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

const beforeList = [
    "Manual data entry across systems",
    "Slow response times to clients",
    "High rate of human errors",
    "Scales only by hiring more staff",
    "Operations pause after 5 PM",
    "High operational costs"
];

const afterList = [
    "Fully synchronized data streams",
    "Instant, real-time responses",
    "100% precision & accuracy",
    "Scales infinitely with zero effort",
    "Operations run 24/7/365",
    "Dramatically reduced costs"
];

export default function BeforeVsAfterSection() {
    return (
        <section
            className="py-10 px-8 lg:px-16"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl md:text-5xl font-bold mb-6"
                        style={{ color: "var(--text-primary)" }}
                    >
                        The Agentic AI Advantage
                    </h2>
                    <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                        See the stark contrast between traditional business operations and an AI-powered enterprise.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative">
                    {/* Before */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.1)] hover:-translate-y-1 transition-all duration-300 border shadow-sm"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border-color)",
                        }}
                    >
                        <div
                            className="text-center mb-8 pb-8 border-b"
                            style={{ borderColor: "var(--border-color)" }}
                        >
                            <span
                                className="font-bold uppercase tracking-wider text-sm mb-2 block"
                                style={{ color: "var(--text-tertiary)" }}
                            >
                                Before
                            </span>
                            <h3 className="text-3xl font-bold" style={{ color: "var(--text-secondary)" }}>
                                Manual & Slow
                            </h3>
                        </div>
                        <ul className="space-y-6">
                            {beforeList.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-4 font-medium"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    <XCircle className="w-6 h-6 text-orange-400 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* VS Badge */}
                    <div
                        className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full font-black text-xl items-center justify-center z-10 shadow-xl border-4"
                        style={{
                            backgroundColor: "#f97316",
                            color: "#ffffff",
                            borderColor: "var(--bg-primary)",
                        }}
                    >
                        VS
                    </div>

                    {/* After */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.1)] hover:-translate-y-1 transition-all duration-300 border shadow-sm"
                        style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border-color)",
                        }}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 blur-[80px] rounded-full pointer-events-none" />

                        <div
                            className="text-center mb-8 pb-8 border-b relative z-10"
                            style={{ borderColor: "black" }}>

                            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-2 block">
                                After
                            </span>
                            <h3 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                                AI Powered & Fast
                            </h3>
                        </div>

                        <ul className="space-y-6 relative z-10">
                            {afterList.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-4 font-semibold"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}