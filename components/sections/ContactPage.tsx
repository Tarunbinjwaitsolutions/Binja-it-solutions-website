"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Sending message...");

    try {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message || "Message sent successfully!", {
          id: toastId,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorResult = await response.json().catch(() => ({
          message: "An unexpected error occurred. Please try again.",
        }));
        throw new Error(errorResult.message);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <li>Discover the capabilities and get answers to your questions</li>
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
                <div className="flex items-center gap-4 group">
                  <div className="bg-orange-400 p-3 rounded-lg shadow-md group-hover:bg-orange-500 transition-colors">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
                    Block B, Tf-14, Signet Plaza, Gotri, Vadodara, Gujarat. India
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="bg-orange-400 p-3 rounded-lg shadow-md group-hover:bg-orange-500 transition-colors">
                  <Phone size={24} className="text-white" />
                </div>
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>+91 9826656189</span>
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>+91 8103174722</span>
                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>+91 7974147736</span>
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
          <div className="p-10 rounded-3xl shadow-[20px_20px_0px_0px_rgba(0,0,0,0.15)] relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: "var(--form-card-bg)" }}>
            {/* Subtle Grid Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="space-y-2">
                <label className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-orange-400 shadow-inner"
                  style={{ backgroundColor: "var(--form-bg)", color: "var(--text-primary)" }}
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  Your Email <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-orange-400 shadow-inner resize-none"
                  style={{ backgroundColor: "var(--form-bg)", color: "var(--text-primary)" }}
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  Your Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-orange-400 shadow-inner resize-none"
                  style={{ backgroundColor: "var(--form-bg)", color: "var(--text-primary)" }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:scale-95 disabled:bg-neutral-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
