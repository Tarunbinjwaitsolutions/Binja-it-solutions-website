import { websiteDevelopmentContent } from "../data/sub-services-content/website-development.js";
import { ecommerceDevelopmentContent } from "../data/sub-services-content/ecommerce-development.js";
import { customWebApplicationsContent } from "../data/sub-services-content/custom-web-applications.js";
import { androidAppDevelopmentContent } from "../data/sub-services-content/android-app-development.js";
import { iosAppDevelopmentContent } from "../data/sub-services-content/ios-app-development.js";
import { crossPlatformDevelopmentContent } from "../data/sub-services-content/cross-platform-development.js";
import { uiUxDesignContent } from "../data/sub-services-content/ui-ux-design.js";
import { websiteMaintenanceContent } from "../data/sub-services-content/website-maintenance.js";
import { progressiveWebAppsContent } from "../data/sub-services-content/progressive-web-apps.js";
import { apiDevelopmentContent } from "../data/sub-services-content/api-development.js";
import { cmsDevelopmentContent } from "../data/sub-services-content/cms-development.js";

// Agentic AI Imports
import { aiChatbotsContent } from "../data/sub-services-content/ai-chatbots-virtual-assistants.js";
import { customAiAgentsContent } from "../data/sub-services-content/custom-ai-agents.js";
import { workflowAutomationRpaContent } from "../data/sub-services-content/workflow-automation-rpa.js";
import { aiCrmIntegrationContent } from "../data/sub-services-content/ai-crm-integration.js";
import { voiceAiBotsContent } from "../data/sub-services-content/voice-ai-bots.js";
import { documentProcessingAiContent } from "../data/sub-services-content/document-processing-ai.js";
import { aiRecommendationSystemsContent } from "../data/sub-services-content/ai-recommendation-systems.js";
import { predictiveAnalyticsContent } from "../data/sub-services-content/predictive-analytics.js";
import { customLlmIntegrationContent } from "../data/sub-services-content/custom-llm-integration.js";
import { aiCustomerSupportContent } from "../data/sub-services-content/ai-customer-support.js";

// Digital Marketing Imports
import { seoContent } from "../data/sub-services-content/seo.js";
import { socialMediaMarketingContent } from "../data/sub-services-content/social-media-marketing.js";
import { googleAdsPpcContent } from "../data/sub-services-content/google-ads-ppc.js";
import { contentMarketingContent } from "../data/sub-services-content/content-marketing.js";
import { emailMarketingContent } from "../data/sub-services-content/email-marketing.js";
import { influencerMarketingContent } from "../data/sub-services-content/influencer-marketing.js";
import { brandingContent } from "../data/sub-services-content/branding-graphic-design.js";
import { videoMarketingContent } from "../data/sub-services-content/video-marketing-editing.js";
import { onlineReputationContent } from "../data/sub-services-content/online-reputation-management.js";
import { analyticsReportingContent } from "../data/sub-services-content/analytics-reporting.js";

// Centralized registry mapping slugs to their content
export const contentRegistry = {
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
