import React from "react";

import MarketingHero from "../Digital Marketing/MarketingHero";
import { MarketingGrid } from "../Digital Marketing/MarketingGrid";
import { SocialDetail, SEODetail } from "../Digital Marketing/SocialDetail";
import BrandingDetail from "../Digital Marketing/BrandingDetail";
import AnalyticsDetail from "../Digital Marketing/AnalyticsDetail";

export default function DigitalMarketing() {
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
