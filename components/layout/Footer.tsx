"use client";

import React from "react";
import Link from "next/link";
import { Youtube, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Footer: React.FC = () => {
  const integrations = [
    { name: "Web Development", path: "/full-stack-development" },
    { name: "Mobile App Development", path: "/full-stack-development" },
    { name: "AI Automation", path: "/ai-solutions" },
    { name: "CRM Development", path: "/full-stack-development" },
    { name: "ERP Solutions", path: "/full-stack-development" },
    { name: "Digital Marketing", path: "/digital-marketing" },
    { name: "SEO Services", path: "/digital-marketing" },
    { name: "Cloud Solutions", path: "/full-stack-development" },
    { name: "UI/UX Design", path: "/full-stack-development" },
  ];

  const companyLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/ai-solutions" }, // Map to AI solutions or general services
    { name: "Portfolio", path: "/#portfolio" },  // Map to homepage portfolio section anchor
    { name: "Case Studies", path: "/ai-solutions#case-studies" }, // Map to case studies
    { name: "Blog", path: "/blogs" },
    { name: "Careers", path: "/jobs" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/binjwa-it-solutions-pvt-ltd/posts/?feedView=all" },
    { icon: FaInstagram, href: "https://www.instagram.com/binjwaitsolutions/" },
    { icon: FaXTwitter, href: "https://x.com/BinjwaITSolutio?t=RiZkuNAkfF1y2zY6hdegtQ&s=08" },
    { icon: FaFacebookF, href: "https://www.facebook.com/people/Binjwaitsolutions/61577198437265/" },
    { icon: Youtube, href: "https://www.youtube.com/@BinjwaITCompleteSolutions" },
  ];

  return (
    <footer className="text-sm py-4 transition-colors duration-300" style={{ backgroundColor: "var(--footer-bg)", borderTop: "var(--footer-border)" }}>
      <motion.div
        className="container mx-auto px-6 lg:px-10 max-w-7xl"
        variants={staggerContainer as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Main Grid / Flex */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-8 lg:gap-6 xl:gap-8 items-start mb-10 w-full">

          {/* Company Info */}
          <motion.div variants={fadeInUp as any} className="flex flex-col space-y-4 lg:w-[280px] xl:w-[320px]">
            <Link href="/" className="flex items-center gap-2 shrink-0 cursor-pointer rounded-2xl px-2 w-fit transition-colors hover:scale-105 duration-300" style={{ backgroundColor: "var(--logo-bg)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Binjwa IT Solutions" className="h-16 object-contain" />
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: "var(--footer-text)" }}>
              Transforming businesses through AI-powered automation, custom software development, web solutions, and digital innovation. We help startups, SMEs, and enterprises streamline operations, improve customer experiences, and accelerate growth.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp as any} className="lg:w-auto">
            <p className="font-medium mb-4 text-base tracking-wide text-white">Services</p>
            <ul className="space-y-2 text-xs" style={{ color: "var(--footer-text)" }}>
              {integrations.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="inline-block hover:text-orange-400 hover:translate-x-1 transition-all duration-300">{link.name}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp as any} className="lg:w-auto">
            <h4 className="font-medium mb-4 text-base tracking-wide text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs" style={{ color: "var(--footer-text)" }}>
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="inline-block hover:text-orange-400 hover:translate-x-1 transition-all duration-300">{link.name}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information + Google Map */}
          <motion.div variants={fadeInUp as any} className="md:col-span-2 lg:w-auto flex flex-col xl:flex-row gap-5 xl:gap-5 items-start">

            {/* LEFT SIDE: Contact Details */}
            <div className="flex flex-col space-y-6 w-full xl:flex-1 text-xs">
              <h3 className="font-medium mb-4 text-base tracking-wide text-white">Contact Us</h3>

              <div className="flex items-start text-xs gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-orange-500" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold tracking-wide text-white">Head Office</span>
                  <span style={{ color: "var(--footer-text)" }}>301, Atulya IT Park,<br />Indore, Madhya Pradesh, India</span>
                </div>
              </div>

              <div className="flex items-start text-xs gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-orange-500" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-xs tracking-wide text-white" >Branch Office</span>
                  <span style={{ color: "var(--footer-text)" }}>Block B, TF-14, Signet Plaza,<br />Gotri, Vadodara, Gujarat, India</span>
                </div>
              </div>

              <div className="flex items-start text-xs gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={14} className="text-orange-500" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold tracking-wide text-white">Email</span>
                  <span style={{ color: "var(--footer-text)" }}>binjwaitsolutions@gmail.com</span>
                  <span style={{ color: "var(--footer-text)" }}>info@binjwaitsolutions.com</span>
                </div>
              </div>

              <div className="flex items-start text-xs gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={14} className="text-orange-500" />
                </div>
                <div className="flex flex-col space-y-1 text-xs">
                  <span className="font-semibold tracking-wide text-white" >Phone</span>
                  <span style={{ color: "var(--footer-text)" }}>+91 98266 56189</span>
                  <span style={{ color: "var(--footer-text)" }}>+91 81031 74722</span>
                  <span style={{ color: "var(--footer-text)" }}>+91 7974147736</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Embedded Google Map & Connect */}
            <div className="w-full xl:w-[300px] shrink-0 flex flex-col space-y-6 pt-1">

              {/* Map */}
              <div className="w-full h-[220px] rounded-[15px] overflow-hidden border shadow-sm relative group" style={{ borderColor: "var(--footer-border)", backgroundColor: "var(--footer-bg)" }}>
                <div className="absolute inset-0 flex items-center justify-center -z-10" style={{ backgroundColor: "var(--bg-alt)" }}>
                  <a href="https://maps.google.com/maps?q=Binjwa+IT+Solutions,+301,+Atulya+IT+Park,+Indore,+Madhya+Pradesh,+India" target="_blank" rel="noreferrer" className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md shadow hover:bg-orange-600 transition-colors">
                    View on Google Maps
                  </a>
                </div>
                <iframe
                  src="https://maps.google.com/maps?q=Binjwa+IT+Solutions,+301,+Atulya+IT+Park,+Indore,+Madhya+Pradesh,+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Binjwa IT Solutions Location"
                  className="absolute inset-0 w-full h-full pointer-events-auto"
                ></iframe>
              </div>

              {/* Connect With Us */}
              <div className="flex flex-col w-full mt-3 ml-3">
                <div className="flex flex-row flex-wrap gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-300 hover:!bg-orange-500 hover:!border-orange-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                      >
                        <Icon className="group-hover:!text-white transition-colors duration-300" style={{ color: "var(--text-muted)" }} size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

          </motion.div>

        </div>

        <motion.div variants={fadeInUp as any} className="border-t pt-4 pb-2 text-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="space-y-1 text-xs">
            <p style={{ color: "var(--footer-text)" }}>&copy; 2026 Binjwa IT Solutions. All Rights Reserved.</p>
            <p style={{ color: "var(--footer-text)" }}>Empowering Businesses with AI, Automation &amp; Digital Innovation.</p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
