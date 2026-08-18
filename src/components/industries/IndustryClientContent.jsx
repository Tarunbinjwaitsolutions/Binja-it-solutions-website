"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, HeartPulse, Landmark, ShoppingCart, Home, Building2, Video,
  UserCheck, Shield, CreditCard, AlertTriangle, PieChart, ShoppingBag,
  Box, Layers, Camera, Users, GraduationCap, Gavel, Factory, Truck, Map,
  Rocket, Sprout, MonitorPlay, Car, ShieldCheck, HeartHandshake, FileText,
  CheckCircle, Briefcase, Clock, Search, Activity, Globe, Calendar,
  Smartphone, Crosshair, TrendingUp, Cloud, Layout, Radio, Heart, BookOpen,
  Share2, Monitor, FileCheck, MapPin
} from 'lucide-react';
import IndustryFAQ from './IndustryFAQ';

// Map slug/icon string to actual lucide-react icon component
const getIcon = (iconName, className = "w-6 h-6") => {
  switch (iconName) {
    case 'healthcare': return <HeartPulse className={className} />;
    case 'finance': return <Landmark className={className} />;
    case 'e-commerce': return <ShoppingCart className={className} />;
    case 'real-estate': return <Home className={className} />;
    case 'education': return <GraduationCap className={className} />;
    case 'legal': return <Gavel className={className} />;
    case 'manufacturing': return <Factory className={className} />;
    case 'logistics': return <Truck className={className} />;
    case 'hospitality': return <Map className={className} />;
    case 'startups': return <Rocket className={className} />;
    case 'agriculture': return <Sprout className={className} />;
    case 'media': return <MonitorPlay className={className} />;
    case 'automotive': return <Car className={className} />;
    case 'insurance': return <ShieldCheck className={className} />;
    case 'non-profit': return <HeartHandshake className={className} />;
    case 'government': return <FileText className={className} />;

    // Feature Icons
    case 'video': return <Video className={className} />;
    case 'user-check': return <UserCheck className={className} />;
    case 'shield': return <Shield className={className} />;
    case 'layers': return <Layers className={className} />;
    case 'users': return <Users className={className} />;
    case 'credit-card': return <CreditCard className={className} />;
    case 'alert-triangle': return <AlertTriangle className={className} />;
    case 'pie-chart': return <PieChart className={className} />;
    case 'shopping-bag': return <ShoppingBag className={className} />;
    case 'box': return <Box className={className} />;
    case 'camera': return <Camera className={className} />;
    case 'building': return <Building2 className={className} />;
    case 'graduation-cap': return <GraduationCap className={className} />;
    case 'truck': return <Truck className={className} />;
    case 'map': return <Map className={className} />;
    case 'rocket': return <Rocket className={className} />;
    case 'sprout': return <Sprout className={className} />;
    case 'monitor-play': return <MonitorPlay className={className} />;
    case 'car': return <Car className={className} />;
    case 'shield-check': return <ShieldCheck className={className} />;
    case 'heart-handshake': return <HeartHandshake className={className} />;
    case 'file-text': return <FileText className={className} />;
    case 'check-circle': return <CheckCircle className={className} />;
    case 'briefcase': return <Briefcase className={className} />;
    case 'clock': return <Clock className={className} />;
    case 'search': return <Search className={className} />;
    case 'activity': return <Activity className={className} />;
    case 'globe': return <Globe className={className} />;
    case 'calendar': return <Calendar className={className} />;
    case 'smartphone': return <Smartphone className={className} />;
    case 'crosshair': return <Crosshair className={className} />;
    case 'trending-up': return <TrendingUp className={className} />;
    case 'cloud': return <Cloud className={className} />;
    case 'layout': return <Layout className={className} />;
    case 'radio': return <Radio className={className} />;
    case 'heart': return <Heart className={className} />;
    case 'book-open': return <BookOpen className={className} />;
    case 'share-2': return <Share2 className={className} />;
    case 'monitor': return <Monitor className={className} />;
    case 'file-check': return <FileCheck className={className} />;
    case 'map-pin': return <MapPin className={className} />;
    default: return <CheckCircle className={className} />;
  }
};

const getFeatureImage = (industrySlug, index) => {
  const industryImages = {
    'healthcare': [
      
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
      
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80"
    ],
    'banking-finance-bfsi': [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&q=80",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
    ],
    'education-edtech': [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
      
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80"
    ],
    'manufacturing': [
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80",
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80"
    ],
    'automotive': [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      
      
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80",
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&q=80"
    ],
    'real-estate': [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
    ],
    'e-commerce-retail': [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
      
      
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80"
    ],
    'logistics-transportation': [
      
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80",
      
      "https://images.unsplash.com/photo-1501705388883-4ed8a543392c?w=800&q=80",
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80"],
    'hospitality-travel': [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      
      
      
      
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
    ],
    'agriculture-agritech': [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
      
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80",
      
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
      "https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?w=800&q=80",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80"
    ],
    'media-entertainment': [
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
      "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
      
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80"
    ]
  };

  const defaultImages = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
  ];

  const targetImages = industryImages[industrySlug] || defaultImages;
  return targetImages[index % targetImages.length];
};

export default function IndustryClientContent({ industry }) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-20">
      {/* 2. Highlights / Quick Stats Row */}
      {industry.overview && industry.overview.length > 0 && (
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
          >
            {[
              { num: "01", text: industry.overview[0]?.substring(0, 150) + "...", highlight: "Domain Expertise" },
              { num: "02", text: industry.overview[1]?.substring(0, 150) + "...", highlight: "Digital Transformation" },
              { num: "03", text: industry.overview[2]?.substring(0, 150) + "...", highlight: "Scalable Platforms" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-6xl font-black text-transparent mb-4" style={{ WebkitTextStroke: '1px var(--text-color)', opacity: 0.3 }}>
                  {stat.num}
                </span>
                <div className="h-px w-full bg-gray-300 dark:bg-gray-700 mb-6"></div>
                <h3 className="text-2xl font-bold theme-text mb-3">{stat.highlight}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stat.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* NEW: Industry Challenges */}
      {industry.challenges && (
        <div className="mb-24">
          <h2 className="text-4xl font-bold theme-text mb-12">Industry Challenges We Solve</h2>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              {industry.challenges.map((challenge, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold theme-text mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{challenge.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 h-[400px] relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={industry.challengeImage || industry.image}
                alt="Industry Challenges"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* 3. How We Help */}
      {industry.howWeHelp && (
        <div className="mb-24">
          <h2 className="text-4xl font-bold theme-text mb-12">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industry.howWeHelp.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <span className="text-5xl font-black text-transparent mb-4 block" style={{ WebkitTextStroke: '1px var(--text-color)', opacity: 0.2 }}>
                  0{index + 1}
                </span>
                <h3 className="text-2xl font-bold theme-text mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {item.description}
                </p>
                <Link href={item.link} className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium group focus:outline-none">
                  Learn more <ArrowLeft className="w-4 h-4 ml-2 rotate-180 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Core Capabilities (Restored) */}
      <div className="mb-24">
        <h2 className="text-4xl font-bold theme-text mb-12">Core Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industry.features?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(30,27,75,0.4)] group hover:bg-gradient-to-br hover:from-[#1e1b4b] hover:to-purple-900 hover:border-transparent"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <Link href={`/industries/${industry.slug}/${feature.slug}`} className="block flex-1 flex flex-col focus:outline-none">
                <div className="relative w-full h-56 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                  <Image
                    src={getFeatureImage(industry.slug, index)}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[var(--accent)] group-hover:text-[#1e1b4b] flex items-center justify-center shadow-lg transition-colors duration-300">
                    {getIcon(feature.icon, "w-5 h-5")}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col relative z-10">
                  <h3 className="text-xl font-bold theme-text mb-3 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm flex-grow group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-orange-500 mt-4 group-hover:text-white transition-colors duration-300">
                    Explore Solutions <ArrowLeft className="w-4 h-4 ml-1 rotate-180 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* NEW: Why Choose Us */}
      {industry.whyChooseUs && (
        <div className="mb-24 rounded-3xl p-12 lg:p-16 border relative overflow-hidden" style={{ backgroundColor: 'var(--section-alt-bg)', borderColor: 'var(--border)' }}>
          <h2 className="text-4xl font-bold theme-text mb-12 text-center relative z-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {industry.whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(reason.icon, "w-10 h-10")}
                </div>
                <h3 className="text-2xl font-bold theme-text mb-4">{reason.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"></div>
        </div>
      )}

      {/* New Related Resources Section */}
      {industry.relatedResources && (
        <div className="mb-24">
          <h2 className="text-4xl font-bold theme-text mb-12">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.relatedResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(30,27,75,0.4)] group hover:bg-gradient-to-br hover:from-[#1e1b4b] hover:to-purple-900 hover:border-transparent"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <Link href={resource.link} className="block flex-1 flex flex-col focus:outline-none">
                  <div className="relative w-full h-56 overflow-hidden shrink-0">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-8 flex-grow flex flex-col relative z-10">
                    <h3 className="text-xl font-bold theme-text mb-3 group-hover:text-white transition-colors duration-300">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow group-hover:text-white/90 transition-colors duration-300">
                      {resource.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-orange-500 mt-auto group-hover:text-white transition-colors duration-300">
                      Read more <ArrowLeft className="w-4 h-4 ml-1 rotate-180 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* NEW: Industry FAQs */}
      {industry.faqs && <IndustryFAQ faqs={industry.faqs} />}

      {/* CTA Section */}
      <div className="p-12 md:p-16 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-center justify-between" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mb-8 md:mb-0 md:mr-8">
          <h2 className="text-3xl md:text-4xl font-bold theme-text mb-4">Ready to transform your {industry.name} business?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Let's discuss how our tailored IT solutions can drive growth and efficiency for your organization.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl focus:outline-none">
            Schedule a Consultation <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
