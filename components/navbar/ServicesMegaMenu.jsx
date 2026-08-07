"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { servicesData } from "../../data/services";

export default function ServicesMegaMenu({ onClose }) {
  const menuRef = useRef(null);
  const [origin, setOrigin] = useState({ x: "50%", y: "0px" });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const linkEl = document.getElementById("nav-services-link");
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
        const isServicesLink = event.target.closest("#nav-services-link");
        if (!isServicesLink) {
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
            <h2 className="text-3xl font-bold text-white tracking-tight">Services</h2>
          </motion.div>

          {/* Grid Layout: Cascading Animation */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12"
          >
            {servicesData.map((service) => (
              <motion.div
                key={service.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="flex flex-col"
              >
                <Link href={`/services/${service.slug}`} className="mb-4 inline-block w-fit focus:outline-none group" onClick={onClose}>
                  <h3 className="text-lg font-semibold text-gray-100 transition-colors group-hover:text-orange-500">
                    {service.name}
                  </h3>
                  <div className="h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full mt-1"></div>
                </Link>

                <ul className="flex flex-col space-y-3">
                  {service.subServices.map((subService) => (
                    <li key={subService.slug}>
                      <Link
                        href={`/services/${service.slug}/${subService.slug}`}
                        className="text-[14px] font-medium text-gray-400 hover:text-orange-400 transition-colors duration-200 focus:outline-none block"
                        onClick={onClose}
                      >
                        {subService.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </>
  );
}
