import React from 'react';
import Link from "next/link";
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

export function LandingNav() {
  const lenis = useSmoothScroll();

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      if (lenis) lenis.scrollTo(element, { offset: -80 });
      else element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090B]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-white text-2xl" style={{ background: '#F16522' }}>b</div>
          <div className="text-left">
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">binj-AI</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} className="text-gray-300 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#pricing" onClick={(e) => handleScroll(e, 'pricing')} className="text-gray-300 hover:text-white transition-colors">
            Pricing
          </a>
          <Link href="/enterprise" className="text-gray-300 hover:text-white transition-colors">
            Enterprise
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="px-4 py-2 text-white hover:bg-white/10 rounded-md transition-colors">
            Sign In
          </Link>
          <Link href="/sign-up" className="bg-[#F16522] text-white hover:bg-[#E05A1A] px-6 py-2 rounded-full font-medium transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
