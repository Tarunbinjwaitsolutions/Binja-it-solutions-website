"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Binjwa IT Solutions completely transformed our customer service. Their AI assistant handles 80% of our inquiries, allowing our human team to focus on complex issues. It's been a game-changer.",
    name: "Sarah Jenkins",
    role: "Operations Director",
    company: "Nexus E-Commerce"
  },
  {
    quote: "The CRM automation they built for us saves our sales team over 40 hours a week. Leads are qualified instantly and assigned perfectly. Our conversion rates have never been higher.",
    name: "David Chen",
    role: "VP of Sales",
    company: "GlobalTech Solutions"
  },
  {
    quote: "We were hesitant about AI at first, but their team guided us through every step. The WhatsApp automation bot they deployed has revolutionized how we communicate with our patients.",
    name: "Dr. Emily Roberts",
    role: "Clinic Founder",
    company: "Wellness Health Center"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* CSS Carousel - no complex drag logic needed for this simple, clean design */}
        <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-center shrink-0 w-[85vw] md:w-[400px] p-8 rounded-[24px] border shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-orange-500 hover:shadow-[0_8px_30px_rgb(249,115,22,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg mb-8 italic" style={{ color: "var(--text-primary)" }}>
                  "{test.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl"
                  style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: "var(--text-primary)" }}>{test.name}</h4>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{test.role}, {test.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
