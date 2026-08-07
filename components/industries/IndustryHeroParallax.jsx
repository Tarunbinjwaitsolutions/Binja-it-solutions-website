"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getIndustryHeroImage } from '../../config/industryImages';

export default function IndustryHeroParallax({ industry }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Background moves slightly slower, text moves slightly faster
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const imageUrl = industry.image || getIndustryHeroImage(industry.slug);

  return (
    <div ref={ref} className="relative w-full min-h-[100svh] overflow-hidden flex items-center bg-[var(--bg-main)]">
      {/* Background Parallax Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        style={{ y: yBg }}
      >
        <Image
          src={imageUrl}
          alt={industry.name}
          fill
          className="object-cover object-center w-full h-full scale-105"
          sizes="100vw"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>

      {/* Foreground Content Layer */}
      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-20 pt-16"
        style={{ y: yText, opacity: opacityText }}
      >
        <Link href="/industries" className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-8 font-medium transition-colors focus:outline-none">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Industries
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            {industry.name} Industry
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {industry.name} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Solutions</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 font-light border-l-4 border-orange-500 pl-4 py-1">
            {industry.heroTagline}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
