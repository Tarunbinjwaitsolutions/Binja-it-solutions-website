import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { industriesData } from '../../data/industries';

export const metadata = {
  title: 'Industries We Serve | Binjwa IT Solutions',
  description: 'Explore the industries we serve with our customized digital solutions, including healthcare, finance, e-commerce, and real estate.',
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-28">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 theme-text">
            Industries We Serve
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We deliver tailored technology solutions designed to meet the unique challenges and opportunities of your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industriesData.map((industry) => (
            <Link 
              key={industry.slug} 
              href={`/industries/${industry.slug}`}
              className="group block p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--card-shadow)'
              }}
            >
              {industry.image && (
                <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image 
                    src={industry.image} 
                    alt={industry.name} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold mb-3 theme-text group-hover:text-orange-500 transition-colors">
                {industry.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {industry.description}
              </p>
              <div className="mt-6 flex items-center text-orange-500 font-medium text-sm">
                <span>Learn more</span>
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
