"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Check } from 'lucide-react';

const ProductCard = ({ name, description, features, detailsLink, image, onTryDemo }) => {

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="theme-bg-card rounded-[2rem] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border theme-border hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group"
    >
      {image && (
        <div className="h-64 w-full overflow-hidden theme-bg-secondary relative">
          <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
      )}
      
      <div className="p-8 sm:p-10 flex flex-col flex-grow">
        <h3 className="text-[28px] font-extrabold mb-3 theme-text tracking-tight">{name}</h3>
        <p className="mb-8 theme-text-secondary leading-relaxed text-[15px]">{description}</p>
        
        <div className="mb-10 flex-grow">
          <h4 className="text-[13px] font-bold uppercase tracking-[0.1em] mb-5 theme-text-muted">KEY FEATURES</h4>
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <Check className="theme-accent mr-3 shrink-0 mt-0.5" strokeWidth={3} size={18} />
                <span className="theme-text-secondary text-[15px]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <button 
            onClick={onTryDemo}
            className="flex-1 flex items-center justify-center gap-2 theme-accent-bg hover:bg-[#E05A1A] text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-[15px]"
          >
            <PlayCircle size={18} strokeWidth={2.5} />
            Try Demo
          </button>
          <Link href={detailsLink}
            className="flex-1 flex items-center justify-center gap-2 bg-transparent border-[1.5px] theme-border hover:theme-bg-alt theme-text py-3.5 px-6 rounded-xl font-bold transition-all text-[15px]"
          >
            View Details
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
