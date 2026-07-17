import type { Metadata } from "next";
import GlobalMouseGlow from "@/components/sections/home/GlobalMouseGlow";
import Hero from "@/components/sections/home/Hero";
import Services from "@/components/sections/home/Services";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import Advantages from "@/components/sections/home/Advantages";
import TrustPartnership from "@/components/sections/home/TrustPartnership";
import IndustriesWeServe from "@/components/sections/home/IndustriesWeServe";
import StatsSection from "@/components/sections/home/StatsSection";
import Portfolio from "@/components/sections/home/Portfolio";
import Testimonials from "@/components/sections/home/Testimonials";
import FAQSection from "@/components/sections/home/FAQSection";

export const metadata: Metadata = {
  title: "Binjwa IT Solutions | AI & Software Development Company",
  description:
    "From AI automation to web development and digital marketing, we help businesses grow with scalable, secure, and results-driven solutions.",
  openGraph: {
    title: "Binjwa IT Solutions - Agentic AI Solutions & Web Development",
    description:
      "Discover innovative AI automation and web development solutions tailored for your business needs. Let us help you grow.",
    images: ["https://binjwaitsolutions.com/assets/focus-CfFVm_O6.png"],
    url: "https://binjwaitsolutions.com",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <GlobalMouseGlow />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Advantages />
      <TrustPartnership />
      <IndustriesWeServe />
      <StatsSection />
      <Portfolio />
      <Testimonials />
      <FAQSection />
    </div>
  );
}
