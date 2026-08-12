"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { fetchJobs } from "../lib/api/jobs";
import Link from "next/link";;
import {
  Search,
  MapPin,
  Briefcase,
  ChevronDown,
  Clock,
  ArrowRight,
  PenTool,
  Users,
  TrendingUp,
  BrainCircuit,
  Code,
  Palette,
  Megaphone,
  Wallet,
  BarChart,
  ClipboardList,
  Cloud,
  ShieldCheck,
} from "lucide-react";

const getJobIconAndColor = (job) => {
  const title = (job.category || job.title || "").toLowerCase();
  
  if (title.includes("content") || title.includes("writ")) {
    return { Icon: PenTool, color: "text-orange-500", bg: "bg-orange-500/10" };
  }
  if (title.includes("hr") || title.includes("human resource")) {
    return { Icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" };
  }
  if (title.includes("sales") || title.includes("business development") || title.includes("bde")) {
    return { Icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" };
  }
  if (title.includes("ai") || title.includes("ml") || title.includes("artificial intelligence") || title.includes("machine learning")) {
    return { Icon: BrainCircuit, color: "text-purple-500", bg: "bg-purple-500/10" };
  }
  if (title.includes("developer") || title.includes("software") || title.includes("frontend") || title.includes("backend") || title.includes("full stack") || title.includes("engineer")) {
    return { Icon: Code, color: "text-blue-400", bg: "bg-blue-400/10" };
  }
  if (title.includes("ui") || title.includes("ux") || title.includes("design")) {
    return { Icon: Palette, color: "text-pink-500", bg: "bg-pink-500/10" };
  }
  if (title.includes("marketing")) {
    return { Icon: Megaphone, color: "text-amber-500", bg: "bg-amber-500/10" };
  }
  if (title.includes("finance") || title.includes("account")) {
    return { Icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500/10" };
  }
  if (title.includes("data analyst") || title.includes("data science")) {
    return { Icon: BarChart, color: "text-indigo-500", bg: "bg-indigo-500/10" };
  }
  if (title.includes("manager") || title.includes("management")) {
    return { Icon: ClipboardList, color: "text-rose-500", bg: "bg-rose-500/10" };
  }
  if (title.includes("devops") || title.includes("cloud") || title.includes("infrastructure")) {
    return { Icon: Cloud, color: "text-sky-500", bg: "bg-sky-500/10" };
  }
  if (title.includes("qa") || title.includes("test")) {
    return { Icon: ShieldCheck, color: "text-teal-500", bg: "bg-teal-500/10" };
  }
  
  return { Icon: Briefcase, color: "text-gray-500", bg: "bg-gray-500/10" };
};

const JobPage = ({ initialJobs = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [jobType, setJobType] = useState("Jobs");
  const [sortOrder, setSortOrder] = useState("Newest");
  
  // Initialize job types from initialJobs
  const initialTypes = Array.isArray(initialJobs) 
    ? [...new Set(initialJobs.map((job) => job.type))]
    : [];
  const [availableJobTypes, setAvailableJobTypes] = useState(initialTypes);

  // We can remove the fetchJobs useEffect since it's fetched server-side

  useEffect(() => {
    let tempJobs = Array.isArray(jobs) ? [...jobs] : [];

    // 1. Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      tempJobs = tempJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowercasedTerm) ||
          job.category.toLowerCase().includes(lowercasedTerm) ||
          job.location.toLowerCase().includes(lowercasedTerm),
      );
    }

    // 2. Filter by job type
    if (jobType !== "Jobs") {
      tempJobs = tempJobs.filter((job) => job.type === jobType);
    }

    // 3. Sort the jobs
    if (sortOrder === "Category") {
      tempJobs.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortOrder === "Oldest") {
      // The API provides jobs sorted by newest first, so we can reverse the array for oldest.
      tempJobs.reverse();
    }
    // 'Newest' is the default order from the API, so no action is needed.

    setFilteredJobs(tempJobs);
  }, [jobs, searchTerm, jobType, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-secondary)" }}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: "var(--text-primary)" }}>
            Find Your <span className="text-orange-500">Next Opportunity</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: "var(--text-muted)" }}>
            Browse through our open positions and find the perfect fit for your career.
          </p>
        </header>

        <motion.div
          className="rounded-2xl shadow-lg p-6 md:p-8 mb-10"
          style={{ backgroundColor: "var(--bg-card)" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search admin/office"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
              />
            </div>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
              >
                <option>Jobs</option>
                {availableJobTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Showing <span className="font-bold">{filteredJobs.length}</span>{" "}
            search results
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Sort By:</span>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="pl-3 pr-8 py-1.5 border rounded-md text-sm font-medium appearance-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
              >
                <option>Newest</option>
                <option>Oldest</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredJobs.map((job) => (
            <motion.div
              key={job._id}
              variants={itemVariants}
              className="rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}
            >
              <Link href={`/job/${job._id}`} className="block h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {(() => {
                        const { Icon, color, bg } = getJobIconAndColor(job);
                        return (
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                            <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.5} />
                          </div>
                        );
                      })()}
                      <div>
                        <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                          {job.title}
                        </h2>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{job.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex-grow">
                    <div className="flex items-center text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                      <MapPin size={16} className="mr-2" style={{ color: "var(--text-muted)" }} />
                      {job.location}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          job.type === "Full time"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm"
                       style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1.5" />
                      <span>{job.posted}</span>
                    </div>
                    <div className="flex items-center text-orange-600 font-semibold">
                      <span>Apply Now</span>
                      <ArrowRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default JobPage;
