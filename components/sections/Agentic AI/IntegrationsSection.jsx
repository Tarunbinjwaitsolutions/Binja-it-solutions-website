"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { FaWhatsapp, FaHubspot, FaSalesforce, FaSlack, FaShopify, FaGoogle, FaMicrosoft } from "react-icons/fa6";
import { SiZapier, SiWoocommerce } from "react-icons/si";

const integrations = [
  { name: "WhatsApp", Icon: FaWhatsapp, color: "#25D366" },
  { name: "HubSpot", Icon: FaHubspot, color: "#FF7A59" },
  { name: "Salesforce", Icon: FaSalesforce, color: "#00A1E0" },
  { name: "Slack", Icon: FaSlack, color: "#4A154B" },
  { name: "Google Workspace", Icon: FaGoogle, color: "#4285F4" },
  { name: "Microsoft 365", Icon: FaMicrosoft, color: "#00A4EF" },
  { name: "Zapier", Icon: SiZapier, color: "#FF4A00" },
  // { name: "Make", Icon: SiMake, color: "#161616" }, 
  { name: "Shopify", Icon: FaShopify, color: "#95BF47" },
  { name: "WooCommerce", Icon: SiWoocommerce, color: "#96588A" },
  // { name: "Custom APIs", Icon: Link2, color: "#6B7280" }
];

export default function IntegrationsSection() {
  return (
    <section className="py-24 px-8 lg:px-16 overflow-hidden relative transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/3 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Integrates With Your Favorite Tools
            </h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              Our AI solutions plug directly into your existing software stack, acting as the intelligent glue that automates actions across platforms without replacing your core systems.
            </p>
          </motion.div>
        </div>

        <div className="lg:w-2/3 w-full grid grid-cols-3 sm:grid-cols-4 gap-6 z-10 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md bg-orange-500/10 blur-[100px] pointer-events-none rounded-full" />

          {integrations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  duration: 3 + (i % 3) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: 5,
                    boxShadow: `0 10px 30px ${item.color}30`,
                  }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-sm border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative group overflow-hidden"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
                  aria-label={item.name}
                  title={item.name}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" style={{ backgroundColor: item.color }} />
                  <item.Icon size={42} color={item.color} className="drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
