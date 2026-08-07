"use client";

import React, { useEffect } from 'react';
import HeroSectionAI from '@/components/sections/HeroSectionAI';
import LandingPage from '../LandingPage';
import { Bot, Layers, Zap, Clock, Code, TrendingUp } from 'lucide-react';

const AgenticAILanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Autonomous Task Execution",
      description: "Handle complex tasks end-to-end without human intervention, allowing your team to focus on strategic initiatives.",
      icon: <Bot size={28} />
    },
    {
      title: "Multi-step Workflows",
      description: "Orchestrate complex business processes involving multiple tools, decisions, and sequential logic.",
      icon: <Layers size={28} />
    },
    {
      title: "Learning & Adaptation",
      description: "Continuously improves over time based on outcomes, adapting to edge cases and new scenarios automatically.",
      icon: <TrendingUp size={28} />
    },
    {
      title: "Real-time Monitoring",
      description: "Track all agent activities, performance metrics, and decision pathways through an intuitive dashboard.",
      icon: <Clock size={28} />
    },
    {
      title: "Custom Integration",
      description: "Connect securely to your existing CRM, ERP, databases, and APIs to empower your agents.",
      icon: <Code size={28} />
    },
    {
      title: "Instant Response",
      description: "Process data and respond to triggers in milliseconds, ensuring your business never misses an opportunity.",
      icon: <Zap size={28} />
    }
  ];

  const useCases = [
    "Customer Support Automation",
    "Data Processing & Analysis",
    "Business Process Automation",
    "Content Generation",
    "Report Generation",
    "Lead Qualification & Outreach"
  ];

  const plans = [
    {
      name: "Starter",
      tagline: "For small teams starting with AI",
      price: "$299",
      features: [
        "Up to 5 custom workflows",
        "10,000 actions / month",
        "Basic integrations",
        "Email support",
        "Standard analytics"
      ],
      buttonText: "Start Free Trial",
      isPopular: false
    },
    {
      name: "Professional",
      tagline: "For growing businesses scaling automation",
      price: "$799",
      features: [
        "Unlimited custom workflows",
        "100,000 actions / month",
        "Advanced integrations",
        "Priority 24/7 support",
        "Custom dashboards"
      ],
      buttonText: "Start Free Trial",
      isPopular: true
    },
    {
      name: "Enterprise",
      tagline: "Custom solutions for large organizations",
      price: "Custom",
      features: [
        "Dedicated infrastructure",
        "Unlimited actions",
        "Custom API development",
        "Dedicated success manager",
        "On-premise options"
      ],
      buttonText: "Contact Sales",
      isPopular: false
    }
  ];

  return (
    <div className="theme-bg theme-text">
      {/* <HeroSectionAI /> */}
      <LandingPage />
    </div>
  );
};

export default AgenticAILanding;
