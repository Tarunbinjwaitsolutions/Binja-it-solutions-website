export const predictiveAnalyticsContent = {
  hero: {
    title: "Predictive Analytics",
    tagline: "Turn Historical Data into Accurate Future Forecasts",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "#" },
      { name: "Agentic AI Solutions", url: "/services/agentic-ai-solutions" },
      { name: "Predictive Analytics", url: "/services/agentic-ai-solutions/predictive-analytics" }
    ],
  },
  overview: {
    description: "Stop guessing. We build custom machine learning models that analyze your historical business data to accurately forecast sales, predict equipment failures, and anticipate customer churn.",
    benefits: [
      { title: "Data-Driven Decisions", icon: "LineChart" },
      { title: "Risk Mitigation", icon: "ShieldCheck" },
      { title: "Optimized Inventory", icon: "Layers" },
      { title: "Higher ROI Marketing", icon: "Zap" },
      { title: "Proactive Maintenance", icon: "PenTool" }
    ]
  },
  problemsWeSolve: [
    { problem: "Businesses make decisions based on guesswork and gut feeling", solution: "We build data-driven forecasting models for accurate, confident decisions" },
    { problem: "Unexpected equipment breakdowns causing costly downtime", solution: "Predictive maintenance algorithms that flag anomalies before failure" },
    { problem: "Overstocking or running out of inventory", solution: "Demand forecasting models that predict exact supply needs based on seasonality and trends" },
    { problem: "Wasting marketing budget on unlikely buyers", solution: "Propensity modeling to target only customers with a high likelihood to purchase" }
  ],
  whatsIncluded: [
    { title: "Data Warehousing & Cleaning", icon: "Database" },
    { title: "Custom ML Model Development", icon: "Code" },
    { title: "Demand Forecasting", icon: "LineChart" },
    { title: "Churn & Lifetime Value Models", icon: "Search" },
    { title: "Real-time Dashboarding", icon: "Smartphone" },
    { title: "Ongoing Model Retraining", icon: "Layers" }
  ],
  process: [
    { title: "Data Audit", description: "Assessing the quality, volume, and structure of your existing historical data." },
    { title: "Data Engineering", description: "Cleaning the data and building pipelines to feed it into a secure warehouse." },
    { title: "Model Training & Validation", description: "Building the ML algorithms and back-testing them against historical data for accuracy." },
    { title: "Deployment & Visualization", description: "Connecting the models to a BI dashboard (Tableau, PowerBI, or custom) for easy monitoring." }
  ],
  whyChooseUs: [
    "Deep expertise in Python, scikit-learn, and TensorFlow",
    "Focus on data cleanliness (the foundation of good AI)",
    "Experience building intuitive, non-technical BI dashboards",
    "Commitment to explainable AI (XAI) so you understand *why* the model made a prediction"
  ],
  relatedServices: [
    { title: "AI-powered CRM Integration", url: "/services/agentic-ai-solutions/ai-crm-integration" },
    { title: "AI Recommendation Systems", url: "/services/agentic-ai-solutions/ai-recommendation-systems" },
    { title: "Document Processing & Data Extraction", url: "/services/agentic-ai-solutions/document-processing-ai" }
  ],
  faqs: [
    { question: "Do we have enough data for predictive analytics?", answer: "Machine learning requires a decent volume of historical data to find patterns. During our initial consultation, our data scientists will audit your databases to determine if you meet the threshold for accurate forecasting." },
    { question: "What if our data is messy or spread across multiple systems?", answer: "This is very common! The first phase of our process is Data Engineering, where we extract, clean, and consolidate your data into a single 'Source of Truth' data warehouse before applying any AI." },
    { question: "Can we integrate these predictions into our existing software?", answer: "Yes, we deploy our models via secure APIs, meaning the predictions can be piped directly into your CRM, ERP, or custom web applications." },
    { question: "How do you ensure the model stays accurate over time?", answer: "Markets change, which can cause 'model drift'. We set up MLOps pipelines that continuously monitor the model's accuracy and automatically retrain it with fresh data at regular intervals." }
  ],
  finalCta: {
    heading: "Ready to Look Into the Future?",
    subtext: "Let's turn your raw data into a competitive advantage.",
  }
};
