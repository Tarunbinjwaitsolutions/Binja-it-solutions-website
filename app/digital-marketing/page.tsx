import type { Metadata } from "next";
import MarketingHero from "@/components/sections/Digital Marketing/MarketingHero";
import { MarketingGrid } from "@/components/sections/Digital Marketing/MarketingGrid";
import { SocialDetail, SEODetail } from "@/components/sections/Digital Marketing/SocialDetail";
import BrandingDetail from "@/components/sections/Digital Marketing/BrandingDetail";
import AnalyticsDetail from "@/components/sections/Digital Marketing/AnalyticsDetail";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "Boost your online presence with our comprehensive digital marketing services, including SEO, social media, and branding.",
};

export default function DigitalMarketingPage() {
  return (
    <>
      <MarketingHero />
      <MarketingGrid />
      <SEODetail />
      <SocialDetail />
      <BrandingDetail />
      <AnalyticsDetail />
    </>
  );
}
