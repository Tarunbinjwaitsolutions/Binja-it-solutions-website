export const documentProcessingAiContent = {
  hero: {
    title: "Document Processing & Data Extraction",
    tagline: "Turn Unstructured Documents into Actionable Data with AI",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "#" },
      { name: "Agentic AI Solutions", url: "/services/agentic-ai-solutions" },
      { name: "Document Processing AI", url: "/services/agentic-ai-solutions/document-processing-ai" }
    ],
  },
  overview: {
    description: "We utilize advanced Intelligent Document Processing (IDP) and Computer Vision to automatically extract, classify, and validate data from invoices, receipts, contracts, and handwritten forms at scale.",
    benefits: [
      { title: "99% Extraction Accuracy", icon: "ShieldCheck" },
      { title: "Eliminate Manual Entry", icon: "Zap" },
      { title: "Multi-format Support (PDF, JPG)", icon: "Layers" },
      { title: "Handwriting Recognition", icon: "PenTool" },
      { title: "Automated Data Validation", icon: "Database" }
    ]
  },
  problemsWeSolve: [
    { problem: "Hundreds of hours wasted on manual data entry", solution: "AI models that extract fields instantly from thousands of documents" },
    { problem: "High error rates from manual typing", solution: "Automated extraction with built-in confidence scoring and validation checks" },
    { problem: "Inability to process non-standard document formats", solution: "Generative AI that understands context, not just rigid templates" },
    { problem: "Slow processing of invoices causing payment delays", solution: "Instant parsing and ERP routing the moment an invoice is received" }
  ],
  whatsIncluded: [
    { title: "Optical Character Recognition (OCR)", icon: "Search" },
    { title: "Contextual LLM Extraction", icon: "Code" },
    { title: "Automated Document Classification", icon: "Layers" },
    { title: "ERP & Accounting Integration", icon: "Database" },
    { title: "Human-in-the-loop Verification", icon: "ShieldCheck" },
    { title: "Multi-language Support", icon: "PenTool" }
  ],
  process: [
    { title: "Document Analysis", description: "Reviewing sample documents and determining the required extraction fields." },
    { title: "Model Training & Selection", description: "Utilizing OCR combined with LLMs for unstructured data comprehension." },
    { title: "Integration Pipeline", description: "Setting up webhooks so data flows directly into your database or ERP." },
    { title: "Accuracy Tuning", description: "Reviewing edge cases and fine-tuning the model to achieve 99%+ accuracy." }
  ],
  whyChooseUs: [
    "Expertise in modern IDP tools (AWS Textract, Google Document AI, Azure Form Recognizer)",
    "Use of LLMs (like GPT-4V) for complex, unstructured document understanding",
    "Seamless integration with SAP, QuickBooks, and custom databases",
    "Focus on building robust 'Human-in-the-loop' review queues for low-confidence scans"
  ],
  relatedServices: [
    { title: "Workflow Automation (RPA)", url: "/services/agentic-ai-solutions/workflow-automation-rpa" },
    { title: "Custom LLM Integration", url: "/services/agentic-ai-solutions/custom-llm-integration" },
    { title: "Predictive Analytics", url: "/services/agentic-ai-solutions/predictive-analytics" }
  ],
  faqs: [
    { question: "Can the AI read messy handwriting?", answer: "Yes. While standard OCR struggles with handwriting, modern AI models excel at interpreting handwritten notes, forms, and signatures with high accuracy." },
    { question: "Do documents need to be in a specific template?", answer: "No. Legacy systems required rigid templates. Our LLM-powered approach understands context, meaning it can find 'Total Amount' on an invoice regardless of where it is placed on the page." },
    { question: "What happens if the AI isn't sure about a field?", answer: "We implement a confidence threshold. If the AI is less than 95% confident (configurable), the document is flagged and routed to a simple dashboard for a human to quickly verify." },
    { question: "What languages do you support?", answer: "Our models support over 50 languages, including complex character sets like Arabic, Chinese, and Japanese." }
  ],
  finalCta: {
    heading: "Ready to Digitize Your Paper Trail?",
    subtext: "Let's automate your document workflows and eliminate manual data entry forever.",
  }
};
