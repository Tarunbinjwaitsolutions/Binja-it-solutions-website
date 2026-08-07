export const progressiveWebAppsContent = {
  hero: {
    title: "Progressive Web Apps (PWA)",
    tagline: "The Best of Both Worlds: Web Accessibility, App Performance",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "#" },
      { name: "Web & App Development", url: "/services/web-app-development" },
      { name: "Progressive Web Apps", url: "/services/web-app-development/progressive-web-apps" }
    ],
  },
  overview: {
    description: "We build Progressive Web Apps (PWAs) that deliver native app-like experiences directly through the mobile browser, requiring no app store downloads while offering offline capabilities and push notifications.",
    benefits: [
      { title: "No App Store Friction", icon: "Zap" },
      { title: "Offline Functionality", icon: "Database" },
      { title: "Push Notifications", icon: "Smartphone" },
      { title: "Lower Development Cost", icon: "LineChart" },
      { title: "SEO Indexable", icon: "Search" }
    ]
  },
  problemsWeSolve: [
    { problem: "High drop-off rates on App Store installs", solution: "Users can 'Add to Home Screen' instantly from their browser" },
    { problem: "Users abandoning site due to poor network", solution: "Service Workers cache data so the app works flawlessly offline" },
    { problem: "Struggling to re-engage website visitors", solution: "Native push notifications sent directly to their device" },
    { problem: "Costly dual iOS/Android development", solution: "A single PWA codebase works on all devices and desktop" }
  ],
  whatsIncluded: [
    { title: "PWA Architecture Setup", icon: "Layers" },
    { title: "Service Worker Integration", icon: "Database" },
    { title: "Web App Manifests", icon: "Code" },
    { title: "Push Notification Setup", icon: "Smartphone" },
    { title: "Offline Caching Strategy", icon: "ShieldCheck" },
    { title: "Lighthouse Performance Audits", icon: "Gauge" }
  ],
  process: [
    { title: "Requirement Analysis", description: "Identifying which features need offline access and push capabilities." },
    { title: "App Shell Architecture", description: "Designing the core UI to load instantly, independent of network speed." },
    { title: "Service Worker Coding", description: "Writing the complex caching logic that powers offline functionality." },
    { title: "Optimization & Deployment", description: "Ensuring 100/100 PWA scores on Google Lighthouse before launch." }
  ],
  whyChooseUs: [
    "Deep expertise in Next.js/React PWA implementations",
    "Focus on achieving perfect Google Lighthouse scores",
    "Advanced offline-first caching strategies",
    "Seamless push notification integrations"
  ],
  relatedServices: [
    { title: "Custom Web Applications", url: "/services/web-app-development/custom-web-applications" },
    { title: "Cross-platform App Development", url: "/services/web-app-development/cross-platform-development" },
    { title: "Website Development", url: "/services/web-app-development/website-development" }
  ],
  faqs: [
    { question: "What exactly is a PWA?", answer: "A PWA is a website built with modern web technologies that behaves like a native app. It can be installed on the home screen, works offline, and sends push notifications, but doesn't require an App Store." },
    { question: "Can PWAs be published to the Apple App Store?", answer: "Historically no, but recently Google Play and Apple App Store have introduced mechanisms (like Trusted Web Activities) to wrap PWAs for store listing if desired." },
    { question: "Do PWAs work on iOS devices?", answer: "Yes! While Android has always had excellent PWA support, Apple has recently drastically improved iOS support for PWAs, including allowing Web Push Notifications." },
    { question: "Is a PWA cheaper than a native app?", answer: "Yes, significantly. Since it's built using web technologies (HTML/CSS/JS) and runs on all platforms, it requires only one codebase and team." }
  ],
  finalCta: {
    heading: "Ready to Upgrade Your Mobile Experience?",
    subtext: "Let's build a Progressive Web App that engages users instantly.",
  }
};
