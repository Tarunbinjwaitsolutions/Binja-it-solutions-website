import type { Metadata } from "next";
import HeroSection from "@/components/sections/Agentic AI/HeroSection";
import WhatIsAgenticAISection from "@/components/sections/Agentic AI/WhatIsAgenticAISection";
import OurServicesSection from "@/components/sections/Agentic AI/OurServicesSection";
import IndustriesWeServeSection from "@/components/sections/Agentic AI/IndustriesWeServeSection";
import IntegrationsSection from "@/components/sections/Agentic AI/IntegrationsSection";
import HowWeBuildSection from "@/components/sections/Agentic AI/HowWeBuildSection";
import BeforeVsAfterSection from "@/components/sections/Agentic AI/BeforeVsAfterSection";
import WhyChooseUsSection from "@/components/sections/Agentic AI/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/Agentic AI/TestimonialsSection";
import FinalCTASection from "@/components/sections/Agentic AI/FinalCTASection";
import FAQSection from "@/components/sections/Agentic AI/FAQSection";

export const metadata: Metadata = {
  title: "Agentic AI Solutions | Binjwa IT Solutions",
  description:
    "Custom Agentic AI solutions. We build AI assistants, CRM, WhatsApp & workflow automation for startups and SMEs. Get a free consultation today.",
  openGraph: {
    title: "Agentic AI Solutions | Binjwa IT Solutions",
    description:
      "Discover innovative AI automation and web development solutions tailored for your business needs. Let us help you grow.",
    images: ["https://binjwaitsolutions.com/assets/focus-CfFVm_O6.png"],
    url: "https://binjwaitsolutions.com/ai-solutions",
    type: "website",
  },
};

export default function AgenticAIPage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />
      {/* 3. Introduction */}
      <WhatIsAgenticAISection />
      {/* 5. Core Services */}
      <OurServicesSection />
      {/* 11. Industries */}
      <IndustriesWeServeSection />
      {/* 9. Integrations */}
      <IntegrationsSection />
      {/* 10. How We Build */}
      <HowWeBuildSection />
      {/* 13. Before Vs After */}
      <BeforeVsAfterSection />
      {/* 15. Why Choose Us */}
      <WhyChooseUsSection />
      {/* 16. Testimonials */}
      <TestimonialsSection />
      {/* 18. Final CTA */}
      <FinalCTASection />
      {/* 17. FAQs */}
      <FAQSection />
    </>
  );
}
