import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { LandingHero } from '../smm-landing/Hero';
import { LandingFeatures } from '../smm-landing/Features';
import { LandingEcosystem } from '../smm-landing/Ecosystem';
import { LandingHowItWorks } from '../smm-landing/HowItWorks';
import { LandingPricing } from '../smm-landing/Pricing';
import { LandingSocialProof } from '../smm-landing/SocialProof';
import { LandingCTA } from '../smm-landing/Cta';
// import { LandingFooter } from '../smm-landing/Footer';

export default function SmmLandingPage() {
  return (
    <div className="bg-[#09090B] min-h-screen text-white font-sans selection:bg-[#F16522] selection:text-white">
      {/* <Navbar  /> */}
      <LandingHero />
      <LandingFeatures />
      <LandingEcosystem />
      <LandingHowItWorks />
      <LandingPricing />
      <LandingSocialProof />
      <LandingCTA />
      {/* <LandingFooter /> */}
    </div>
  );
}
