"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Clock,
  CheckSquare,
  Award,
  TrendingUp,
  Users,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import ApplyModal from "@/components/ui/ApplyModal";

interface JobDetails {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  experience?: string;
  salary?: string;
  duration?: string;
  courseFee?: string;
}

interface Job {
  _id: string;
  category: string;
  posted: string;
  details: JobDetails;
}

const JobDetailsPageClient = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [modalJobId, setModalJobId] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/openings/${id}`
        );
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <p className="text-lg text-neutral-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans pt-24" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-neutral-500 hover:text-orange-600 transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Back to Listings</span>
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <header className="rounded-2xl shadow-lg p-8 mb-10 transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: "var(--text-primary)" }}>
                  {job.details.title}
                </h1>
                <p className="mt-2 text-lg text-orange-500 font-semibold">{job.details.company}</p>
              </div>
              <motion.button
                onClick={(e) => { e.preventDefault(); setModalJobId(job._id); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 md:mt-0 bg-orange-500 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-md hover:bg-orange-700 transition-all duration-300"
              >
                {job.category === "Job" ? "Apply Now" : "Enroll Now"}
              </motion.button>
            </div>
            <div className="mt-6 pt-6 border-t flex flex-wrap gap-x-8 gap-y-4" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              <div className="flex items-center"><MapPin size={18} className="mr-2 text-neutral-400" /><span>{job.details.location}</span></div>
              <div className="flex items-center"><Briefcase size={18} className="mr-2 text-neutral-400" /><span>{job.details.type}</span></div>
              <div className="flex items-center"><Clock size={18} className="mr-2 text-neutral-400" /><span>{job.posted}</span></div>
            </div>
          </header>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-10" variants={containerVariants as any} initial="hidden" animate="visible">
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants as any} className="rounded-2xl shadow-lg p-8 transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                {job.category === "Job" ? "Job Description" : "Course Description"}
              </h2>
              <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>{job.details.description}</p>

              <h3 className="text-xl font-bold mt-10 mb-6" style={{ color: "var(--text-primary)" }}>
                {job.category === "Job" ? "Key Responsibilities" : "What You'll Do"}
              </h3>
              <ul className="space-y-4">
                {job.details.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckSquare className="text-orange-500 mt-1 mr-3 flex-shrink-0" size={20} />
                    <span style={{ color: "var(--text-muted)" }}>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mt-10 mb-6" style={{ color: "var(--text-primary)" }}>
                {job.category === "Job" ? "Qualifications" : "Requirements"}
              </h3>
              <ul className="space-y-4">
                {job.details.qualifications.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="text-orange-500 mt-1 mr-3 flex-shrink-0" size={20} />
                    <span style={{ color: "var(--text-muted)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div variants={itemVariants as any} className="rounded-2xl shadow-lg p-6 transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                {job.category === "Job" ? "Job Overview" : "Course Overview"}
              </h3>
              <div className="space-y-4 text-sm">
                {job.category === "Job" ? (
                  <>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-muted)" }}>Experience</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{job.details.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-muted)" }}>Salary</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{job.details.salary}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-muted)" }}>Duration</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{job.details.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-muted)" }}>Course Fee</span>
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{job.details.courseFee}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>{job.category === "Job" ? "Job Type" : "Format"}</span>
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{job.details.type}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants as any} className="rounded-2xl shadow-lg p-6 transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Why Join Us?</h3>
              <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
                <li className="flex items-center"><TrendingUp size={16} className="mr-2 text-orange-500" /><span>Career Growth Opportunities</span></li>
                <li className="flex items-center"><Users size={16} className="mr-2 text-orange-500" /><span>Collaborative Team Culture</span></li>
                <li className="flex items-center"><MessageSquare size={16} className="mr-2 text-orange-500" /><span>Open Communication Policy</span></li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {modalJobId && (
        <ApplyModal jobId={modalJobId} onClose={() => setModalJobId(null)} />
      )}
    </div>
  );
};

export default JobDetailsPageClient;
