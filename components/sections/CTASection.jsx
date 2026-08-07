"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";;
import Magnetic from '@/components/ui/Magnetic';

const CTASection = ({ title, description, primaryBtn, secondaryBtn }) => {
  return (
    <div className="py-24 relative overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-orange-500/5 dark:to-orange-500/10"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-12 md:p-16 shadow-2xl border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryBtn && (
              <Magnetic>
                <Link href={primaryBtn.link}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  {primaryBtn.text}
                </Link>
              </Magnetic>
            )}
            {secondaryBtn && (
              <Magnetic>
                <Link href={secondaryBtn.link}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all w-full sm:w-auto"
                >
                  {secondaryBtn.text}
                </Link>
              </Magnetic>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
