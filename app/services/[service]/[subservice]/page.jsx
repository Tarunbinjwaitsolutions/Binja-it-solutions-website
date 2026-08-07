import React from "react";
import { notFound } from "next/navigation";
import { websiteDevelopmentContent } from "../../../../data/sub-services-content/website-development";
import { ecommerceDevelopmentContent } from "../../../../data/sub-services-content/ecommerce-development";
import { customWebApplicationsContent } from "../../../../data/sub-services-content/custom-web-applications";
import { androidAppDevelopmentContent } from "../../../../data/sub-services-content/android-app-development";
import { iosAppDevelopmentContent } from "../../../../data/sub-services-content/ios-app-development";
import { crossPlatformDevelopmentContent } from "../../../../data/sub-services-content/cross-platform-development";
import { uiUxDesignContent } from "../../../../data/sub-services-content/ui-ux-design";
import { websiteMaintenanceContent } from "../../../../data/sub-services-content/website-maintenance";
import { progressiveWebAppsContent } from "../../../../data/sub-services-content/progressive-web-apps";
import { apiDevelopmentContent } from "../../../../data/sub-services-content/api-development";
import { cmsDevelopmentContent } from "../../../../data/sub-services-content/cms-development";

// Agentic AI Imports
import { aiChatbotsContent } from "../../../../data/sub-services-content/ai-chatbots-virtual-assistants";
import { customAiAgentsContent } from "../../../../data/sub-services-content/custom-ai-agents";
import { workflowAutomationRpaContent } from "../../../../data/sub-services-content/workflow-automation-rpa";
import { aiCrmIntegrationContent } from "../../../../data/sub-services-content/ai-crm-integration";
import { voiceAiBotsContent } from "../../../../data/sub-services-content/voice-ai-bots";
import { documentProcessingAiContent } from "../../../../data/sub-services-content/document-processing-ai";
import { aiRecommendationSystemsContent } from "../../../../data/sub-services-content/ai-recommendation-systems";
import { predictiveAnalyticsContent } from "../../../../data/sub-services-content/predictive-analytics";
import { customLlmIntegrationContent } from "../../../../data/sub-services-content/custom-llm-integration";
import { aiCustomerSupportContent } from "../../../../data/sub-services-content/ai-customer-support";

// Digital Marketing Imports
import { seoContent } from "../../../../data/sub-services-content/seo";
import { socialMediaMarketingContent } from "../../../../data/sub-services-content/social-media-marketing";
import { googleAdsPpcContent } from "../../../../data/sub-services-content/google-ads-ppc";
import { contentMarketingContent } from "../../../../data/sub-services-content/content-marketing";
import { emailMarketingContent } from "../../../../data/sub-services-content/email-marketing";
import { influencerMarketingContent } from "../../../../data/sub-services-content/influencer-marketing";
import { brandingContent } from "../../../../data/sub-services-content/branding-graphic-design";
import { videoMarketingContent } from "../../../../data/sub-services-content/video-marketing-editing";
import { onlineReputationContent } from "../../../../data/sub-services-content/online-reputation-management";
import { analyticsReportingContent } from "../../../../data/sub-services-content/analytics-reporting";

import Hero from "../../../../components/services/sub-service/Hero";
import OverviewBenefits from "../../../../components/services/sub-service/OverviewBenefits";
import ProblemsWeSolve from "../../../../components/services/sub-service/ProblemsWeSolve";
import WhatsIncluded from "../../../../components/services/sub-service/WhatsIncluded";
import OurProcess from "../../../../components/services/sub-service/OurProcess";
import WhyChooseUs from "../../../../components/services/sub-service/WhyChooseUs";
import RelatedServices from "../../../../components/services/sub-service/RelatedServices";
import FAQSection from "../../../../components/services/sub-service/FAQSection";
import FinalCTA from "../../../../components/services/sub-service/FinalCTA";

// Centralized registry mapping slugs to their content
const contentRegistry = {
  "web-app-development": {
    "website-development": websiteDevelopmentContent,
    "ecommerce-development": ecommerceDevelopmentContent,
    "custom-web-applications": customWebApplicationsContent,
    "android-app-development": androidAppDevelopmentContent,
    "ios-app-development": iosAppDevelopmentContent,
    "cross-platform-development": crossPlatformDevelopmentContent,
    "ui-ux-design": uiUxDesignContent,
    "website-maintenance": websiteMaintenanceContent,
    "progressive-web-apps": progressiveWebAppsContent,
    "api-development": apiDevelopmentContent,
    "cms-development": cmsDevelopmentContent,
  },
  "agentic-ai-solutions": {
    "ai-chatbots-virtual-assistants": aiChatbotsContent,
    "custom-ai-agents": customAiAgentsContent,
    "workflow-automation-rpa": workflowAutomationRpaContent,
    "ai-crm-integration": aiCrmIntegrationContent,
    "voice-ai-bots": voiceAiBotsContent,
    "document-processing-ai": documentProcessingAiContent,
    "ai-recommendation-systems": aiRecommendationSystemsContent,
    "predictive-analytics": predictiveAnalyticsContent,
    "custom-llm-integration": customLlmIntegrationContent,
    "ai-customer-support": aiCustomerSupportContent,
  },
  "digital-marketing": {
    "seo": seoContent,
    "social-media-marketing": socialMediaMarketingContent,
    "google-ads-ppc": googleAdsPpcContent,
    "content-marketing": contentMarketingContent,
    "email-marketing": emailMarketingContent,
    "influencer-marketing": influencerMarketingContent,
    "branding-graphic-design": brandingContent,
    "video-marketing-editing": videoMarketingContent,
    "online-reputation-management": onlineReputationContent,
    "analytics-reporting": analyticsReportingContent,
  }
};

// Static path generation for SEO
export async function generateStaticParams() {
  const paths = [];
  
  for (const [serviceSlug, subServicesMap] of Object.entries(contentRegistry)) {
    for (const subserviceSlug of Object.keys(subServicesMap)) {
      paths.push({ service: serviceSlug, subservice: subserviceSlug });
    }
  }

  return paths;
}

// Dynamic Metadata generation
export async function generateMetadata({ params }) {
  const { service, subservice } = await params;
  
  const pageData = contentRegistry[service]?.[subservice];

  if (pageData) {
    return {
      title: `${pageData.hero.title} | Binjwa IT Solutions`,
      description: pageData.hero.tagline,
    };
  }

  return {
    title: "Service Not Found",
  };
}

export default async function SubServicePage({ params }) {
  const { service, subservice } = await params;

  // Retrieve content based on route params.
  const pageData = contentRegistry[service]?.[subservice];

  // If no content matches the route, return a 404
  if (!pageData) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Hero data={pageData.hero} />
      <OverviewBenefits data={pageData.overview} />
      <ProblemsWeSolve data={pageData.problemsWeSolve} />
      <WhatsIncluded data={pageData.whatsIncluded} />
      <OurProcess data={pageData.process} />
      <WhyChooseUs data={pageData.whyChooseUs} />
      <RelatedServices data={pageData.relatedServices} />
      <FAQSection data={pageData.faqs} />
      <FinalCTA data={pageData.finalCta} />
    </main>
  );
}
