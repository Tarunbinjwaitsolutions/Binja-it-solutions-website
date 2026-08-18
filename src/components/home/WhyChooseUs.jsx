"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const allInOne = '/assets/All-in-One.jpg';
const solutions = '/assets/chooseimage2.jpg';
const team = '/assets/type-4.jpg';
const finance = '/assets/chooseimage3.jpg';
const values = '/assets/Hire-our-people.png';
const support = '/assets/itservices.png';

const whyChooseData = [
    {
        id: "1/6",
        label: "End-to-end Product Development",
        title: "Innovative Solutions",
        points: [
            "We provide innovative solutions based on the most advanced technologies, intelligent automation, and industry practices that allow organizations to outshine their competitors.",
        ],
        badgeColor: "bg-emerald-600",
        image: allInOne,
    },
    {
        id: "2/6",
        label: "Strategic Collaboration",
        title: "Trusted Partnership",
        points: [
            "We consider it crucial to establish a strong relationship with our customers through our reliable assistance and effective communication.",
        ],
        badgeColor: "bg-blue-600",
        image: solutions,
    },
    {
        id: "3/6",
        label: "Dedicated Talent",
        title: "Expert Team",
        points: [
            "We have skilled experts who can provide knowledge about technology, compliance, taxation, and digital marketing for you to get customized solutions.",
        ],
        badgeColor: "bg-purple-600",
        image: team,
    },
    {
        id: "4/6",
        label: "Tailored Strategies",
        title: "Customized Approach",
        points: [
            "Each business has its own distinctiveness and requirements. We listen to your aspirations and make strategies accordingly.",
        ],
        badgeColor: "bg-orange-600",
        image: finance,
    },
    {
        id: "5/6",
        label: "Performance Focus",
        title: "Results-Driven Execution",
        points: [
            "In whatever service you avail yourself from us, whether it be development and automation or marketing and compliance, we emphasize delivering results.",
        ],
        badgeColor: "bg-rose-600",
        image: values,
    },
    {
        id: "6/6",
        label: "Ongoing Maintenance",
        title: "Continuous Support",
        points: [
            "We don’t just stop there. Our job is not over when your projects are completed but rather the beginning of ongoing support for your business.",
        ],
        badgeColor: "bg-cyan-600",
        image: support,
    },
];

const FeatureCard = ({ feature, isEven, index }) => {
    // Custom scroll animations
    const leftContentVariants = {
        hidden: { opacity: 0, x: isEven ? 40 : -40, y: 20 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const rightContentVariants = {
        hidden: { opacity: 0, x: isEven ? -40 : 40, y: 20 },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`relative w-full py-12 md:py-20 flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}
        >
            {/* Tablet Mockup Image Area */}
            <motion.div variants={leftContentVariants} className="w-full lg:w-1/2 flex justify-center items-center relative z-10">
                <div className="relative w-full max-w-[320px] sm:max-w-[400px]">
                    {/* Tablet Bezel Frame */}
                    <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-[3rem] p-3 shadow-2xl border-[4px] border-gray-200 flex items-center justify-center overflow-hidden">
                        {/* Screen Content */}
                        <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-gray-900">
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 320px, 400px"
                                priority={index <= 1}
                            />
                        </div>
                    </div>
                    {/* Decorative shadow below tablet */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/20 blur-2xl rounded-[100%]" />
                </div>
            </motion.div>

            {/* Text Content Area */}
            <motion.div variants={rightContentVariants} className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
                {/* Colored Badge */}
                <div className={`px-4 py-1.5 rounded-md text-sm font-semibold text-white mb-6 shadow-sm ${feature.badgeColor}`}>
                    {feature.label}
                </div>

                {/* Heading */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] text-gray-900">
                    {feature.title}
                </h3>

                {/* Description Paragraph */}
                <p className="text-lg mb-10 leading-relaxed max-w-lg text-gray-600">
                    {feature.points[0]}
                </p>

                {/* Explore Button */}
                {/* <button className="flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Explore More <ArrowRight size={18} />
                </button> */}
            </motion.div>
        </motion.div>
    );
};

const WhyChooseUsStack = () => {
    return (
        <section className="py-24 px-6 lg:px-20 transition-colors duration-300 relative overflow-hidden bg-gray-50">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[5%] left-[5%] w-96 h-96 opacity-30 blur-[120px] rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-blue-500/10 blur-[150px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
                        Why Businesses Choose <br />
                        <span style={{ color: "var(--accent)" }}>Binjwa IT Solutions</span>
                    </h2>
                </motion.div>

                {/* Alternating Feature Cards */}
                <div className="flex flex-col gap-8 md:gap-16 lg:gap-24">
                    {whyChooseData.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} isEven={index % 2 !== 0} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsStack;
