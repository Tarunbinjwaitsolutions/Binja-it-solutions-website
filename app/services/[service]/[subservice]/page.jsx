import React from "react";
import { notFound } from "next/navigation";
import { contentRegistry } from "../../../../lib/registry";
import Hero from "../../../../components/services/sub-service/Hero";
import OverviewBenefits from "../../../../components/services/sub-service/OverviewBenefits";
import ProblemsWeSolve from "../../../../components/services/sub-service/ProblemsWeSolve";
import WhatsIncluded from "../../../../components/services/sub-service/WhatsIncluded";
import OurProcess from "../../../../components/services/sub-service/OurProcess";
import WhyChooseUs from "../../../../components/services/sub-service/WhyChooseUs";
import RelatedServices from "../../../../components/services/sub-service/RelatedServices";
import FAQSection from "../../../../components/services/sub-service/FAQSection";
import FinalCTA from "../../../../components/services/sub-service/FinalCTA";

// Static path generation for SEO
export async function generateStaticParams() {
  const paths = [];
  
  for (const [serviceSlug, subServicesMap] of Object.entries(contentRegistry)) {
    for (const subserviceSlug of Object.keys(subServicesMap)) {
      paths.push({ service: serviceSlug, subservice: subserviceSlug });
    }
  }

  return paths;
}

// Dynamic Metadata generation
export async function generateMetadata({ params }) {
  const { service, subservice } = await params;
  
  const pageData = contentRegistry[service]?.[subservice];

  if (pageData) {
    return {
      title: `${pageData.hero.title} | Binjwa IT Solutions`,
      description: pageData.hero.tagline,
    };
  }

  return {
    title: "Service Not Found",
  };
}

export default async function SubServicePage({ params }) {
  const { service, subservice } = await params;

  const lowerService = service.toLowerCase();
  const lowerSubservice = subservice.toLowerCase();

  // Retrieve content based on route params.
  const pageData = contentRegistry[lowerService]?.[lowerSubservice];
  
  console.log("SubServicePage Params:", { service, subservice, found: !!pageData });

  // If no content matches the route, return a 404
  if (!pageData) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Hero data={pageData.hero} />
      <OverviewBenefits data={pageData.overview} />
      <ProblemsWeSolve data={pageData.problemsWeSolve} />
      <WhatsIncluded data={pageData.whatsIncluded} />
      <OurProcess data={pageData.process} />
      <WhyChooseUs data={pageData.whyChooseUs} />
      <RelatedServices data={pageData.relatedServices} />
      <FAQSection data={pageData.faqs} />
      <FinalCTA data={pageData.finalCta} />
    </main>
  );
}
