const fs = require('fs');
const path = require('path');

const additionalData = {
  "real-estate": {
    howWeHelp: [
      { title: "Virtual Property Tours", description: "Immersive 3D and 360-degree tours allowing remote buyers to explore properties.", link: "/services/web-app-development" },
      { title: "Real Estate CRMs", description: "Customized lead tracking pipelines and automated email follow-ups for busy agents.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Property Management Portals", description: "Centralized hubs for rent collection, maintenance ticketing, and communication.", link: "/services/web-app-development/ui-ux-design" },
      { title: "Interactive Mapping", description: "Advanced GIS integrations providing dynamic property search maps with demographic overlays.", link: "/services/agentic-ai-solutions" }
    ],
    relatedResources: [
      { title: "Real Estate Portals", description: "Build scalable platforms for property listings.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", link: "/services/web-app-development" },
      { title: "CRM Integrations", description: "Streamline operations with advanced CRM tools.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", link: "/services/agentic-ai-solutions/process-automation" },
      { title: "Lead Generation", description: "Digital marketing strategies for real estate.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", link: "/services/digital-marketing" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    challenges: [
      { title: "Fragmented Communications", description: "Disjointed communication between agents, buyers, and sellers slows down the transaction process." },
      { title: "Manual Paperwork", description: "Heavy reliance on physical documents makes compliance and record-keeping prone to errors." },
      { title: "Inefficient Lead Tracking", description: "Without a centralized CRM, valuable leads often fall through the cracks." }
    ],
    whyChooseUs: [
      { title: "PropTech Expertise", description: "We specialize in real estate technologies that drive sales and efficiency.", icon: "home" },
      { title: "Seamless Integrations", description: "Our solutions integrate with major MLS and CRM platforms.", icon: "layers" },
      { title: "User-Centric Design", description: "We build intuitive interfaces for both agents and clients.", icon: "layout" }
    ],
    faqs: [
      { q: "Can you integrate MLS data into our custom website?", a: "Yes, we have extensive experience integrating MLS feeds using RETS and WebAPI standards." },
      { q: "Do you build custom CRMs or integrate with existing ones?", a: "We can do both. We can build a bespoke CRM tailored to your firm or integrate with tools like Salesforce or HubSpot." },
      { q: "How do you ensure data security for transactions?", a: "We implement end-to-end encryption and secure digital signature workflows to protect sensitive transaction data." }
    ]
  },
  "education-edtech": {
    howWeHelp: [
      { title: "Custom LMS Platforms", description: "End-to-end Learning Management Systems tailored to your curriculum.", link: "/services/web-app-development" },
      { title: "Virtual Classrooms", description: "Integrated video conferencing tools with interactive whiteboards and polling.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Automated Grading", description: "Smart assessment modules that grade quizzes and provide instant feedback.", link: "/services/agentic-ai-solutions" },
      { title: "Student Portals", description: "Centralized dashboards for students to track schedules and academic standing.", link: "/services/web-app-development/ui-ux-design" }
    ],
    relatedResources: [
      { title: "LMS Development", description: "Build scalable and engaging learning platforms.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", link: "/services/web-app-development" },
      { title: "AI in Education", description: "Leverage AI for personalized learning paths.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", link: "/services/agentic-ai-solutions" },
      { title: "EdTech UX Design", description: "Designing intuitive interfaces for students of all ages.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", link: "/services/web-app-development/ui-ux-design" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    challenges: [
      { title: "Low Student Engagement", description: "Traditional digital platforms fail to keep students engaged in remote settings." },
      { title: "Administrative Overload", description: "Educators spend too much time on grading and administrative tasks instead of teaching." },
      { title: "Data Privacy Concerns", description: "Ensuring student data is protected while maintaining accessibility is a constant challenge." }
    ],
    whyChooseUs: [
      { title: "Accessibility First", description: "We build inclusive platforms that comply with WCAG standards.", icon: "user-check" },
      { title: "Scalable Architectures", description: "Our systems handle thousands of concurrent users during peak exam times.", icon: "cloud" },
      { title: "Data Security", description: "We ensure strict compliance with FERPA and GDPR regulations.", icon: "shield" }
    ],
    faqs: [
      { q: "Can you build interactive multimedia courses?", a: "Yes, we specialize in integrating interactive video, gamification, and rich media into learning modules." },
      { q: "Do you integrate with existing school systems?", a: "Absolutely. We build APIs to connect new platforms with legacy Student Information Systems (SIS)." },
      { q: "How do you handle peak traffic during exams?", a: "We use auto-scaling cloud infrastructure to ensure your platform remains stable under heavy load." }
    ]
  },
  "banking-finance-bfsi": {
    howWeHelp: [
      { title: "Secure Payment Gateways", description: "End-to-end encrypted payment processing solutions for high-volume transactions.", link: "/services/web-app-development" },
      { title: "Fraud Detection Systems", description: "Advanced AI-powered analytics engines to identify anomalous patterns.", link: "/services/agentic-ai-solutions" },
      { title: "Wealth Management Apps", description: "Intuitive dashboards for portfolio tracking and robo-investing.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Regulatory Reporting", description: "Automated compliance tools that generate accurate financial summaries.", link: "/services/agentic-ai-solutions/process-automation" }
    ],
    relatedResources: [
      { title: "FinTech App Development", description: "Build secure and scalable financial applications.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80", link: "/services/web-app-development" },
      { title: "AI Fraud Detection", description: "Implement machine learning to prevent financial fraud.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", link: "/services/agentic-ai-solutions" },
      { title: "Open Banking APIs", description: "Modernize your legacy systems with robust APIs.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", link: "/services/web-app-development/custom-web-apps" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    challenges: [
      { title: "Legacy System Technical Debt", description: "Outdated mainframe systems slow down innovation and integration." },
      { title: "Stringent Regulatory Compliance", description: "Keeping up with changing financial regulations requires constant updates." },
      { title: "Sophisticated Cyber Threats", description: "Financial institutions are prime targets for complex cyberattacks." }
    ],
    whyChooseUs: [
      { title: "Bank-Grade Security", description: "We implement zero-trust architectures and continuous security monitoring.", icon: "shield-check" },
      { title: "Deep Domain Knowledge", description: "Our team understands the complexities of financial workflows and regulations.", icon: "briefcase" },
      { title: "Agile Modernization", description: "We migrate legacy systems to the cloud without disrupting daily operations.", icon: "cloud" }
    ],
    faqs: [
      { q: "Are your solutions PCI-DSS compliant?", a: "Yes, all our payment and financial processing solutions adhere strictly to PCI-DSS standards." },
      { q: "Can you build blockchain-based applications?", a: "Yes, we have experience developing secure smart contracts and distributed ledger solutions." },
      { q: "How do you modernize legacy banking systems?", a: "We use a microservices approach, gradually replacing legacy components with modern APIs to minimize risk." }
    ]
  },
  "legal": {
    howWeHelp: [
      { title: "Automated Document Assembly", description: "Intelligent systems that generate complex legal documents based on smart templates.", link: "/services/agentic-ai-solutions/process-automation" },
      { title: "Secure Client Portals", description: "Encrypted digital spaces for attorneys and clients to collaborate.", link: "/services/web-app-development" },
      { title: "Case Management (CMS)", description: "Centralized hubs for tracking matters, deadlines, and organizing files.", link: "/services/web-app-development/custom-web-apps" },
      { title: "E-Discovery Integrations", description: "Secure APIs connecting CMS to powerful e-discovery platforms.", link: "/services/agentic-ai-solutions" }
    ],
    relatedResources: [
      { title: "LegalTech Development", description: "Build custom software for modern law firms.", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80", link: "/services/web-app-development" },
      { title: "Document Automation", description: "Streamline drafting with AI and smart templates.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80", link: "/services/agentic-ai-solutions/process-automation" },
      { title: "Secure Portals", description: "Designing secure interfaces for attorney-client privilege.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", link: "/services/web-app-development/ui-ux-design" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80",
    challenges: [
      { title: "Excessive Administrative Work", description: "Attorneys spend too much non-billable time on manual document drafting and filing." },
      { title: "Data Security Risks", description: "Maintaining strict attorney-client privilege in a digital environment is complex." },
      { title: "Siloed Case Information", description: "Disjointed systems make it difficult to track case progress and critical deadlines." }
    ],
    whyChooseUs: [
      { title: "Absolute Security", description: "We prioritize end-to-end encryption to protect sensitive legal data.", icon: "shield" },
      { title: "Workflow Automation", description: "We specialize in digitizing and automating complex legal processes.", icon: "activity" },
      { title: "Custom Integrations", description: "We connect your custom software with major legal research databases.", icon: "layers" }
    ],
    faqs: [
      { q: "How do you ensure attorney-client privilege is maintained?", a: "We use robust access controls, audit logs, and encryption at rest and in transit." },
      { q: "Can your systems integrate with existing court calendaring?", a: "Yes, we can build custom API integrations to sync with external calendaring systems." },
      { q: "Do you build custom e-signature solutions?", a: "We typically integrate industry-leading e-signature APIs (like DocuSign) into custom workflows for legal compliance." }
    ]
  },
  "manufacturing": {
    howWeHelp: [
      { title: "Custom Manufacturing ERP", description: "Comprehensive resource planning tailored to your production methods.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Predictive Maintenance", description: "Machine learning algorithms to predict mechanical failures before they happen.", link: "/services/agentic-ai-solutions" },
      { title: "Supply Chain Visibility", description: "End-to-end tracking of raw materials across global networks.", link: "/services/web-app-development" },
      { title: "Digital Quality Control", description: "Automated QA workflows that replace paper-based inspections.", link: "/services/agentic-ai-solutions/process-automation" }
    ],
    relatedResources: [
      { title: "Industry 4.0 Solutions", description: "Digitize your factory floor with modern software.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", link: "/services/web-app-development" },
      { title: "Predictive Analytics", description: "Leverage AI to minimize downtime and optimize output.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", link: "/services/agentic-ai-solutions" },
      { title: "Custom ERP Systems", description: "Build resource planning tools that fit your unique workflows.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", link: "/services/web-app-development/custom-web-apps" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
    challenges: [
      { title: "Unplanned Downtime", description: "Unexpected machine failures cause costly halts in production." },
      { title: "Siloed Factory Data", description: "Lack of real-time visibility between the factory floor and management." },
      { title: "Inefficient Inventory Management", description: "Overstocking or stockouts due to inaccurate demand forecasting." }
    ],
    whyChooseUs: [
      { title: "IIoT Expertise", description: "We connect physical machinery with digital dashboards.", icon: "radio" },
      { title: "Lean Process Focus", description: "Our software is designed to eliminate waste and optimize workflows.", icon: "trending-up" },
      { title: "Scalable Architecture", description: "Our solutions grow with your manufacturing capacity.", icon: "layers" }
    ],
    faqs: [
      { q: "Can you integrate software with our existing machinery?", a: "Yes, we work with IIoT protocols to gather data from modern and legacy industrial equipment." },
      { q: "Do you build custom inventory algorithms?", a: "Absolutely. We can implement AI-driven demand forecasting tailored to your supply chain." },
      { q: "How secure is your manufacturing software?", a: "We employ enterprise-grade security to protect your proprietary processes and production data." }
    ]
  },
  "logistics-transportation": {
    howWeHelp: [
      { title: "Fleet Management Dashboards", description: "Real-time telematics to monitor vehicle health and track GPS locations.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Dynamic Route Optimization", description: "AI-driven algorithms that calculate the most efficient delivery routes.", link: "/services/agentic-ai-solutions" },
      { title: "Last-Mile Delivery Apps", description: "Mobile apps for drivers with navigation and proof-of-delivery.", link: "/services/web-app-development" },
      { title: "Freight Forwarding ERP", description: "Management systems for organizing international shipments and customs.", link: "/services/agentic-ai-solutions/process-automation" }
    ],
    relatedResources: [
      { title: "Logistics Software Development", description: "Build scalable platforms for supply chain management.", image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c50a30?w=800&q=80", link: "/services/web-app-development" },
      { title: "AI Route Optimization", description: "Reduce fuel costs and delivery times with machine learning.", image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80", link: "/services/agentic-ai-solutions" },
      { title: "Driver App UX", description: "Designing intuitive mobile interfaces for logistics personnel.", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80", link: "/services/web-app-development/ui-ux-design" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80",
    challenges: [
      { title: "Inefficient Routing", description: "Static routes lead to wasted fuel and missed delivery windows." },
      { title: "Lack of Visibility", description: "Customers and dispatchers lack real-time updates on shipment status." },
      { title: "Manual Paperwork", description: "Reliance on paper bills of lading and proof-of-delivery slows down invoicing." }
    ],
    whyChooseUs: [
      { title: "Real-Time Tracking", description: "We build high-performance systems for live geospatial tracking.", icon: "map-pin" },
      { title: "Mobile-First Approach", description: "We create robust mobile apps for drivers operating in low-connectivity areas.", icon: "smartphone" },
      { title: "Complex Integrations", description: "We seamlessly connect with existing WMS and ERP systems.", icon: "layers" }
    ],
    faqs: [
      { q: "Can your routing algorithms handle live traffic?", a: "Yes, we integrate with mapping APIs to recalculate routes based on real-time traffic data." },
      { q: "Do you build custom mobile apps for drivers?", a: "Yes, we develop native or cross-platform apps featuring offline capabilities and signature capture." },
      { q: "How do you handle high volumes of tracking data?", a: "We utilize scalable cloud architectures and optimized databases for real-time geospatial processing." }
    ]
  },
  "hospitality-travel": {
    howWeHelp: [
      { title: "Direct Booking Engines", description: "High-converting, commission-free booking platforms for hotels.", link: "/services/web-app-development" },
      { title: "Travel Agency CRMs", description: "Centralized itinerary planning and customer management tools.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Guest Experience Apps", description: "Mobile apps for digital check-in, room service, and concierge.", link: "/services/web-app-development/ui-ux-design" },
      { title: "Dynamic Pricing", description: "AI algorithms to optimize room rates based on demand and seasonality.", link: "/services/agentic-ai-solutions" }
    ],
    relatedResources: [
      { title: "Hospitality Tech", description: "Modernize your hotel operations and booking flows.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", link: "/services/web-app-development" },
      { title: "AI in Travel", description: "Leverage machine learning for personalized travel recommendations.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", link: "/services/agentic-ai-solutions" },
      { title: "Digital Marketing for Hotels", description: "Increase direct bookings through targeted campaigns.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", link: "/services/digital-marketing" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1542314831-c6a4d27ce6a2?w=800&q=80",
    challenges: [
      { title: "OTA Dependency", description: "High commissions paid to Online Travel Agencies eat into profit margins." },
      { title: "Fragmented Guest Data", description: "Inability to provide personalized experiences due to disconnected systems." },
      { title: "Manual Operations", description: "Time-consuming front desk processes frustrate guests and staff." }
    ],
    whyChooseUs: [
      { title: "Conversion Optimization", description: "We design booking flows specifically to maximize direct reservations.", icon: "trending-up" },
      { title: "Seamless Integrations", description: "We connect your booking engine with leading Property Management Systems.", icon: "layers" },
      { title: "Guest-Centric UX", description: "We build intuitive interfaces that enhance the travel experience.", icon: "heart" }
    ],
    faqs: [
      { q: "Can you integrate with our existing Property Management System (PMS)?", a: "Yes, we frequently integrate custom booking engines with major PMS providers via their APIs." },
      { q: "Do you build mobile apps for guests?", a: "Yes, we develop branded apps enabling features like mobile key access and in-app messaging." },
      { q: "How do you handle multi-currency and multi-language support?", a: "We architect platforms from the ground up to support localized content and dynamic currency conversion." }
    ]
  },
  "startups": {
    howWeHelp: [
      { title: "MVP Development", description: "Rapid prototyping and development to get your product to market fast.", link: "/services/web-app-development" },
      { title: "Scalable Architectures", description: "Cloud-native foundations that grow seamlessly as you acquire users.", link: "/services/web-app-development/custom-web-apps" },
      { title: "UI/UX Design", description: "Engaging and intuitive designs that help you stand out to investors and early adopters.", link: "/services/web-app-development/ui-ux-design" },
      { title: "Growth Marketing Tech", description: "Integrated analytics and automation tools to drive user acquisition.", link: "/services/digital-marketing" }
    ],
    relatedResources: [
      { title: "Startup MVP Guide", description: "How to build and launch your Minimum Viable Product successfully.", image: "https://images.unsplash.com/photo-1559136555-9ce7b5fda2d6?w=800&q=80", link: "/services/web-app-development" },
      { title: "UX for Early Stage Apps", description: "Why design matters for securing seed funding.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", link: "/services/web-app-development/ui-ux-design" },
      { title: "AI Integration for Startups", description: "Leverage AI to create a competitive moat.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", link: "/services/agentic-ai-solutions" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    challenges: [
      { title: "Speed to Market", description: "Delays in product development give competitors an advantage." },
      { title: "Resource Constraints", description: "Limited budgets require highly efficient and focused engineering efforts." },
      { title: "Technical Debt", description: "Rushed MVPs often lead to unscalable code that must be rewritten later." }
    ],
    whyChooseUs: [
      { title: "Agile Execution", description: "We use rapid sprint cycles to deliver functional software quickly.", icon: "activity" },
      { title: "Future-Proof Tech", description: "We build MVPs on scalable stacks so you don't have to rebuild later.", icon: "layers" },
      { title: "Strategic Partnership", description: "We act as your technical co-founder, advising on product strategy.", icon: "users" }
    ],
    faqs: [
      { q: "How long does it take to build an MVP?", a: "Depending on the scope, a robust MVP typically takes 8 to 12 weeks to develop." },
      { q: "Will I own the source code?", a: "Absolutely. Upon project completion and payment, you retain 100% ownership of the intellectual property." },
      { q: "Can you help scale the product after launch?", a: "Yes, we offer ongoing maintenance and dedicated team augmentation for post-launch scaling." }
    ]
  },
  "agriculture": {
    howWeHelp: [
      { title: "Farm Management Software", description: "Centralized dashboards for tracking crop cycles, inventory, and labor.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Precision Agriculture (IoT)", description: "Integration with soil sensors and drones for real-time field data.", link: "/services/agentic-ai-solutions" },
      { title: "Supply Chain Traceability", description: "Blockchain and tracking systems from farm to fork.", link: "/services/web-app-development" },
      { title: "Predictive Analytics", description: "AI models forecasting crop yields based on weather and soil data.", link: "/services/agentic-ai-solutions/process-automation" }
    ],
    relatedResources: [
      { title: "AgTech Solutions", description: "Modernize your farming operations with digital tools.", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80", link: "/services/web-app-development" },
      { title: "AI in Agriculture", description: "Leverage machine learning for higher crop yields.", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80", link: "/services/agentic-ai-solutions" },
      { title: "Supply Chain Software", description: "Ensure transparency across the agricultural supply chain.", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80", link: "/services/web-app-development/custom-web-apps" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1592982537447-6f2334237d82?w=800&q=80",
    challenges: [
      { title: "Unpredictable Yields", description: "Reliance on historical data rather than real-time conditions impacts profitability." },
      { title: "Resource Waste", description: "Inefficient use of water and fertilizers increases costs and environmental impact." },
      { title: "Complex Logistics", description: "Managing the freshness and distribution of perishable goods is challenging." }
    ],
    whyChooseUs: [
      { title: "IoT Integration", description: "We specialize in connecting field hardware with cloud analytics.", icon: "radio" },
      { title: "Data-Driven Insights", description: "We build intuitive dashboards that turn complex agricultural data into actionable steps.", icon: "pie-chart" },
      { title: "Rugged Mobility", description: "We design offline-first mobile apps for use in remote rural areas.", icon: "smartphone" }
    ],
    faqs: [
      { q: "Do you build offline-capable apps for farm workers?", a: "Yes, we develop progressive web apps (PWAs) and native apps that sync data when connectivity is restored." },
      { q: "Can you integrate drone imagery into your software?", a: "Absolutely. We build platforms that can process and analyze drone or satellite imagery for crop monitoring." },
      { q: "How do you handle large datasets from field sensors?", a: "We utilize scalable time-series databases and cloud infrastructure specifically designed for IoT data." }
    ]
  },
  "media": {
    howWeHelp: [
      { title: "Content Delivery Platforms", description: "High-performance streaming and media hosting architectures.", link: "/services/web-app-development" },
      { title: "Digital Publishing CMS", description: "Custom headless CMS solutions for high-traffic news and editorial sites.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Audience Analytics", description: "Real-time dashboards tracking engagement, retention, and monetization.", link: "/services/agentic-ai-solutions" },
      { title: "Automated Content Tagging", description: "AI tools that automatically categorize and tag vast media libraries.", link: "/services/agentic-ai-solutions/process-automation" }
    ],
    relatedResources: [
      { title: "Media Streaming Architectures", description: "Build platforms that handle millions of concurrent users.", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80", link: "/services/web-app-development" },
      { title: "Headless CMS for Publishers", description: "Separate content from presentation for maximum speed.", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80", link: "/services/web-app-development/custom-web-apps" },
      { title: "AI in Media", description: "Leverage machine learning for content recommendation.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", link: "/services/agentic-ai-solutions" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&q=80",
    challenges: [
      { title: "Content Discovery", description: "Users struggle to find relevant content in massive media libraries." },
      { title: "Platform Scalability", description: "Sudden traffic spikes during breaking news or viral events crash servers." },
      { title: "Monetization Friction", description: "Complex paywalls and ad integrations degrade the user experience." }
    ],
    whyChooseUs: [
      { title: "High-Traffic Expertise", description: "We architect systems that effortlessly handle massive concurrent loads.", icon: "activity" },
      { title: "Immersive UI/UX", description: "We design engaging interfaces optimized for media consumption.", icon: "monitor-play" },
      { title: "Edge Caching Mastery", description: "We utilize advanced CDN strategies for lightning-fast global delivery.", icon: "globe" }
    ],
    faqs: [
      { q: "Can you build custom video streaming platforms?", a: "Yes, we develop scalable VoD and live streaming architectures utilizing modern cloud media services." },
      { q: "How do you ensure fast page loads for media-heavy sites?", a: "We implement advanced lazy-loading, responsive imagery, and edge caching (CDNs) to optimize performance." },
      { q: "Do you integrate with third-party paywall providers?", a: "Yes, we frequently integrate seamless subscription and metering systems for digital publishers." }
    ]
  },
  "automotive": {
    howWeHelp: [
      { title: "Dealer Management Systems", description: "Comprehensive CRMs tailored for automotive dealerships and inventory tracking.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Connected Car Integrations", description: "APIs that interface with vehicle telemetry for consumer or fleet apps.", link: "/services/web-app-development" },
      { title: "Virtual Showrooms", description: "Interactive 3D configurators allowing buyers to customize vehicles online.", link: "/services/web-app-development/ui-ux-design" },
      { title: "Predictive Maintenance", description: "AI analyzing telematics to alert drivers before mechanical failures occur.", link: "/services/agentic-ai-solutions" }
    ],
    relatedResources: [
      { title: "Automotive Software Solutions", description: "Digital transformation for OEMs and dealerships.", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80", link: "/services/web-app-development" },
      { title: "Virtual Showroom Development", description: "Engage buyers with interactive online configurators.", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80", link: "/services/web-app-development/ui-ux-design" },
      { title: "AI in Automotive", description: "Leverage telemetry data for predictive maintenance.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", link: "/services/agentic-ai-solutions" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1503376760367-12ea234d0b4a?w=800&q=80",
    challenges: [
      { title: "Fragmented Dealership Tools", description: "Sales, service, and inventory run on disconnected, legacy software." },
      { title: "Shifting Consumer Expectations", description: "Modern buyers demand seamless online vehicle research and purchasing options." },
      { title: "Underutilized Telemetry Data", description: "Vast amounts of connected car data are collected but not leveraged for insights." }
    ],
    whyChooseUs: [
      { title: "Omnichannel Retailing", description: "We bridge the online and in-store automotive buying experience.", icon: "globe" },
      { title: "Complex Integrations", description: "We connect modern web platforms with legacy dealer management systems.", icon: "layers" },
      { title: "High-Fidelity UI", description: "We build stunning visual configurators that drive consumer engagement.", icon: "layout" }
    ],
    faqs: [
      { q: "Can you integrate with existing Dealer Management Systems (DMS)?", a: "Yes, we specialize in building APIs that connect modern web frontends with legacy DMS backends." },
      { q: "Do you build native apps for connected vehicles?", a: "We build companion mobile applications that integrate securely with OEM telemetry APIs." },
      { q: "How do you handle 3D configurator performance?", a: "We utilize optimized WebGL and asset streaming to ensure smooth 3D experiences in the browser." }
    ]
  },
  "insurance": {
    howWeHelp: [
      { title: "Digital Policy Portals", description: "Self-service dashboards for customers to manage policies and file claims.", link: "/services/web-app-development" },
      { title: "Automated Underwriting", description: "AI-driven risk assessment models to accelerate the quotation process.", link: "/services/agentic-ai-solutions" },
      { title: "Agency Management Systems", description: "Comprehensive CRMs for brokers to manage leads and policy renewals.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Claims Processing Automation", description: "Intelligent document parsing and workflow automation for faster claim resolution.", link: "/services/agentic-ai-solutions/process-automation" }
    ],
    relatedResources: [
      { title: "InsurTech Development", description: "Modernize insurance operations with custom software.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", link: "/services/web-app-development" },
      { title: "AI Underwriting", description: "Improve risk assessment accuracy with machine learning.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", link: "/services/agentic-ai-solutions" },
      { title: "Customer Portal UX", description: "Design frictionless experiences for policyholders.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", link: "/services/web-app-development/ui-ux-design" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    challenges: [
      { title: "Slow Claims Processing", description: "Manual data entry and disjointed systems lead to frustrated claimants." },
      { title: "Legacy Core Systems", description: "Outdated mainframe architectures make it difficult to launch digital products." },
      { title: "Complex Risk Assessment", description: "Traditional underwriting models are slow and often lack granular data." }
    ],
    whyChooseUs: [
      { title: "Compliance-First Architecture", description: "We build secure systems adhering to strict financial regulations.", icon: "shield-check" },
      { title: "Process Automation", description: "We excel at digitizing and accelerating complex bureaucratic workflows.", icon: "activity" },
      { title: "Seamless Integration", description: "We modernize frontends while securely communicating with legacy core systems.", icon: "layers" }
    ],
    faqs: [
      { q: "Can you automate the claims intake process?", a: "Yes, we implement AI-driven OCR and NLP to parse documents and photos submitted by users automatically." },
      { q: "Do you build white-label solutions for brokers?", a: "Absolutely. We develop customizable platforms that agencies can brand and offer to their clients." },
      { q: "How do you ensure data security?", a: "We utilize end-to-end encryption, strict role-based access controls, and regular security audits." }
    ]
  },
  "non-profit": {
    howWeHelp: [
      { title: "Donation Platforms", description: "Secure, frictionless custom donation gateways with recurring giving options.", link: "/services/web-app-development" },
      { title: "Donor Management (CRM)", description: "Centralized databases tracking engagement, contributions, and campaign success.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Volunteer Portals", description: "Streamlined platforms for scheduling, onboarding, and communicating with volunteers.", link: "/services/web-app-development/ui-ux-design" },
      { title: "Impact Reporting", description: "Automated dashboards demonstrating organizational impact to stakeholders and grantmakers.", link: "/services/agentic-ai-solutions/process-automation" }
    ],
    relatedResources: [
      { title: "Non-Profit Tech Solutions", description: "Digital tools to amplify your organization's mission.", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80", link: "/services/web-app-development" },
      { title: "Maximizing Digital Fundraising", description: "Optimize your web presence for higher donation conversions.", image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=800&q=80", link: "/services/digital-marketing" },
      { title: "Custom Donor CRMs", description: "Manage relationships more effectively with bespoke software.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", link: "/services/web-app-development/custom-web-apps" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    challenges: [
      { title: "Donor Retention", description: "Difficulty engaging one-time donors and converting them to recurring supporters." },
      { title: "Resource Constraints", description: "Limited staff forces non-profits to spend too much time on administrative tasks." },
      { title: "Fragmented Tools", description: "Using separate, disconnected platforms for email, donations, and volunteer management." }
    ],
    whyChooseUs: [
      { title: "Mission-Driven Design", description: "We craft empathetic digital experiences that tell your story effectively.", icon: "heart" },
      { title: "Cost-Effective Scalability", description: "We build scalable solutions that maximize ROI for tight budgets.", icon: "trending-up" },
      { title: "Unified Ecosystems", description: "We integrate your disparate tools into a single, efficient platform.", icon: "layers" }
    ],
    faqs: [
      { q: "Can you integrate with our existing payment processor?", a: "Yes, we integrate with Stripe, PayPal, and specialized non-profit processors like Blackbaud." },
      { q: "Do you offer discounted rates for non-profits?", a: "We frequently offer tailored pricing structures or specialized packages for registered 501(c)(3) organizations." },
      { q: "Can you build peer-to-peer fundraising platforms?", a: "Yes, we can develop custom campaign platforms allowing supporters to fundraise on your behalf." }
    ]
  },
  "government": {
    howWeHelp: [
      { title: "Citizen Service Portals", description: "Accessible, secure web platforms for digital public service delivery.", link: "/services/web-app-development" },
      { title: "Data Management Systems", description: "Scalable, compliant databases for secure inter-agency data sharing.", link: "/services/web-app-development/custom-web-apps" },
      { title: "Process Automation", description: "Digitizing paper-based bureaucratic workflows for faster processing.", link: "/services/agentic-ai-solutions/process-automation" },
      { title: "Open Data Dashboards", description: "Public-facing analytics portals promoting transparency and civic engagement.", link: "/services/web-app-development/ui-ux-design" }
    ],
    relatedResources: [
      { title: "GovTech Development", description: "Modernizing public sector digital infrastructure.", image: "https://images.unsplash.com/photo-1523292562811-8fa7962ba765?w=800&q=80", link: "/services/web-app-development" },
      { title: "Digital Accessibility in Government", description: "Ensuring compliance with WCAG and Section 508 standards.", image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80", link: "/services/web-app-development/ui-ux-design" },
      { title: "Secure Cloud Migration", description: "Moving legacy municipal systems to secure cloud environments.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", link: "/services/web-app-development/custom-web-apps" }
    ],
    challengeImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
    challenges: [
      { title: "Legacy Infrastructure", description: "Outdated IT systems create security vulnerabilities and slow down service delivery." },
      { title: "Accessibility Compliance", description: "Ensuring all digital platforms are usable by citizens of all abilities is complex." },
      { title: "Data Silos", description: "Lack of interoperability between different government departments hinders efficiency." }
    ],
    whyChooseUs: [
      { title: "Strict Compliance", description: "We architect systems adhering to stringent government security standards.", icon: "shield-check" },
      { title: "Accessibility First", description: "We design strictly to WCAG 2.1 AA and Section 508 requirements.", icon: "user-check" },
      { title: "Scalable Public Infrastructure", description: "We build platforms capable of handling massive civic traffic spikes safely.", icon: "cloud" }
    ],
    faqs: [
      { q: "Are your platforms fully accessible?", a: "Yes, accessibility is built into our core development process, ensuring compliance with legal standards." },
      { q: "How do you handle sensitive citizen data?", a: "We utilize robust encryption, secure cloud infrastructure, and strict role-based access auditing." },
      { q: "Can you modernize legacy mainframe applications?", a: "We specialize in developing modern API wrappers and gradual migration strategies to safely modernize legacy systems." }
    ]
  }
};

const filePath = path.join(__dirname, 'data', 'industries.js');
let content = fs.readFileSync(filePath, 'utf8');

// Use a regex or simple AST approach to inject data.
// The file is a javascript module exporting industriesData array.
// I will just parse the file if possible, or use a naive replacement.
// Actually, it's safer to use eval or better yet, since we have the data, we can just replace the string.

// A better way: Let's require the file, map it, and write it back.
// Since it uses ES modules (export const), we can dynamically import it, or just use Babel/regex.
// Let's use regex to find each industry object and insert the missing properties.

for (const [slug, data] of Object.entries(additionalData)) {
  const regex = new RegExp(`(slug:\\s*["']${slug}["'],[\\s\\S]*?features:\\s*\\[[\\s\\S]*?\\]\\n\\s*)(\\})`, 'g');
  
  const additionalString = `,
    howWeHelp: ${JSON.stringify(data.howWeHelp, null, 4).replace(/\\n/g, '').replace(/\n/g, '\n    ')},
    relatedResources: ${JSON.stringify(data.relatedResources, null, 4).replace(/\\n/g, '').replace(/\n/g, '\n    ')},
    challengeImage: "${data.challengeImage}",
    challenges: ${JSON.stringify(data.challenges, null, 4).replace(/\\n/g, '').replace(/\n/g, '\n    ')},
    whyChooseUs: ${JSON.stringify(data.whyChooseUs, null, 4).replace(/\\n/g, '').replace(/\n/g, '\n    ')},
    faqs: ${JSON.stringify(data.faqs, null, 4).replace(/\\n/g, '').replace(/\n/g, '\n    ')}
  `;
  
  content = content.replace(regex, `$1${additionalString}$2`);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated industries.js");
