import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { servicesData } from "../../../data/services"; 

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { service: serviceSlug } = await params;
  const category = servicesData.find((s) => s.slug === serviceSlug);
  
  if (category) {
    return {
      title: `${category.name} | Binjwa IT Solutions`,
      description: category.description,
    };
  }
  return { title: "Category Not Found" };
}

export default async function CategoryPage({ params }) {
  const { service: serviceSlug } = await params;
  const lowerServiceSlug = serviceSlug.toLowerCase();
  const category = servicesData.find((s) => s.slug.toLowerCase() === lowerServiceSlug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen theme-bg pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm theme-text-muted mb-8 font-medium">
          <Link href="/" className="hover:theme-accent transition-colors">Home</Link>
          <span>›</span>
          <Link href="/services" className="hover:theme-accent transition-colors">Services</Link>
          <span>›</span>
          <span className="theme-text">{category.name}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold theme-text mb-6">
          {category.name}
        </h1>
        <p className="text-xl theme-text-secondary mb-16 max-w-3xl">
          {category.description}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.subServices.map((subService) => (
            <Link 
              key={subService.slug} 
              href={`/services/${category.slug}/${subService.slug}`}
              className="block group"
            >
              <div className="theme-bg-card border theme-border rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-[var(--accent)] group-hover:shadow-[0_8px_30px_color-mix(in_srgb,var(--accent)_15%,transparent)] flex flex-col justify-between">
                <div className="flex-1">
                  {subService.image && (
                    <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image 
                        src={subService.image} 
                        alt={subService.name} 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold theme-text mb-3 group-hover:theme-accent transition-colors">
                    {subService.name}
                  </h3>
                </div>
                <div className="mt-6 flex justify-end theme-accent">
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
