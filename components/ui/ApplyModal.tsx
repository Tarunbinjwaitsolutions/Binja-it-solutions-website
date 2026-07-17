"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, FileText, CheckCircle } from "lucide-react";

interface ApplyModalProps {
  jobId: string;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ jobId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    experience: "",
    note: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setResume(null);
      return;
    }
    if (file && file.size > 3 * 1024 * 1024) {
      setError("File size must be less than 3MB.");
      setResume(null);
      return;
    }
    setError("");
    if (file) {
      setResume(file);
    }
  };

  const handleRemoveFile = () => {
    setResume(null);
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    if (resume) {
      submissionData.append("resume", resume);
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dh8ut0pnb37w5.cloudfront.net/hrms";
      const response = await fetch(
        `${baseUrl}/api/applicants/${jobId}/apply`,
        {
          method: "POST",
          body: submissionData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      setShowSuccessDialog(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: { delay: 0.2, type: "spring", stiffness: 120 },
    },
    exit: { y: "100vh", opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 pt-20 bg-black/20 bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center"
        variants={backdropVariants as any}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="rounded-lg shadow-xl p-8 w-full max-w-lg m-4 relative overflow-hidden transition-colors duration-300"
          style={{ backgroundColor: "var(--bg-primary)" }}
          variants={modalVariants as any}
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence>
            {showSuccessDialog && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-8"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                <CheckCircle className="text-orange-500 h-16 w-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  Application Sent!
                </h3>
                <p className="mb-6" style={{ color: "var(--text-muted)" }}>
                  Thank you for applying. We will review your application and
                  get back to you soon.
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600"
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Apply for this position
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
              required
            />
            <input
              type="number"
              name="experience"
              placeholder="Experience (Years)"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
              required
            />
            <textarea
              name="note"
              placeholder="A brief introduction..."
              value={formData.note}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-24"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}
            />

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                Resume (PDF, max 3MB)
              </label>
              {resume ? (
                <div className="mt-1 flex items-center justify-between p-3 border-2 rounded-md" style={{ borderColor: "var(--border)" }}>
                  <div className="flex items-center">
                    <FileText size={20} className="mr-2" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>{resume.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="hover:text-orange-600"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md" style={{ borderColor: "var(--border)" }}>
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12" style={{ color: "var(--text-muted)" }} />
                    <div className="flex text-sm" style={{ color: "var(--text-muted)" }}>
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none" style={{ backgroundColor: "var(--bg-primary)" }}
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>PDF up to 3MB</p>
                  </div>
                </div>
              )}
            </div>

            {error && <p className="text-orange-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-orange-300"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ApplyModal;
