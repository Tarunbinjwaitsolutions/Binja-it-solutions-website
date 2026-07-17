"use client";
import React from "react";
import { Search, Share2, Palette, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const marketingCategories = [
  {
    id: "seo-domain",
    title: "Search Engine Optimization",
    icon: <Search className="text-orange-500" />,
    bgColor: "bg-orange-50",
    topics: [
      "Technical SEO audits",
      "Keyword strategy",
      "Local SEO optimization",
      "SEO content planning",
    ],
  },
  {
    id: "social-domain",
    title: "Social Media Marketing",
    icon: <Share2 className="text-orange-500" />,
    bgColor: "bg-orange-50",
    topics: [
      "Instagram & Facebook",
      "LinkedIn campaigns",
      "Engagement growth",
      "Brand awareness",
    ],
  },
  {
    id: "branding-domain",
    title: "Content & Branding",
    icon: <Palette className="text-orange-500" />,
    bgColor: "bg-orange-50",
    topics: [
      "Creative post designs",
      "Marketing copywriting",
      "Brand positioning",
      "Email campaigns",
    ],
  },
  {
    id: "platforms-domainplatforms-domain",
    title: "SMO & SMM Operations",
    icon: <Users className="text-orange-500" />,
    bgColor: "bg-orange-50",
    topics: [
      "Profile Optimization & Branding (SMO)",
      "Content Strategy & Scheduling",
      "Meta & Paid Ad Campaigns (SMM)",
      "Audience Engagement & Growth Tracking",
    ],
  },
];

export function MarketingGrid() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-12 px-8 lg:px-16" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {marketingCategories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            onClick={() => scrollToSection(cat.id)}
            className="p-10 rounded-[2.5rem] hover:shadow-xl border flex flex-col h-full cursor-pointer group"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <div className="mb-6 p-4 rounded-2xl w-fit shadow-sm" style={{ backgroundColor: "var(--bg-primary)" }}>
              {React.cloneElement(cat.icon, { size: 32 })}
            </div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{cat.title}</h3>
              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ul className="space-y-3 mt-auto">
              {cat.topics.map((topic, j) => (
                <li
                  key={j}
                  className="flex items-center gap-3 font-medium text-sm" style={{ color: "var(--text-muted)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
              View Domain Details →
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
