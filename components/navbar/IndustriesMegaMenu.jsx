"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, HeartPulse, Landmark, Plane, Car, ShoppingCart, Building, Leaf, Factory, GraduationCap, Truck, Clapperboard, ArrowRight } from "lucide-react";
import { industriesData } from "../../data/industries";

export default function IndustriesMegaMenu({ onClose }) {
  const menuRef = useRef(null);
  const [origin, setOrigin] = useState({ x: "50%", y: "0px" });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const linkEl = document.getElementById("nav-industries-link");
    if (linkEl) {
      const rect = linkEl.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      // The menu is fixed at top-[80px], so we calculate the y relative to that container
      const y = (rect.top + rect.height / 2) - 80;
      setOrigin({ x: `${x}px`, y: `${y}px` });
    }
    setIsMounted(true);
  }, []);

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
        className="fixed inset-0 top-[80px] z-40 bg-black/40"
      />

      {/* Mega Menu Panel */}
      <motion.div
        ref={menuRef}
        initial={{ clipPath: `circle(0px at ${origin.x} ${origin.y})`, opacity: 1 }}
        animate={{ 
          clipPath: isMounted ? `circle(150% at ${origin.x} ${origin.y})` : `circle(0px at ${origin.x} ${origin.y})`, 
          opacity: 1,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }}
        exit={{ 
          clipPath: `circle(0px at ${origin.x} ${origin.y})`, 
          opacity: 1,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
        }}
        className="fixed top-[80px] left-0 w-full z-50 bg-[#0f172a] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden text-white"
        style={{ WebkitClipPath: isMounted ? `circle(0px at ${origin.x} ${origin.y})` : `circle(0px at ${origin.x} ${origin.y})` }}
      >
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-10 relative">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 hover:rotate-90 hover:scale-110 transition-all duration-300 text-gray-400 hover:text-white focus:outline-none"
          >
            <X size={28} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold text-white tracking-tight">Industries</h2>
          </motion.div>

          {/* Grid Layout: Cascading Animation */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8"
          >
            {columns.flatMap(c => c.items).map((industry) => (
              <motion.div
                key={industry.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="flex flex-col"
              >
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex items-center gap-4 py-1 focus:outline-none"
                  onClick={onClose}
                >
                  <div className="text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                    {industry.icon}
                  </div>
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
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
