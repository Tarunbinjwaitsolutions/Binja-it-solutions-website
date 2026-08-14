"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Stethoscope, ShoppingCart, GraduationCap, Calculator, Factory, Rocket, Briefcase, ArrowRight } from "lucide-react";

const industries = [
  { id: "real-estate", icon: Building2, name: "Real Estate", tasks: "Lead follow-up, property inquiries, automated documentation, scheduling viewings." },
  { id: "healthcare", icon: Stethoscope, name: "Healthcare", tasks: "Appointment booking, patient inquiries, medical report creation, automated reminders." },
  { id: "ecommerce", icon: ShoppingCart, name: "E-commerce", tasks: "Order tracking, customer service, inventory alerts, returns processing." },
  { id: "education", icon: GraduationCap, name: "Education", tasks: "Student inquiries, fee reminders, admissions process automation, parent communication." },
  { id: "finance", icon: Calculator, name: "Finance", tasks: "Data entry, compliance checking, automated report creation, client onboarding." },
  { id: "manufacturing", icon: Factory, name: "Manufacturing", tasks: "Inventory management, supplier communication, quality control reports." },
  { id: "startups", icon: Rocket, name: "Startups", tasks: "End-to-end business process automation, fast-scaling customer support." },
  { id: "professional", icon: Briefcase, name: "Professional Services", tasks: "Client onboarding, automated billing, follow-ups, intelligent appointment scheduling." }
];

export default function IndustriesWeServeSection() {
  const [active, setActive] = useState(industries[0]);

  return (
    <section className="py-24 px-8 lg:px-16" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Industries We Serve With Agentic AI
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Agentic AI serves all industries. Discover how we can automate your specific industry workflows.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Vertical Tabs */}
          <div className="lg:w-1/3 flex flex-col gap-2">
            {industries.map((industry) => {
              const Icon = industry.icon;
              const isActive = active.id === industry.id;
              return (
                <button
                  key={industry.id}
                  onClick={() => setActive(industry)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 w-full text-left border-1 ${isActive ? "shadow-md" : ""}`}
                  style={isActive ? { backgroundColor: "var(--accent)", color: "white", borderColor: "var(--accent)" } : { backgroundColor: "var(--bg-alt)", color: "var(--text-muted)", borderColor: "var(--border)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? "white" : "var(--text-muted)" }} />
                  <span className="font-semibold text-lg">{industry.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="lg:w-2/3 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full p-8 md:p-12 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(249,115,22,0.1)] transition-all duration-300 border hover:border-orange-500 flex flex-col justify-center min-h-[400px]"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-8">
                  <active.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                  {active.name} Automation
                </h3>

                <div className="space-y-4 mb-10">
                  <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Our Automated Tasks:</h4>
                  <div className="flex flex-wrap gap-3">
                    {active.tasks.split(", ").map((task, i) => (
                      <div key={i} className="px-4 py-2 rounded-full border text-sm font-medium" style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
                        {task}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <button className="flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all">
                    Consult for {active.name} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
