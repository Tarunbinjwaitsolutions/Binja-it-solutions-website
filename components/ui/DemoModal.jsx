"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";

const DemoModal = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: "var(--form-card-bg)" }}
        >
          {/* Subtle Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="relative z-10 p-8 sm:p-10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors group"
            >
              <X size={24} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white" />
            </button>

            <div className="mb-8 pr-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                Request Demo
              </h2>
              <p className="text-base" style={{ color: "var(--text-muted)" }}>
                {productName
                  ? `Get a personalized walkthrough of ${productName}.`
                  : "Get a personalized walkthrough of our platform."}
              </p>
            </div>

            <ContactForm
              initialMessage={productName ? `I am interested in a demo for ${productName}.` : "I am interested in a demo."}
              onSuccess={onClose}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DemoModal;
