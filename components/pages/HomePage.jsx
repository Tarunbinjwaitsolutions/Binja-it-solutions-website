import React from "react";

import Hero from "../home/Hero";

import GlobalMouseGlow from "../home/GlobalMouseGlow";
import Advantages from "../home/Advantages";
import StatsSection from "../home/StatsSection";
import Services from "../home/Services";
import Testimonials from "../home/Testimonials";
import WhyChooseUs from "../home/WhyChooseUs";
import FAQSection from "../home/FAQSection";
import TrustPartnership from "../home/TrustPartnership";
import OurProducts from "../home/OurProducts";
import Portfolio from "../home/Portfolio";
// import CTASection from "../home/CTASection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <GlobalMouseGlow />
      
      <Hero />
      <Services />
      <WhyChooseUs />
      <Advantages />
      <TrustPartnership />
      <OurProducts />
      <StatsSection />
      <Portfolio />
      <Testimonials />
      <FAQSection />

    </div>
  );
}
