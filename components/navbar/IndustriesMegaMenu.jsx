"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, HeartPulse, Landmark, Plane, Car, ShoppingCart, Building, Leaf, Factory, GraduationCap, Truck, Clapperboard, ArrowRight } from "lucide-react";
import { industriesData } from "../../data/industries";

export default function IndustriesMegaMenu({ onClose }) {
  const menuRef = useRef(null);

  // Close on Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        const isIndustriesLink = event.target.closest("#nav-industries-link");
        if (!isIndustriesLink) {
          onClose();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Close on ESC Key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Helper to safely find the industry data to get the slug and attach an icon
  const getIndustry = (nameQuery, icon) => {
    const ind = industriesData.find(ind => ind.name.toLowerCase().includes(nameQuery.toLowerCase()));
    if (ind) {
      return { ...ind, icon };
    }
    return null;
  };

  const columns = [
    {
      title: "Column 1",
      items: [
        getIndustry("Healthcare", <HeartPulse size={20} strokeWidth={1.5} />),
        getIndustry("Banking", <Landmark size={20} strokeWidth={1.5} />),
        getIndustry("Hospitality", <Plane size={20} strokeWidth={1.5} />),
        getIndustry("Automotive", <Car size={20} strokeWidth={1.5} />)
      ].filter(Boolean)
    },
    {
      title: "Column 2",
      items: [
        getIndustry("E-commerce", <ShoppingCart size={20} strokeWidth={1.5} />),
        getIndustry("Real Estate", <Building size={20} strokeWidth={1.5} />),
        getIndustry("Agriculture", <Leaf size={20} strokeWidth={1.5} />),
        getIndustry("Manufacturing", <Factory size={20} strokeWidth={1.5} />)
      ].filter(Boolean)
    },
    {
      title: "Column 3",
      items: [
        getIndustry("Education", <GraduationCap size={20} strokeWidth={1.5} />),
        getIndustry("Logistics", <Truck size={20} strokeWidth={1.5} />),
        getIndustry("Media", <Clapperboard size={20} strokeWidth={1.5} />)
      ].filter(Boolean)
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 top-[80px] z-40 bg-black/20"
      />

      {/* Mega Menu Panel */}
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        exit={{
          opacity: 0,
          y: -10,
          scale: 0.98,
          transition: { duration: 0.2, ease: "easeIn" }
        }}
        className="fixed top-[90px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1050px] z-50 bg-[#0b1121] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] rounded-[16px] border border-white/5 overflow-hidden text-white"
      >
        <div className="px-8 py-8 md:px-12 md:py-10 relative">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 hover:rotate-90 hover:scale-110 transition-all duration-300 text-gray-500 hover:text-white focus:outline-none"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-8 border-b border-white/5 pb-4"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Industries</h2>
          </motion.div>

          {/* Column Layout for Industries */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8"
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-5">
                {col.items.map((industry) => (
                  <motion.div
                    key={industry.slug}
                    variants={{
                      hidden: { opacity: 0, y: 5 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                    }}
                  >
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="group flex items-center gap-4 py-1 focus:outline-none"
                      onClick={onClose}
                    >

                      <span className="flex-1 text-[16px] font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                        {industry.name}
                      </span>
                      <ArrowRight
                        size={18}
                        className="text-orange-500 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
