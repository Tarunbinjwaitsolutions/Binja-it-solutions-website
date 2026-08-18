"use client";

import React, { useState } from 'react';
import Link from "next/link";;
import DemoModal from '@/components/ui/DemoModal';

export function LandingHero() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  return (
    <section className="relative pt-32 pb-12 px-6 overflow-hidden bg-[#09090B]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F16522]/10  pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F16522]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Content */}
          <div className="text-left text-balance">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/30 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              Smart Social Media Management, Simplified
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-[80px] font-bold text-white/90 mb-8 leading-[1.1]">
              Stop Staring at a <br />Blank Caption Box
            </h1>

            <p className="text-lg lg:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
              Tell it what you're posting about. Binjwa creates the content, designs it, and matches your brand — then publishes it straight to Instagram, Facebook, TikTok, Threads, WhatsApp, LinkedIn and more, so you don't have to juggle multiple apps.
            </p>


            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-10">
              <Link href="/contact" className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold bg-[#F16522] hover:bg-[#E05A1A] text-white rounded-full transition-colors w-full sm:w-auto">
                Start Creating Free
              </Link>
              {/* <button
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-full transition-colors w-full sm:w-auto"
              >
                Book a Demo
              </button> */}
            </div>

            <div className="flex flex-wrap items-center justify-start gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No credit card needed
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Live in 5 minutes
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancel whenever
              </div>
            </div>
          </div>

          {/* Right Column: Video */}
          <div className="relative mb-40 ">
            {/* Orange Glow Effect matching the screenshot */}
            <div className="absolute inset-0 bg-[#F16522] opacity-30 blur-[80px] rounded-[40px] pointer-events-none" />

            <div className="relative bg-[#1A1A1A] rounded-2xl shadow-2xl p-2 border border-white/10 z-10 ring-1 ring-white/5">
              <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center relative">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/smm-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

        </div>
      </div>

      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </section>
  );
}
