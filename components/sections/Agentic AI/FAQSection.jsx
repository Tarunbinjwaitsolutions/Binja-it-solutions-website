"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        q: "What is exactly Agentic AI?",
        a: "Agentic AI is the technology behind AI which can think, make decisions, and perform actions independently without any help from humans. In contrast to simple automation that uses set rules, AI agents can deal with complicated tasks step by step with intelligent reasoning."
    },
    {
        q: "What makes Agentic AI different from standard automation?",
        a: "Standard automation uses a set of rigid rules (if this, then that). Agentic AI performs much more complicated tasks with intelligent reasoning, pattern recognition, learning, and adaptation according to the current context. Standard automation is a basic machine; Agentic AI is a skilled employee."
    },
    {
        q: "How long will it take to develop an AI solution?",
        a: "Development of an AI solution like a chatbot or WhatsApp bot automation may take about 2-3 weeks. The development of custom AI agents and complicated workflows may require 4-8 weeks depending on your needs. We always provide an honest estimate before starting."
    },
    {
        q: "Do I need any tech knowledge for using your AI solutions?",
        a: "No, of course not! We do everything ourselves — we develop, implement, and teach your team how to work with AI. Our solutions are meant to be user-friendly and require absolutely no technical skills from you."
    },
    {
        q: "Can you integrate AI with my existing tools and software?",
        a: "Of course! Our solutions perfectly integrate with your CRM system, website, WhatsApp, email, and other popular software you use today via APIs."
    },
    {
        q: "Will the AI solution replace my team members?",
        a: "Certainly not! AI will do all the jobs that take up time and require no strategic brainpower, whereas humans are left to do tasks that need human intelligence, such as strategic decision making and building relationships."
    },
    {
        q: "How much does it cost to implement an Agentic AI solution?",
        a: "Each company has unique requirements, so each project has its own price tag. We offer fixed price solutions, milestone-based solutions, and flexible engagement models, all with transparent pricing and no hidden costs."
    },
    {
        q: "What happens after my AI solution is launched?",
        a: "We don't disappear. You get performance monitoring, bug fixes, continuous optimization, team support via phone/WhatsApp, and easy feature additions. We are your long-term AI partner."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 px-8 lg:px-16 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.1)] hover:-translate-y-1 transition-all duration-300 border border-neutral-200 overflow-hidden shadow-sm hover:border-orange-200 "
                            >
                                <button
                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                >
                                    <span className="font-bold text-neutral-900 pr-8">
                                        {faq.q}
                                    </span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-orange-100 text-orange-600  ' : 'bg-neutral-100 text-neutral-500  '}`}>
                                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

