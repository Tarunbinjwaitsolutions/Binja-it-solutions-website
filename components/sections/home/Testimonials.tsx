"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { staggerContainer, fadeLeft, fadeInUp } from "@/lib/animations";
import Image from "next/image";

interface Testimonial {
  type: "text" | "video";
  avatar: string;
  text?: string;
  name: string;
  role: string;
  thumbnail?: string;
}

const testimonials: Testimonial[] = [
  { type: "text", avatar: "https://i.pravatar.cc/150?img=48", text: "Partnering with this team was a game-changer for our brand. Their designs are fresh, modern and tailored perfectly to our audience.", name: "Meenal Thakkar", role: "Mumbai" },
  { type: "text", avatar: "https://i.pravatar.cc/150?img=32", text: "From branding to website design, every piece they created was on-point. Highly recommended for anyone looking for serious results with a creative touch.", name: "Divya Kapoor", role: "Hyderabad" },
  { type: "text", avatar: "https://i.pravatar.cc/150?img=14", text: "I was blown away by their creativity and professionalism. They understood our vision instantly! Our website traffic and engagement doubled after the redesign.", name: "Rakesh Yadav", role: "Jaipur" },
  { type: "text", avatar: "https://i.pravatar.cc/150?img=60", text: "The team delivered beyond expectations. The seamless communication and the outstanding end product made the entire process a breeze.", name: "Sunil Verma", role: "Delhi" },
  { type: "text", avatar: "https://i.pravatar.cc/150?img=52", text: "Their expertise in digital transformation has significantly improved our internal workflows and enhanced our online presence. A reliable partner indeed.", name: "Anjali Deshmukh", role: "Pune" },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 overflow-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg-alt)" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp as any}
        className="px-8 lg:px-16 mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-medium mt-4 leading-tight font-bold" style={{ color: "var(--text-primary)" }}>
          Client Testimonials
        </h2>
      </motion.div>

      <motion.div
        className="flex gap-6 px-8 lg:px-16 overflow-x-auto no-scrollbar pb-10"
        variants={staggerContainer as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeLeft as any}
            whileHover={{ y: -5 }}
            className="min-w-[320px] md:min-w-[400px] h-125 rounded-xl overflow-hidden relative transition-transform duration-300"
          >
            {item.type === "text" ? (
              <div className="h-full p-10 flex flex-col justify-between transition-all duration-300 border border-transparent hover:border-orange-500/30 hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)]" style={{ backgroundColor: "var(--bg-card)" }}>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.avatar} className="w-12 h-12 rounded-full mb-8 grayscale hover:grayscale-0 transition-all duration-500" alt={item.name} />
                  <p className="text-lg leading-relaxed font-light italic" style={{ color: "var(--text-secondary)" }}>
                    &quot;{item.text}&quot;
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif italic mb-1" style={{ color: "var(--text-primary)" }}>{item.name}</p>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{item.role}</p>
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full group cursor-pointer border border-transparent hover:border-orange-500/30 rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Video testimonial" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute top-8 left-8 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.avatar} className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-500" style={{ backgroundColor: "var(--bg-primary)" }}>
                    <Play fill="white" size={20} className="ml-1 group-hover:fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 text-white transition-transform duration-300 group-hover:translate-x-2">
                  <p className="text-2xl font-serif italic mb-1">{item.name}</p>
                  <p className="text-xs opacity-80 uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
