"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function IndustryFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mb-24">
      <h2 className="text-4xl font-bold theme-text mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span className="font-bold theme-text pr-8 group-hover:text-orange-500 transition-colors">
                  {faq.q}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-orange-100 text-orange-500' : 'theme-bg-alt theme-text-secondary'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
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
                    <div className="px-6 pb-6 theme-text-secondary leading-relaxed border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
