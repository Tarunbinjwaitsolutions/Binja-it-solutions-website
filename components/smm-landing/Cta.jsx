import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";;

export function LandingCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#09090B]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F16522]/20 to-orange-400/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[#09090C]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
          Your Next Post Is 30 Seconds Away
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-10 text-balance">
          Give it a try — no card, no commitment, just see what it comes up with.
        </p>
        <Link href="/contact"
          className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-100 h-16 px-12 text-xl rounded-full shadow-2xl transition-colors font-bold"
        >
          Start Creating Free
          <ArrowRight className="ml-2 w-6 h-6" />
        </Link>
      </div>
    </section>
  );
}
