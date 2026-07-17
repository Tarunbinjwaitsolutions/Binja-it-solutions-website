"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote, Mail } from "lucide-react";
const founder1 = "/assets/images/founder1.jpeg";
const founder2 = "/assets/images/founder2.jpeg";

const founders = [
  {
    name: "Rakhi Binjwa",
    role: "Founder of Binjwa IT Solutions",
    email: "binjwaitsolutions@gmail.com",
    message:
      "At Binjwa IT Solutions, we’re committed to building a solid foundation for our clients. As Founder, I oversee each project with a focus on clarity, creativity, and strategic execution. We don’t just deliver services; we craft solutions tailored to your goals and stand by you as a trusted partner.",
    image: founder1, // Replace with actual path
  },
  {
    name: "Vijay Binjwa",
    role: "Co-Founder of Binjwa IT Solutions",
    email: "binjwaitsolutions@gmail.com",
    message:
      "Our mission is simple yet powerful: to empower businesses with digital solutions that are reliable, cost-effective, and built for the future. We provide end-to-end services from developing intuitive websites to ensuring your compliance documentation is in perfect order.",
    image: founder2, // Replace with actual path
  },
];

const FoundersMessage = () => {
  return (
    <section className="py-12 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-orange-500" />
            <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs">
              Leadership
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold leading-tight">
            Message From <span style={{ color: "var(--text-muted)" }}> The Founders</span>
          </h2>
        </div>

        {/* Founders Grid */}
        <div className="flex flex-col gap-10 md:gap-32">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-16`}
            >
              {/* Image Column with Decorative Elements */}
              <div className="lg:w-1/4 relative group">
                <div className="absolute -inset-4 border rounded-4xl transition-transform duration-500 group-hover:scale-105" style={{ borderColor: "var(--border)" }} />
                <div className="relative aspect-4/5 overflow-hidden rounded-4xl border-4" style={{ borderColor: "var(--border)" }}>
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-orange-500 p-6 rounded-2xl shadow-xl hidden lg:block">
                  <Quote size={32} className="text-white fill-white/20" />
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:w-1/2">
                <h3 className="text-4xl font-bold mb-2">{founder.name}</h3>
                <p className="text-orange-400 font-semibold mb-6 flex items-center gap-3">
                  {founder.role}
                  <span className="h-1 w-1/20 rounded-full" style={{ backgroundColor: "var(--bg-primary)" }} />
                  <a
                    href={`mailto:${founder.email}`}
                    className="text-white/40 hover:text-orange-400 transition-colors"
                  >
                    <Mail size={18} />
                  </a>
                </p>

                <div className="relative">
                  <p className="text-xl leading-relaxed font-light italic relative z-10" style={{ color: "var(--text-muted)" }}>
                    "{founder.message}"
                  </p>
                  <div className="absolute -top-10 -left-10 text-[120px] font-serif select-none z-0" style={{ color: "var(--border)" }}>
                    “
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-6">
                  <div className="h-0.5 w-20 bg-linear-to-r from-orange-500 to-transparent" />
                  <span className="text-xs uppercase tracking-widest text-white/40">
                    Binjwa IT Solutions
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersMessage;
