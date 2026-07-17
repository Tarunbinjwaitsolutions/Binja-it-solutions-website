"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Eye,
  Calendar,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [pastPosts, setPastPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        // Fetch main post
        const postResponse = await fetch(`${baseUrl}/api/blogs/${id}`);
        if (!postResponse.ok) throw new Error(`Failed to fetch main post.`);
        const postResult = await postResponse.json();
        setPost(postResult.data);

        // Fetch featured posts for sidebar
        const featuredResponse = await fetch(`${baseUrl}/api/blogs/latest`);
        if (!featuredResponse.ok)
          throw new Error(`Failed to fetch featured posts.`);
        const featuredResult = await featuredResponse.json();
        console.log("Featured Posts API Response:", featuredResult);
        // Ensure data is an array before setting state
        const featuredData = featuredResult.data || [];
        setFeaturedPosts(featuredData.filter((p) => p._id !== id));

        // Fetch previous posts for grid
        const pastResponse = await fetch(`${baseUrl}/api/blogs/previous/${id}`);
        if (!pastResponse.ok) throw new Error(`Failed to fetch past posts.`);
        const pastResult = await pastResponse.json();
        console.log("Past Posts API Response:", pastResult);
        // Ensure data is an array before setting state
        setPastPosts(pastResult.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogData();
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-lg text-neutral-500">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-lg text-orange-500">Error: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-lg text-neutral-500">Post not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      
      {/* SECTION 1: TOP HERO AND FEATURED SIDEBAR LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-10">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-500 hover:text-amber-600 transition-colors duration-300 group"
          >
            <ChevronLeft
              size={20}
              className="mr-1 transform group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="font-semibold">Back to All Posts</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Large Hero Post Card */}
          <div className="lg:col-span-2 relative group rounded-xl overflow-hidden shadow-lg h-[450px]">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark Linear Underlay Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Absolute Placed Hero Text */}
            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12">
              <span className="inline-block px-3 py-1/20 backdrop-blur-md rounded-full text-white text-xs font-semibold mb-4 border border-white/30 tracking-wide" style={{ backgroundColor: "var(--bg-primary)" }}>
                {post.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight max-w-2xl">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Right Column: Other Featured Posts Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 font-serif" style={{ color: "var(--text-primary)" }}>
              Other featured posts
            </h3>
            <div className="space-y-5">
              {featuredPosts.map((featuredPost) => (
                <Link href={`/blog/${featuredPost._id}`} key={featuredPost._id}>
                  <div className="flex items-center gap-4 group cursor-pointer p-1">
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <img
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors" style={{ color: "var(--text-primary)" }}>
                      {featuredPost.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="max-w-7xl mx-auto my-4 px-4 md:px-8 border-t" style={{ borderColor: "var(--border)" }} />

      {/* SECTION 2: VARIABLE ARTICLE PARAGRAPHS TEXT PANEL */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-serif font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            {post.title}
          </h2>
          <div className="text-sm mb-8 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <span>{post.meta.split("·")[0]}</span>
            <span className="text-neutral-300">·</span>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>
              {post.meta.split("·")[1]}
            </span>
          </div>

          {/* Dynamic Paragraph Looping Panels */}
          <div className="space-y-6 leading-relaxed text-base tracking-wide" style={{ color: "var(--text-muted)" }}>
            {post.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <hr className="max-w-7xl mx-auto my-12 border-t" style={{ borderColor: "var(--border)" }} />

      {/* SECTION 3: PAST HISTORIC POSTS FOOTER GRID TIMELINE */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <h3 className="text-xl font-bold mb-6 font-serif" style={{ color: "var(--text-primary)" }}>
          Past Posts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {pastPosts.map((pastPost) => (
            <Link href={`/blog/${pastPost._id}`} key={pastPost._id}>
              <div className="flex flex-col group h-full">
                {/* Image Box with Floating Relative Action Button Arrow */}
                <div className="relative rounded-lg shadow-sm aspect-[4/3] mb-4 overflow-hidden">
                  <img
                    src={pastPost.imageUrl}
                    alt={pastPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute bottom-3 right-3 p-3 rounded-lg shadow-md group-hover:bg-orange-600 transition-all duration-300 bg-black text-white`}
                  >
                    <ArrowUpRight
                      size={18}
                      className=" transform group-hover:rotate-45 transition-transform"
                    />
                  </div>
                </div>

                {/* Text Context Fields */}
                <h3 className="text-sm font-bold text-neutral-900 leading-snug mb-3 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                  {pastPost.title}
                </h3>

                {/* The API for previous posts does not contain summary or category, so they are omitted here */}
                <div className="mt-auto" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
