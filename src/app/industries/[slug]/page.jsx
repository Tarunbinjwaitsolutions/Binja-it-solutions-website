import React from 'react';
import { notFound } from 'next/navigation';
import { industriesData } from '../../../data/industries';
import IndustryHeroParallax from '../../../components/industries/IndustryHeroParallax';
import IndustryClientContent from '../../../components/industries/IndustryClientContent';

export async function generateStaticParams() {
  return industriesData.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  
  if (!industry) {
    return {
      title: 'Industry Not Found | Binjwa IT Solutions',
    };
  }

  return {
    title: `${industry.name} IT Solutions | Binjwa IT Solutions`,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }


  return (
    <main className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* 1. Full-width Hero Banner with Parallax */}
      <IndustryHeroParallax industry={industry} />

      <IndustryClientContent industry={industry} />
    </main>
  );
}
