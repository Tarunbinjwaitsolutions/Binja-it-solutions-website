import React from "react";
import ServicesAccordion from "../../components/services/ServicesAccordion";

export const metadata = {
  title: "All Services | Binjwa IT Solutions",
  description: "Explore our comprehensive suite of IT solutions including AI, Web Development, and Digital Marketing.",
};

export default function ServicesOverviewPage() {
  return (
    <main className="min-h-screen theme-bg pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold theme-text mb-6">
          Our Services
        </h1>
        <p className="text-xl theme-text-secondary mb-16 max-w-3xl">
          We provide end-to-end digital solutions tailored to accelerate your business growth. Choose a category below to explore our specific offerings.
        </p>

        <ServicesAccordion />
      </div>
    </main>
  );
}
