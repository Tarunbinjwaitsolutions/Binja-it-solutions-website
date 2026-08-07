"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { servicesData } from "../../data/services";

export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAccordion(index);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
      {servicesData.map((service, index) => {
        const isOpen = openIndex === index;
        // Make the 3rd odd item span 2 columns on desktop to look balanced
        const isLastOdd = index === servicesData.length - 1 && servicesData.length % 2 !== 0;

        return (
          <div
            key={service.slug}
            className={`flex flex-col theme-bg-card border transition-all duration-300 rounded-2xl overflow-hidden shadow-sm ${
              isOpen 
                ? "border-[var(--accent)] shadow-[0_8px_30px_color-mix(in_srgb,var(--accent)_15%,transparent)]" 
                : "theme-border hover:border-[var(--accent)] hover:shadow-md"
            } ${isLastOdd ? "md:col-span-2" : ""}`}
          >
            {/* Header (Clickable Trigger) */}
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => toggleAccordion(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="p-6 md:p-8 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              <div>
                <h2 className={`text-2xl font-bold transition-colors ${isOpen ? "theme-accent" : "theme-text"}`}>
                  {service.name}
                </h2>
                <p className="theme-text-secondary mt-2 line-clamp-1">
                  {service.description}
                </p>
              </div>
              <div 
                className={`flex-shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "bg-[var(--accent)] text-white rotate-180" : "bg-gray-100 dark:bg-white/5 theme-text-secondary"
                }`}
              >
                <ChevronDown size={20} />
              </div>
            </div>

            {/* Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-8 pt-2 border-t theme-border mx-6 md:mx-8">
                    <p className="theme-text-secondary mb-6 italic">
                      Explore our specialized {service.name.toLowerCase()} offerings below:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.subServices.map((sub) => (
                        <li key={sub.slug}>
                          <Link 
                            href={`/services/${service.slug}/${sub.slug}`}
                            className="group flex flex-col p-4 rounded-xl border theme-border hover:border-[var(--accent)] transition-all duration-300 hover:shadow-md theme-bg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold theme-text group-hover:theme-accent transition-colors">
                                {sub.name}
                              </span>
                              <ArrowRight size={16} className="theme-text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:theme-accent transition-all duration-300" />
                            </div>
                            <span className="text-sm theme-text-muted">
                              Professional {sub.name.toLowerCase()} services to elevate your digital presence.
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 pt-6 border-t theme-border flex justify-end">
                      <Link 
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[var(--accent)] text-white font-medium hover:bg-orange-600 transition-colors shadow-md hover:shadow-[0_4px_15px_color-mix(in_srgb,var(--accent)_30%,transparent)]"
                      >
                        View All {service.name} Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
