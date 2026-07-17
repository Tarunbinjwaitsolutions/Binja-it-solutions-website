"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
} from "lucide-react";

interface BlogPost {
  id: string;
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  meta: string;
}

const POSTS_PER_PAGE = 9;

export default function AllBlogsPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(
          `${baseUrl}/api/blogs?page=${currentPage}&limit=${POSTS_PER_PAGE}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setPosts(result.data);
        setTotalPages(result.pagination.totalPages || 1);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen pt-32 py-16 px-4 md:px-8" style={{ backgroundColor: "var(--bg-alt)", color: "var(--text-primary)" }}>
      {/* Dynamic Upper Intro Header Panel Block */}
      <div className="max-w-7xl mx-auto mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8" style={{ borderColor: "var(--border)" }}>
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-amber-600 font-bold tracking-widest uppercase text-xs mb-3">
            <Sparkles size={14} />
            <span>Insight Library</span>
          </div>
          <p className="text-4xl md:text-5xl font-serif font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
            Our Complete <span className="text-amber-600">Publications.</span>
          </p>
        </div>
        <p className="max-w-md text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Deep-dives, updates, and corporate strategies curated explicitly by
          our compliance experts to guide your scaling roadmap.
        </p>
      </div>

      {/* Main Container Layer Wrapper */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center text-neutral-500">Loading posts...</div>
        ) : error ? (
          <div className="text-center text-orange-500">Error: {error}</div>
        ) : (
          <>
            {/* Post Display Layout Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
              variants={staggerContainer as any}
              initial="hidden"
              animate="show"
            >
              {posts.map((post) => (
                <motion.div variants={staggerItem as any} key={post.id || post._id}>
                  <Link href={`/blog/${post.id || post._id}`}>
                    <div className="flex flex-col group p-4 rounded-3xl shadow-sm border hover:shadow-md transition-shadow duration-300 h-full" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                      <div className="relative mb-5">
                        <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute bottom-0 right-4 translate-y-1/2 p-3.5 rounded-xl bg-neutral-900 text-white shadow-md z-10 group-hover:bg-orange-600 transition-all duration-300 cursor-pointer">
                          <ArrowUpRight size={18} className="transform group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                      </div>

                      <div className="px-1 pt-2 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold leading-snug mb-3 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-2" style={{ color: "var(--text-primary)" }}>
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2.5 mb-3">
                          <hr className="w-8 border-t transition-all group-hover:w-12 group-hover:border-orange-600 duration-300" style={{ borderColor: "var(--border)" }} />
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-600 transition-colors">
                            {post.category}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-5 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                          {post.summary}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-medium border-t pt-4 mt-auto" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>
                          <div className="flex items-center gap-1.5 ml-auto">
                            <Calendar size={13} />
                            <span>{post.meta?.split("·")[0]?.replace("Hosted by", "").trim()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Dynamic Pagination Control Panel Engine */}
            <div className="flex items-center justify-center gap-2 mt-20">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2.5 rounded-xl border transition-all ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-50"}`}
                style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)", borderColor: "var(--border)" }}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1 mx-2 text-sm font-bold">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3.5 py-2 rounded-xl transition-all ${currentPage === pageNum ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"}`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return <span key={pageNum} className="px-2 text-neutral-300">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2.5 rounded-xl border border-neutral-200 transition-all ${currentPage === totalPages ? "bg-neutral-100 text-neutral-300 cursor-not-allowed" : "bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300"}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
