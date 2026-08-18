import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { servicesData } from "../../../data/services";
import * as motion from "framer-motion/client";
import * as Icons from "lucide-react";

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

  // Framer Motion Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <main className="min-h-screen theme-bg pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm theme-text-muted mb-8 font-medium"
        >
          <Link href="/" className="hover:theme-accent transition-colors">Home</Link>
          <span>›</span>
          <Link href="/services" className="hover:theme-accent transition-colors">Services</Link>
          <span>›</span>
          <span className="theme-text">{category.name}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold theme-text mb-6"
        >
          {category.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl theme-text-secondary mb-16 max-w-3xl"
        >
          {category.description}
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {category.subServices.map((subService) => (
            <motion.div variants={item} key={subService.slug} className="h-full">
              <Link
                href={`/services/${category.slug}/${subService.slug}`}
                className="block group h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-2xl"
              >
                <div className="theme-bg-card border theme-border rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#1e1b4b] group-hover:to-purple-900 group-hover:border-transparent group-hover:shadow-[0_15px_40px_rgba(30,27,75,0.4)] group-hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden">

                  <div className="flex-1 relative z-10">
                    {subService.image ? (
                      <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-inner">
                        <Image
                          src={subService.image}
                          alt={subService.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                      </div>
                    ) : subService.icon ? (
                      <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800/50 shadow-inner group-hover:bg-white/10 transition-colors duration-300 flex items-center justify-center">
                        {React.createElement(Icons[subService.icon] || Icons.CheckCircle, { className: "w-16 h-16 text-[var(--accent)] group-hover:text-white transition-colors duration-300" })}
                      </div>
                    ) : null}

                    <h3 className="text-xl font-bold theme-text mb-2 group-hover:text-white transition-colors duration-300">
                      {subService.name}
                    </h3>

                    {subService.description && (
                      <p className="text-sm theme-text-secondary group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
                        {subService.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end text-[var(--accent)] group-hover:text-white relative z-10">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/5 group-hover:bg-white/20 transition-all duration-300 shadow-sm border border-transparent group-hover:border-white/30">
                      <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}

