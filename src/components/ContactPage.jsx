"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

const ContactPage = () => {
  return (
    <section className="min-h-screen py-24 px-8 lg:px-16 flex items-center transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-4xl leading-tight font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Contact Us
            </h1>
            <p className="text-xl leading-relaxed max-w-md" style={{ color: "var(--text-muted)" }}>
              Tell us a little bit about who you are, and we'll tell you a whole
              lot more about who we are.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Talk to our team today
            </h2>
            <ol className="space-y-4 list-decimal list-inside marker:font-bold" style={{ color: "var(--text-muted)" }}>
              <li>Understanding how our product may fulfill your need</li>
              <li>
                Discover the capabilities and get answers to your questions
              </li>
              <li>Get a customized quote</li>
            </ol>
          </div>

          <div className="space-y-8 pt-4">
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Find Binjwa IT Solutions
            </h2>
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-4 group">
                  <div className="bg-orange-400 p-3 rounded-lg shadow-md group-hover:bg-orange-500 transition-colors">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
                    301, Atulya IT park, Indore, Madhya Pradesh, India
                  </span>
                </div>
                <div className="flex items-center mt-5 gap-4 group">
                  <div className="bg-orange-400 p-3 rounded-lg shadow-md group-hover:bg-orange-500 transition-colors">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
                    Block B, Tf-14, Signet Plaza, Gotri, Vadodara, Gujarat.
                    India
                  </span>
                </div>
                {/* <div className="flex items-center gap-4 group">
                  <div className="bg-orange-400 p-3 rounded-lg shadow-md group-hover:bg-orange-500 transition-colors">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <span className="text-neutral-700 font-medium">
                    301, Atulya IT park, Indore, Madhya Pradesh, India
                  </span>
                </div> */}
              </div>

              <div className="flex items-center gap-4 group">
                <div className="bg-orange-400 p-3 rounded-lg shadow-md group-hover:bg-orange-500 transition-colors">
                  <Phone size={24} className="text-white" />
                </div>
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>+91 98266 56189</span>
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>+91 81031 74722</span>
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>+91 79741 47736</span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="bg-orange-400 p-3 rounded-lg shadow-md group-hover:bg-orange-500 transition-colors">
                  <Mail size={24} className="text-white" />
                </div>
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>binjwaitsolutions@gmail.com</span>
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>info@binjwaitsolutions.com</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Form Container with the Teal background and grid pattern */}
          <div className="p-10 rounded-3xl shadow-[20px_20px_0px_0px_rgba(0,0,0,0.15)] relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: "var(--form-card-bg)" }}>
            {/* Subtle Grid Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#000 0.5px, transparent 0.5px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
