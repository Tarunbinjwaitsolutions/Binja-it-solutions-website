import React from "react";

import MarketingHero from "../DigitalMarketing/MarketingHero";
import { MarketingGrid } from "../DigitalMarketing/MarketingGrid";
import { SocialDetail, SEODetail } from "../DigitalMarketing/SocialDetail";
import BrandingDetail from "../DigitalMarketing/BrandingDetail";
import AnalyticsDetail from "../DigitalMarketing/AnalyticsDetail";

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
