"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { submitContactForm } from "@/lib/api/contact";

const ContactForm = ({ initialMessage = "", onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: initialMessage,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If initialMessage changes (e.g. modal opens with different product), update state
  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Sending message...");

    try {
      const result = await submitContactForm(formData);
      toast.success(result.message || "Message sent successfully!", {
        id: toastId,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.message || "An error occurred.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl border-none focus:ring-2 focus:ring-orange-400 shadow-inner"
          style={{ backgroundColor: "var(--form-bg)", color: "var(--text-primary)" }}
        />
      </div>

      <div className="space-y-2">
        <label className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
          Your Message <span className="text-orange-500">*</span>
        </label>
        <textarea
          name="message"
          rows="5"
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
        className="w-full md:w-auto bg-orange-400 hover:bg-orange-500 text-black font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:scale-95 disabled:bg-neutral-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
