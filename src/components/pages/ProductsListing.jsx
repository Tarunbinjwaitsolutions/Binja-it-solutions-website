"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import dynamic from 'next/dynamic';

const DemoModal = dynamic(() => import('@/components/ui/DemoModal'), { ssr: false });

const ProductsListing = () => {
  const [selectedDemoProduct, setSelectedDemoProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      name: "Agentic AI",
      description: "Intelligent AI-powered automation that learns and adapts to your business processes. Automate complex workflows with autonomous agents.",
      features: [
        "AI-powered autonomous task execution",
        "Natural language processing for workflow automation",
        "Real-time learning and adaptation",
        "Integration with existing tools",
        "Advanced analytics and reporting"
      ],
      detailsLink: "/products/agentic-ai",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Social Media Management",
      description: "Complete social media management platform for scheduling, analytics, and engagement. Manage all your social channels from one dashboard.",
      features: [
        "Multi-channel scheduling and publishing",
        "Advanced analytics and insights",
        "Content calendar and planning tools",
        "Engagement monitoring and automation",
        "Team collaboration features"
      ],
      detailsLink: "/products/smm",
      image: "/download.webp"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 transition-colors duration-300 theme-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 theme-text"
          >
            Our <span className="theme-accent">Products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto leading-relaxed theme-text-secondary"
          >
            Powerful solutions designed to transform your business operations, streamline workflows, and drive unprecedented growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {products.map((product, idx) => (
            <ProductCard
              key={idx}
              name={product.name}
              description={product.description}
              features={product.features}
              detailsLink={product.detailsLink}
              image={product.image}
              onTryDemo={() => setSelectedDemoProduct(product.name)}
            />
          ))}
        </div>
      </div>

      <DemoModal
        isOpen={!!selectedDemoProduct}
        onClose={() => setSelectedDemoProduct(null)}
        productName={selectedDemoProduct || ''}
      />
    </div>
  );
};

export default ProductsListing;
