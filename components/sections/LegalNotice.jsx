"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Eye,
  RefreshCcw,
  Bell,
  Globe,
  Mail,
  Phone,
  Cookie,
  FileText,
  Briefcase,
  Scale,
} from "lucide-react";

const LegalNotice = () => {
  const lastUpdated = "May 7, 2026";

  return (
    <div className="min-h-screen py-20 px-6 lg:px-16 font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
      
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 md:p-16 rounded-t-[2.5rem] border-x border-t border-orange-100 text-center transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-orange-50 rounded-2xl text-orange-500 mb-6">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-neutral-500 font-medium">
            Effective Date:{" "}
            <span className="text-orange-600">{lastUpdated}</span>
          </p>
          <div className="mt-8 max-w-2xl mx-auto text-neutral-600 leading-relaxed">
            Welcome to <strong>Binjwa IT Solution</strong>. Your privacy is
            important to us. This policy explains how we collect, use, protect,
            and process your information across our website, advertisements, and
            services.
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="p-8 md:p-16 border-x border-orange-100 space-y-16 transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>
          {/* 1. Information Collection */}
          <section id="collection">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">
                1. Information We Collect
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-orange-600 uppercase text-xs tracking-widest">
                  A. Contact
                </h4>
                <ul className="text-sm text-neutral-600 space-y-1 italic">
                  <li>Full Name, Email</li>
                  <li>Phone & WhatsApp Number</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-orange-600 uppercase text-xs tracking-widest">
                  B. Business
                </h4>
                <ul className="text-sm text-neutral-600 space-y-1 italic">
                  <li>Company & Industry</li>
                  <li>Project Requirements</li>
                  <li>Budget & Goals</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-orange-600 uppercase text-xs tracking-widest">
                  C. Technical
                </h4>
                <ul className="text-sm text-neutral-600 space-y-1 italic">
                  <li>IP & Browser Type</li>
                  <li>Meta Pixel / API Data</li>
                  <li>Usage Activity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* NEW: Compliance & Confidential Document Handling */}
          <section
            id="confidential-handling"
            className="bg-transparent p-8 rounded-4xl border border-neutral-200" style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 text-orange-600 rounded-lg shadow-sm border border-neutral-100" style={{ backgroundColor: "var(--bg-primary)" }}>
                <Briefcase size={24} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Compliance & Confidential Handling
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-neutral-700 leading-relaxed">
                As part of our compliance, registration, and business support
                services, <strong>Binjwa IT Solution</strong> may require
                clients to share sensitive documents. We treat all shared
                information with the highest level of confidentiality.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                    <FileText size={14} /> Documents We May Handle
                  </h4>
                  <ul className="text-sm text-neutral-600 grid grid-cols-2 gap-x-4 gap-y-1 italic">
                    <li>PAN Card</li>
                    <li>Aadhaar Card</li>
                    <li>GST Documents</li>
                    <li>Bank Details</li>
                    <li>Digital Signatures</li>
                    <li>Financial Records</li>
                    <li>Legal Agreements</li>
                    <li>Company Registration</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                    <Scale size={14} /> Data Protection Protocols
                  </h4>
                  <ul className="text-sm text-neutral-600 space-y-1 italic">
                    <li>Execution of Service Agreements</li>
                    <li>Non-Disclosure Agreements (NDA)</li>
                    <li>Strict Confidentiality Clauses</li>
                    <li>Authorized Business Use Only</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200 text-sm text-neutral-600">
                <p>
                  We implement administrative and technical safeguards to
                  prevent unauthorized access or disclosure. Clients remain
                  responsible for the accuracy and authenticity of submitted
                  documents. We reserve the right to suspend services if
                  fraudulent information is detected.
                </p>
              </div>
            </div>
          </section>

          {/* 3. AI Agent Disclosure */}
          <section
            id="ai-consent"
            className="relative overflow-hidden bg-orange-900 text-white p-8 md:p-12 rounded-4xl shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-orange-400 text-orange-900 rounded-lg">
                  <Bell size={24} />
                </div>
                <h2 className="text-2xl font-bold">
                  3. AI Calling Agent & Consent
                </h2>
              </div>
              <p className="text-orange-100 leading-relaxed mb-6">
                Binjwa IT Solution provides{" "}
                <strong>Agentic AI Calling Agent</strong> solutions. By
                submitting your details, you explicitly consent to receive:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Manual Comms",
                  "Automated Msg",
                  "WhatsApp",
                  "Service Calls",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-white/10 border border-white/20 p-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full" />
          </section>

          {/* 6. Cookies Policy Section */}
          <section
            id="cookies"
            className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 text-orange-500 rounded-lg shadow-sm" style={{ backgroundColor: "var(--bg-primary)" }}>
                <Cookie size={24} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">
                6. Cookies Policy
              </h2>
            </div>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              Our website uses cookies and similar tracking technologies to
              improve functionality, analyze visitor behavior, and support our
              remarketing campaigns.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />{" "}
                Improve website functionality
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />{" "}
                Analyze visitor behavior
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" /> Store
                user preferences
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />{" "}
                Advertising & Remarketing
              </li>
            </ul>
            <p className="mt-6 text-xs text-neutral-500 italic">
              You can disable cookies through your browser settings; however,
              some features of the website may not function properly.
            </p>
          </section>

          {/* 4. Meta Pixel & 5. No Selling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
                <Globe size={20} className="text-orange-500" /> 4. Meta &
                Third-Party
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We use Meta Pixel, Conversion API, and Google Analytics to
                measure ad performance. This helps us show you relevant content
                and improve marketing effectiveness.
              </p>
            </section>
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
                <Lock size={20} className="text-orange-500" /> 5. No Selling of
                Data
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-bold italic">
                Binjwa IT Solution does NOT sell, rent, lease, or trade your
                personal information or lead data to third parties.
              </p>
            </section>
          </div>

          {/* 7 & 8. User Rights & Security */}
          <section className="border-t border-neutral-100 pt-16">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4 text-neutral-900">
                  7. User Rights
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Access, correct, or delete your data at any time.
                </p>
                <div className="bg-neutral-900 p-5 rounded-2xl">
                  <p className="text-xs font-bold text-orange-400 uppercase mb-2">
                    Opt-Out Info:
                  </p>
                  <p className="text-sm text-white leading-relaxed">
                    Reply <strong>"STOP"</strong> to any WhatsApp or SMS
                    communication to unsubscribe.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4 text-neutral-900">
                  8. Data Security
                </h3>
                <p className="text-sm text-neutral-600 mb-4">
                  We use SSL encryption and secure AWS hosting to protect your
                  information.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["SSL Encryption", "Secure Hosting", "Firewalls"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase rounded-full border border-orange-100"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-neutral-900 text-white p-10 md:p-16 rounded-b-[2.5rem] border-x border-b border-neutral-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4 italic">
                Binjwa IT Solution
              </h2>
              <div className="flex flex-col gap-3 text-sm text-neutral-400">
                <a
                  href="Info@binjwaitsolutions.com"
                  className="flex items-center gap-3 hover:text-orange-400 transition-colors"
                >
                  <Mail size={16} /> binjwaitsolutions@gmail.com
                </a>
                <a
                  href="tel:9826656189"
                  className="flex items-center gap-3 hover:text-orange-400 transition-colors"
                >
                  <Phone size={16} /> +91 98266 56189
                </a>
                <a
                  href="tel:8103174722"
                  className="flex items-center gap-3 hover:text-orange-400 transition-colors"
                >
                  <Phone size={16} /> +91 81031 74722
                </a>
                <a
                  href="https://www.binjwaitsolutions.com"
                  className="flex items-center gap-3 hover:text-orange-400 transition-colors"
                >
                  <Globe size={16} /> www.binjwaitsolutions.com
                </a>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">
                Compliance Notice
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Policy updates will be posted on this page with an updated
                effective date. Users are encouraged to review this policy
                periodically.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalNotice;
