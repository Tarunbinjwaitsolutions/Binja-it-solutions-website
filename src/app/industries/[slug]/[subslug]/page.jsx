import React from "react";
import { notFound } from "next/navigation";
import { industriesData } from "../../../../data/industries";
import { getSubServiceImages } from "../../../../config/subServiceImages";

import Hero from "../../../../components/services/sub-service/Hero";
import OverviewBenefits from "../../../../components/services/sub-service/OverviewBenefits";
import OurProcess from "../../../../components/services/sub-service/OurProcess";
import WhyChooseUs from "../../../../components/services/sub-service/WhyChooseUs";
import FinalCTA from "../../../../components/services/sub-service/FinalCTA";

export async function generateStaticParams() {
  const paths = [];
  
  for (const industry of industriesData) {
    if (industry.features) {
      for (const feature of industry.features) {
        paths.push({ slug: industry.slug, subslug: feature.slug });
      }
    }
  }

  return paths;
}

export async function generateMetadata({ params }) {
  const { slug, subslug } = await params;
  
  const industry = industriesData.find((i) => i.slug === slug);
  const feature = industry?.features?.find((f) => f.slug === subslug);

  if (feature) {
    return {
      title: `${feature.title} Solutions | ${industry.name} | Binjwa IT Solutions`,
      description: feature.description,
    };
  }

  return {
    title: "Industry Sub-Service Not Found",
  };
}

// Generate dynamic data for the components to avoid creating 100+ data files
const generateSubServiceData = (industry, feature, images) => {
  return {
    hero: {
      title: feature.title,
      tagline: feature.description,
      image: images.hero
    },
    overview: {
      title: `Transforming ${industry.name} with ${feature.title}`,
      description: `In the modern ${industry.name} landscape, leveraging cutting-edge technology is essential. Our ${feature.title} solutions are designed to address the core challenges of your sector, enhancing operational efficiency and driving sustainable growth.`,
      image: images.about,
      benefits: [
        {
          title: "Enhanced Efficiency",
          description: "Streamline workflows and reduce manual overhead."
        },
        {
          title: "Data-Driven Insights",
          description: "Make informed decisions with real-time analytics."
        },
        {
          title: "Scalable Architecture",
          description: "Future-proof solutions that grow with your business."
        }
      ]
    },
    process: {
      title: "Our Implementation Process",
      subtitle: `How we deploy ${feature.title}`,
      image: images.process,
      steps: [
        {
          title: "Discovery & Analysis",
          description: `Understanding your specific ${industry.name} requirements and objectives.`
        },
        {
          title: "Solution Design",
          description: `Architecting a custom ${feature.title} platform tailored to your needs.`
        },
        {
          title: "Development & Integration",
          description: "Building and seamlessly integrating with your existing systems."
        },
        {
          title: "Deployment & Training",
          description: "Rolling out the solution and ensuring your team is fully equipped."
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Binjwa IT Solutions?",
      subtitle: `Your trusted partner for ${feature.title}`,
      image: images.benefits, // Using benefits image here
      reasons: [
        {
          title: "Industry Expertise",
          description: `Deep understanding of the ${industry.name} sector's unique challenges.`
        },
        {
          title: "Custom Solutions",
          description: "We don't believe in one-size-fits-all. Every solution is tailored."
        },
        {
          title: "Dedicated Support",
          description: "24/7 ongoing maintenance and technical assistance."
        }
      ]
    },
    finalCta: {
      title: `Ready to implement ${feature.title}?`,
      subtitle: `Let's discuss how our solutions can transform your ${industry.name} operations.`,
      buttonText: "Schedule a Consultation",
      buttonLink: "/contact",
      image: images.cta
    }
  };
};

export default async function IndustrySubServicePage({ params }) {
  const { slug, subslug } = await params;

  const industry = industriesData.find((i) => i.slug === slug);
  const feature = industry?.features?.find((f) => f.slug === subslug);

  if (!industry || !feature) {
    notFound();
  }

  // Get specific mapped images, or fallback to generic high-quality defaults
  const images = getSubServiceImages(slug, subslug);

  // Dynamically generate the page data structure expected by our reusable components
  const pageData = generateSubServiceData(industry, feature, images);

  return (
    <main className="flex flex-col min-h-screen">
      <Hero data={pageData.hero} />
      <OverviewBenefits data={pageData.overview} />
      
      {/* We reuse the OurProcess component but feed it our dynamic process data */}
      <OurProcess data={pageData.process.steps} />
      
      {/* Reusing the WhyChooseUs component */}
      <WhyChooseUs data={pageData.whyChooseUs.reasons.map(r => `${r.title}: ${r.description}`)} />
      
      <FinalCTA data={pageData.finalCta} />
    </main>
  );
}
