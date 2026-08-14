export const analyticsReportingContent = {
  hero: {
    title: "Analytics & Reporting",
    tagline: "Turn Raw Data into Actionable Business Intelligence",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "#" },
      { name: "Digital Marketing", url: "/services/digital-marketing" },
      { name: "Analytics & Reporting", url: "/services/digital-marketing/analytics-reporting" }
    ],
  },
  overview: {
    description: "Stop guessing what works. We implement advanced tracking architecture (GA4, GTM, server-side tracking) and build beautiful, real-time dashboards so you can see exactly where every marketing dollar is going.",
    benefits: [
      { title: "Clear Marketing ROI", icon: "LineChart" },
      { title: "Data-Driven Decisions", icon: "Search" },
      { title: "Unified Data Sources", icon: "Database" },
      { title: "Real-Time Monitoring", icon: "Zap" },
      { title: "Reduced Wasted Ad Spend", icon: "ShieldCheck" }
    ]
  },
  problemsWeSolve: [
    { problem: "No idea which marketing channel is actually driving sales", solution: "Multi-touch attribution models to track the entire customer journey" },
    { problem: "Broken tracking after the GA4 migration or iOS updates", solution: "Implementation of Server-Side Google Tag Manager and Conversions APIs" },
    { problem: "Wasting hours compiling weekly reports in Excel", solution: "Fully automated, real-time Looker Studio dashboards" },
    { problem: "Discrepancies between ad platform data and actual sales", solution: "CRM integration to track offline conversions and accurate revenue" }
  ],
  whatsIncluded: [
    { title: "Google Analytics 4 (GA4) Setup", icon: "Search" },
    { title: "Google Tag Manager (GTM)", icon: "Code" },
    { title: "Custom Looker Studio Dashboards", icon: "LineChart" },
    { title: "Server-Side Tracking Architecture", icon: "Layers" },
    { title: "Meta/TikTok Conversions API", icon: "Smartphone" },
    { title: "CRM/Offline Conversion Sync", icon: "Database" }
  ],
  process: [
    { title: "Tracking Audit", description: "Reviewing your current GA4/GTM setup to identify broken tags and data leaks." },
    { title: "Measurement Plan", description: "Defining exactly what actions (purchases, form fills, button clicks) need to be tracked." },
    { title: "Implementation & Testing", description: "Setting up GTM tags, data layers, and Server-Side tracking to bypass ad-blockers." },
    { title: "Dashboard Creation", description: "Connecting all data sources into a beautiful, easy-to-read, real-time dashboard." }
  ],
  whyChooseUs: [
    "Deep technical expertise in JavaScript DataLayers and GTM",
    "Pioneers in Server-Side tracking to combat privacy updates (iOS 14+)",
    "Focus on building dashboards for business owners, not just analysts",
    "Expertise in linking marketing data directly to Salesforce/HubSpot revenue"
  ],
  relatedServices: [
    { title: "Google Ads / PPC", url: "/services/digital-marketing/google-ads-ppc" },
    { title: "SEO", url: "/services/digital-marketing/seo" },
    { title: "Social Media Marketing", url: "/services/digital-marketing/social-media-marketing" }
  ],
  faqs: [
    { question: "What is Server-Side tracking?", answer: "Traditional tracking relies on cookies in the user's browser, which are increasingly blocked by Apple and ad-blockers. Server-side tracking moves the data collection to your own secure cloud server, resulting in far more accurate data and faster website load times." },
    { question: "Can you fix our broken GA4 setup?", answer: "Yes. The migration from Universal Analytics to GA4 was notoriously difficult, and many companies have broken setups. We offer comprehensive GA4 audits and rebuilding services to ensure your data is clean and reliable." },
    { question: "What is a Looker Studio Dashboard?", answer: "Looker Studio (formerly Google Data Studio) is a free visualization tool. We connect your Google Ads, Facebook Ads, GA4, and CRM to it, creating a single, beautiful dashboard where you can see all your metrics update in real-time." },
    { question: "How do you track phone calls?", answer: "We implement dynamic call tracking. This swaps the phone number on your website depending on how the user arrived (e.g., via a Google Ad). When they call, the system records it as a conversion and passes the data back to Google Analytics." }
  ],
  finalCta: {
    heading: "Stop Guessing, Start Measuring",
    subtext: "Let's build a tracking foundation that gives you absolute clarity on your ROI.",
  }
};
