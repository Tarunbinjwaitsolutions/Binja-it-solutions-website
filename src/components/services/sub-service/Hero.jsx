"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor } from "lucide-react";
import Image from "next/image";

export default function Hero({ data }) {
  if (!data) return null;

  return (
    <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden flex items-center bg-[var(--bg-main)]">
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.05 }}
        transition={{ duration: 10, ease: "linear" }}
      >
        {data.image ? (
          <Image
            src={data.image}
            alt={data.name || data.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <Monitor size={120} className="text-orange-500/20" strokeWidth={1.5} />
          </div>
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-orange-400 mb-8 font-medium">
          {data.breadcrumbs?.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <Link href={crumb.url} className="hover:text-orange-300 transition-colors">
                {crumb.name}
              </Link>
              {idx < data.breadcrumbs.length - 1 && <span>›</span>}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {data.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 font-light border-l-4 border-orange-500 pl-4 py-1">
            {data.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mt-10">
            <Link href="/contact" className="inline-flex items-center justify-center h-14 px-8 text-lg font-bold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.6)] hover:-translate-y-1 w-full sm:w-auto">
              Book Your Demo
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center h-14 px-8 text-lg font-bold bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
