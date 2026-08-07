"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I used to spend a full afternoon writing captions for every platform. Now it's maybe 20 minutes, and honestly Binjwa's suggestions sound more 'on-brand' than some of my own drafts did.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow",
    avatar: "/professional-woman-diverse.png",
  },
  {
    quote: "The multi-platform posting is the real win for us. One idea in, multiple formats out—straight to Instagram, TikTok, Threads, and WhatsApp. Our engagement's up 150% since we started.",
    author: "Marcus Johnson",
    role: "Social Media Manager",
    company: "GrowthLabs",
    avatar: "/professional-man.jpg",
  },
  {
    quote: "Running an agency means every client wants their own look. White-labeling this made it feel like our own tool, not a plugin.",
    author: "Emily Rodriguez",
    role: "Agency Owner",
    company: "Creative Spark",
    avatar: "/professional-woman-2.png",
  },
];

const companies = ["TechFlow", "GrowthLabs", "Creative Spark", "InnovateCo", "BrandWorks", "Digital Edge"];

export function LandingSocialProof() {
  return (
    <section className="py-24 px-6 bg-[#09090B] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Real Teams, Real Time Saved
          </motion.h2>
        </div>

        {/* Company logos */}
        <div className="flex flex-wrap items-center justify-center gap-12 mb-20 opacity-50">
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 0.6, delay: 0.2 + index * 0.1 } }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-100"
            >
              {company}
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const isLeft = index === 0;
            const isCenter = index === 1;

            const initialTransform = isCenter
              ? { opacity: 0, scale: 0.5 }
              : isLeft
                ? { opacity: 0, x: -200, rotateY: -30 }
                : { opacity: 0, x: 200, rotateY: 30 };

            const whileInView = isCenter
              ? { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.6, ease: "backOut" } }
              : { opacity: 1, x: 0, rotateY: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8, delay: 0.8 } };

            return (
              <motion.div
                key={index}
                initial={initialTransform}
                whileInView={whileInView}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-[#1A1A1A] rounded-xl p-6 shadow-md border border-white/5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center text-white text-lg font-bold">
                    {testimonial.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-[#F16522]">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">"{testimonial.quote}"</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
