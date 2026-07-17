"use client";
import React from "react";
import { motion } from "framer-motion";
const focus = "/assets/images/focus.png";

export default function FullStackHero() {
  return (
    <section className="relative pt-30 md:pt-0 py-12 px-8 lg:px-16 overflow-hidden flex lg:h-screen justify-center items-center" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-orange-500" />
            <span className="text-orange-500 font-bold tracking-widest uppercase text-xs">
              Engineering Excellence
            </span>
          </div>
          <h1 className="text-3xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Web & App <br />
            <span style={{ color: "var(--text-muted)" }}>Development</span>
          </h1>
          <p className="md:text-xl leading-relaxed max-w-xl" style={{ color: "var(--text-muted)" }}>
            We build scalable, high-performance digital ecosystems using modern
            frameworks like React, Node.js, and MongoDB, backed by secure AWS
            cloud infrastructure.
          </p>
        </motion.div>

        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0  rounded-full" />
          <img
            src={focus}
            alt="Development Focus"
            className="relative z-10 w-full scale-110"
          />
        </div>
      </div>
    </section>
  );
}
