"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { staggerContainer, fadeLeft, fadeInUp } from "@/lib/utils/animations";

import { getTestimonials } from "@/lib/utils/getTestimonials";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        getTestimonials().then(data => setTestimonials(data));
    }, []);

    // Handle scroll to update active dot
    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollLeft = scrollRef.current.scrollLeft;
        // The width of one card plus gap
        const itemWidth = scrollRef.current.children[0]?.clientWidth + 24 || 1;
        const index = Math.round(scrollLeft / itemWidth);
        setActiveIndex(prev => prev !== index ? index : prev);
    };

    // Scroll to a specific card
    const scrollToIndex = (index) => {
        if (!scrollRef.current) return;
        const itemWidth = scrollRef.current.children[0]?.clientWidth + 24;
        scrollRef.current.scrollTo({
            left: index * itemWidth,
            behavior: "smooth"
        });
    };

    const nextSlide = () => {
        if (activeIndex < testimonials.length - 1) {
            scrollToIndex(activeIndex + 1);
        }
    };

    const prevSlide = () => {
        if (activeIndex > 0) {
            scrollToIndex(activeIndex - 1);
        }
    };

    return (
        <section className="py-24 overflow-hidden transition-colors duration-300" style={{ backgroundColor: "var(--bg-alt)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={fadeInUp}
                    className="max-w-xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                        What Our Clients Say About Us
                    </h2>
                </motion.div>
                
                {/* Navigation Arrows */}
                <div className="flex gap-4 hidden sm:flex shrink-0">
                    <button 
                        onClick={prevSlide}
                        disabled={activeIndex === 0}
                        className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${activeIndex === 0 ? 'border-gray-300 text-gray-300 cursor-not-allowed dark:border-gray-700 dark:text-gray-700' : 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'}`}
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${activeIndex >= testimonials.length - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg'}`}
                        aria-label="Next testimonials"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Testimonials Carousel */}
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
                <motion.div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto no-scrollbar pb-10 snap-x snap-mandatory"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar
                >
                    {testimonials.map((item, index) => (
                        <motion.div 
                            key={index} 
                            variants={fadeLeft}
                            whileHover={{ y: -5 }}
                            // Width is roughly 1/3 of the container on large screens
                            className="w-[85vw] sm:w-[320px] lg:w-[calc(33.333%-16px)] shrink-0 h-auto rounded-2xl overflow-hidden relative transition-transform duration-300 snap-start flex"
                        >
                            {item.type === "text" ? (
                                <div className="w-full p-8 flex flex-col transition-all duration-300 border border-transparent hover:border-orange-500/30 hover:shadow-lg rounded-2xl" style={{ backgroundColor: "var(--bg-card)" }}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="relative w-14 h-14 shrink-0">
                                            <Image src={item.avatar} fill sizes="56px" className="rounded-full object-cover shadow-sm" alt={item.name} />
                                        </div>
                                        {/* Star Rating */}
                                        <div className="flex gap-1 text-orange-500 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < (item.rating || 5) ? "currentColor" : "none"} strokeWidth={i < (item.rating || 5) ? 0 : 2} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-base md:text-lg leading-relaxed font-light italic mb-8" style={{ color: "var(--text-secondary)" }}>
                                        "{item.text}"
                                    </p>
                                    {/* Footer Name / Role */}
                                    <div className="mt-auto pt-5 border-t border-gray-100 dark:border-gray-800">
                                        <p className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>{item.name}</p>
                                        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{item.role}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-[320px] md:h-[350px] relative group cursor-pointer border border-transparent hover:border-orange-500/30 rounded-2xl overflow-hidden">
                                    <Image src={item.thumbnail} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition-transform duration-700 group-hover:scale-110" alt="Video testimonial" />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                                    
                                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                        <div className="relative w-12 h-12">
                                            <Image src={item.avatar} fill sizes="48px" className="rounded-full border-2 border-white object-cover" alt="" />
                                        </div>
                                        <div className="flex gap-1 text-orange-400 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-500 bg-white/20 shadow-lg">
                                            <Play fill="white" size={24} className="ml-1" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6 text-white transition-transform duration-300 group-hover:translate-x-1">
                                        <p className="text-xl font-bold mb-1">{item.name}</p>
                                        <p className="text-xs uppercase tracking-widest opacity-90">{item.role}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-6 px-8">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={`transition-all duration-300 rounded-full ${activeIndex === index ? 'w-8 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-orange-400 dark:bg-gray-700'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            
            {/* Mobile Navigation Arrows */}
            <div className="flex justify-center gap-6 mt-8 sm:hidden">
                <button 
                    onClick={prevSlide}
                    disabled={activeIndex === 0}
                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${activeIndex === 0 ? 'border-gray-300 text-gray-300 cursor-not-allowed dark:border-gray-700 dark:text-gray-700' : 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white'}`}
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={nextSlide}
                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${activeIndex >= testimonials.length - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg'}`}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default Testimonials;
