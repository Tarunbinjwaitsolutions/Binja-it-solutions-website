import React from 'react';
import { TrendingUp, Users, Zap, Clock, Bot, BarChart, ShieldCheck, Rocket, Diamond, Crown, Building2, PhoneCall, Layers, ArrowUpDown, Mic, MessageSquare, Tag, Megaphone, Settings, Calendar, FileText, Mail, Globe, Volume2, Headphones, Code } from 'lucide-react';

export const KEY_BENEFITS = [
  { title: "Up to 75% Reduction in Calling Costs", description: "Automate calls and conversations at scale and significantly reduce operational costs.", highlight: "Up to 75% Cost Savings", icon: <TrendingUp className="w-8 h-8 text-orange-500" /> },
  { title: "Increased Lead Conversion Rates", description: "AI-driven engagement, smart follow-ups & timely responses convert more leads into customers.", highlight: "Higher Conversions", icon: <Users className="w-8 h-8 text-orange-500" /> },
  { title: "Faster Customer Response Time", description: "Instant AI responses and automated workflows ensure customers get answers faster, every time.", highlight: "Up to 90% Faster Response", icon: <Zap className="w-8 h-8 text-orange-500" /> },
  { title: "Reduced Manual Workload", description: "Automate repetitive tasks and call handling so your team can focus on what matters most – closing deals.", highlight: "Save Hours Every Day", icon: <Clock className="w-8 h-8 text-orange-500" /> },
  { title: "24×7 Customer Engagement", description: "AI voice agents work around the clock to engage, qualify and support customers without any downtime.", highlight: "24/7 Always Engaging", icon: <Bot className="w-8 h-8 text-orange-500" /> },
  { title: "Real-Time Reporting & Analytics", description: "Track performance, monitor campaigns and get actionable insights in real-time to make better decisions.", highlight: "Real-Time Insights", icon: <BarChart className="w-8 h-8 text-orange-500" /> },
  { title: "Reduce Manpower, 10X Business Growth", description: "Automate conversations and operations to reduce manpower dependency and drive up to 10X growth in your business.", highlight: "Up to 10X Business Growth", icon: <TrendingUp className="w-8 h-8 text-orange-500" /> },
  { title: "Secure & Scalable Infrastructure", description: "Enterprise-grade security, 99.99% uptime and scalable architecture that grows with your business.", highlight: "99.99% Uptime Guaranteed", icon: <ShieldCheck className="w-8 h-8 text-orange-500" /> }
];

export const PLANS = [
  { id: "starter", name: "STARTER", tagline: "IVR Only", color: "var(--accent)", grad: ["#ea580c", "#f59e0b"], icon: <Rocket className="w-6 h-6 text-white" />, summary: "Essential voice automated call flow features to kickstart your communication.", highlights: ["Bulk IVR Calling", "Multi-Level IVR Routing", "Press-1 Human Transfer", "Call Recording", "Real-Time CRM Reports"] },
  { id: "essential", name: "ESSENTIAL", tagline: "IVR + WhatsApp", color: "#0066CC", grad: ["#2563eb", "#06b6d4"], icon: <Diamond className="w-6 h-6 text-white" />, summary: "Integrates voice calls with advanced WhatsApp campaigns and CRM management.", highlights: ["Everything in Starter", "WhatsApp Auto-Reply", "WhatsApp Team Dashboard", "Tag, Filter & Transfer Leads", "Broadcast WhatsApp Campaigns"] },
  { id: "growth", name: "GROWTH", tagline: "IVR + AI Agent", color: "#7928CA", grad: ["#9333ea", "#6366f1"], icon: <TrendingUp className="w-6 h-6 text-white" />, summary: "Advanced AI calling capabilities for complete round-the-clock automation.", highlights: ["Everything in Starter", "AI Outbound Call Agent", "AI 24/7 Inbound Handling", "AI Meeting & Calendar Sync", "Multilingual Voice Support"] },
  { id: "pro", name: "PRO", tagline: "IVR + AI + WhatsApp", color: "#FFB800", grad: ["#1e3a8a", "#0f172a"], icon: <Crown className="w-6 h-6" style={{ color: '#FFB800' }} />, isPopular: true, summary: "The ultimate unified system combining voice calls, AI power, and WhatsApp automation.", highlights: ["Everything in Growth & Essential", "17+ Advanced Features included", "Male/Female/Neural Voices", "Advanced Auto Email Alerts"] },
  { id: "enterprise", name: "ENTERPRISE", tagline: "Full Suite + Custom", color: "#D9383A", grad: ["#dc2626", "#f43f5e"], icon: <Building2 className="w-6 h-6 text-white" />, summary: "Custom built features, dedicated architecture, and tailored CRM integrations.", highlights: ["100% Features Included", "Custom Voice Branding", "Dedicated Account Manager", "Custom API & CRM Integration", "99.99% Uptime SLA Guaranteed"] }
];

export const FEATURES_DATA = [
  {
    category: "IVR & Call Routing", features: [
      { name: "Bulk IVR Calling", icon: <PhoneCall className="w-5 h-5 text-emerald-500" />, starter: true, essential: true, growth: true, pro: true, enterprise: true },
      { name: "Multi-Level IVR Routing", icon: <Layers className="w-5 h-5 text-indigo-500" />, starter: true, essential: true, growth: true, pro: true, enterprise: true },
      { name: "Press-1 Human Transfer", icon: <ArrowUpDown className="w-5 h-5 text-sky-500" />, starter: true, essential: true, growth: true, pro: true, enterprise: true },
      { name: "Call Recording", icon: <Mic className="w-5 h-5 text-red-500" />, starter: true, essential: true, growth: true, pro: true, enterprise: true },
      { name: "Real-Time CRM Reports", icon: <BarChart className="w-5 h-5 text-teal-500" />, starter: true, essential: true, growth: true, pro: true, enterprise: true },
    ]
  },
  {
    category: "WhatsApp Automation", features: [
      { name: "WhatsApp Auto-Reply", icon: <MessageSquare className="w-5 h-5 text-green-500" />, starter: false, essential: true, growth: false, pro: true, enterprise: true },
      { name: "WhatsApp Team Dashboard", icon: <Users className="w-5 h-5 text-blue-500" />, starter: false, essential: true, growth: false, pro: true, enterprise: true },
      { name: "Tag, Filter & Transfer Leads", icon: <Tag className="w-5 h-5 text-cyan-500" />, starter: false, essential: true, growth: false, pro: true, enterprise: true },
      { name: "Broadcast Campaigns (WhatsApp)", icon: <Megaphone className="w-5 h-5 text-violet-500" />, starter: false, essential: true, growth: false, pro: true, enterprise: true },
      { name: "Admin & Team Member Management", icon: <Settings className="w-5 h-5 text-slate-500" />, starter: false, essential: true, growth: false, pro: true, enterprise: true },
    ]
  },
  {
    category: "AI & Meeting Automation", features: [
      { name: "AI Voice Calling Agent (Outbound)", icon: <Bot className="w-5 h-5 text-orange-500" />, starter: false, essential: false, growth: true, pro: true, enterprise: true },
      { name: "AI Inbound Call Handling (24/7)", icon: <Clock className="w-5 h-5 text-emerald-500" />, starter: false, essential: false, growth: true, pro: true, enterprise: true },
      { name: "AI Meeting Booking & Calendar Sync", icon: <Calendar className="w-5 h-5 text-rose-500" />, starter: false, essential: false, growth: true, pro: true, enterprise: true },
      { name: "AI Call Transcript & Summary", icon: <FileText className="w-5 h-5 text-amber-500" />, starter: false, essential: false, growth: true, pro: true, enterprise: true },
      { name: "Auto Email on Meeting Booked", icon: <Mail className="w-5 h-5 text-sky-500" />, starter: false, essential: false, growth: true, pro: true, enterprise: true },
      { name: "Multilingual Voice Support", icon: <Globe className="w-5 h-5 text-indigo-500" />, starter: false, essential: false, growth: true, pro: true, enterprise: true },
      { name: "Male / Female / Neural Voice", icon: <Volume2 className="w-5 h-5 text-violet-500" />, starter: false, essential: false, growth: true, pro: true, enterprise: true },
    ]
  },
  {
    category: "Branding & Integrations", features: [
      { name: "Custom Voice Branding", icon: <ShieldCheck className="w-5 h-5 text-orange-600" />, starter: false, essential: false, growth: false, pro: false, enterprise: true },
      { name: "Dedicated Account Manager", icon: <Headphones className="w-5 h-5 text-pink-500" />, starter: false, essential: false, growth: false, pro: false, enterprise: true },
      { name: "Custom API & CRM Integration", icon: <Code className="w-5 h-5 text-blue-600" />, starter: false, essential: false, growth: false, pro: false, enterprise: true },
    ]
  }
];

export const HERO_CARDS = [
  { n: 1, title: "Bulk IVR Calling", desc: "Reach thousands instantly with intelligent IVR loop calling.", icon: <PhoneCall className="w-6 h-6 text-orange-500" /> },
  { n: 2, title: "AI Voice Agent", desc: "AI-powered voice agents that engage, qualify & convert leads 24/7.", icon: <Bot className="w-6 h-6 text-orange-500" /> },
  { n: 3, title: "CRM & WhatsApp", desc: "Manage leads, automate conversations & grow sales with it.", icon: <MessageSquare className="w-6 h-6 text-orange-500" /> },
  { n: 4, title: "Multi-Language", desc: "Connect with customers in multiple languages using natural AI voices.", icon: <Globe className="w-6 h-6 text-orange-500" /> }
];

export const HIGHLIGHTS = ["Enterprise Grade Security", "Scalable as You Grow", "99.99%+ Uptime", "Your Data is Safe", "Built for Reliability"];

export const ALL_FEATURES = FEATURES_DATA.reduce((acc, cat) => [...acc, ...cat.features], []);

