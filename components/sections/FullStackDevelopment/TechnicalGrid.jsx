"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Smartphone, Database, Cloud, ChevronRight } from "lucide-react";

const serviceCategories = [
  {
    id: "web-dev",
    title: "Web Application Development",
    icon: <Globe className="text-orange-500" />,
    bgColor: "bg-orange-50",
    topics: [
      "Custom business websites",
      "Admin dashboards & portals",
      "SaaS platform development",
      "E-commerce development",
      "Responsive UI/UX implementation",
      "API integration",
    ],
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    icon: <Smartphone className="text-orange-500" />,
    bgColor: "bg-orange-50",
    topics: [
      "Android & iOS applications",
      "Cross-platform development",
      "Real-time notifications",
      "Secure authentication",
      "App maintenance & support",
    ],
  },
  {
    id: "crm-dev",
    title: "Custom CRM Development",
    icon: <Database className="text-orange-500" />,
    bgColor: "bg-orange-50",
    topics: [
      "Lead & customer management",
      "Workflow automation",
      "Employee portals",
      "Project tracking",
      "Reporting & analytics",
    ],
  },
  {
    id: "cloud-dev",
    title: "Backend & Cloud Solutions",
    icon: <Cloud className="text-orange-500" />,
    bgColor: "bg-orange-50",
    topics: [
      "API development",
      "Database architecture",
      "Cloud deployment (AWS)",
      "Server management",
      "Performance optimization",
    ],
  },
];

export default function TechnicalGrid() {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-12 px-8 lg:px-16" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold" style={{ color: "var(--text-primary)" }}>
            Select Your Domain
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCategories.map((cat, i) => (
            <motion.a
              key={i}
              href={`#${cat.id}`}
              onClick={(e) => handleScroll(e, cat.id)}
              whileHover={{ y: -10, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="p-10 rounded-[2.5rem] border flex flex-col h-full group transition-all duration-300 shadow-sm hover:shadow-xl" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="mb-6 p-4 rounded-2xl w-fit shadow-sm" style={{ backgroundColor: "var(--bg-primary)" }}>
                {React.cloneElement(cat.icon, { size: 32 })}
              </div>

              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {cat.title}
                </h3>
                <ChevronRight className="text-neutral-300 group-hover:text-neutral-900 transition-colors" />
              </div>

              <ul className="space-y-3 mt-auto">
                {cat.topics.map((topic, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 font-medium" style={{ color: "var(--text-muted)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                    {topic}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
                View Domain Details →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
