"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  { question: "1. How long does a typical project last?", answer: "It depends on the specifics of the project but usually, a standard website development of a business takes 4-6 weeks; whereas developing custom applications, CRMs or AI automation solutions takes 8-12 weeks. We prepare a detailed timeline for every project we start working on." },
  { question: "2. What industries do you work in?", answer: "We develop solutions for various industries like retail, healthcare, education, professional services, manufacturing, real estate, and e-commerce. All the solutions are tailor-made according to industry requirements." },
  { question: "3. Do you provide support services once the project is finished?", answer: "Yes, we offer all kinds of support like maintenance, updating, performance monitoring, technical support, and adding features to keep the solution performing well in the future." },
  { question: "4. Can you help me with AI automation?", answer: "Of course, we create solutions which use artificial intelligence including chatbots, workflow automation, CRM automation, AI agents, lead management systems, and business process automation." },
  { question: "5. What is your pricing policy?", answer: "Our pricing is completely transparent and is based on your project requirements. Depending on the nature of the project, we can offer either fixed price package, milestone-based pricing or custom engagement with no additional fees." },
  { question: "6. Why Binjwa IT Solutions compared to other companies?", answer: "We combine technology, AI automation, business strategies and support in one place. It means that we can provide you with customized, scalable, and result-driven solutions with transparent communication and cooperation." },
  { question: "7. Why does my business need website/digital solution?", answer: "Professional web presence will help you to build your brand, attract clients, make processes more efficient, and earn more money. Digital solutions help you to stay ahead in this digital world." },
  { question: "8. Is it important for my growing business?", answer: "Absolutely, as your business grows it will be useful to use digital tools like websites, CRMs, AI automation solutions, marketing solutions to grow effectively." },
  { question: "9. Can you redesign my current website?", answer: "Certainly, we can update your website in terms of its design, performance, usability, mobile responsiveness, SEO and whatever else you might need." },
  { question: "10. How do we start our collaboration?", answer: "To start collaborating, you only need to contact us via website, by phone or email, then we'll arrange a free consultation for you where we will discuss your requirements, propose the best solution, and develop a project proposal for you." },
];

interface FAQCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQCard: React.FC<FAQCardProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      variants={fadeInUp as any}
      layout
      animate={{ scale: isOpen ? 1.02 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`mb-4 overflow-hidden rounded-xl border transition-all duration-300 ${isOpen ? "shadow-[0_8px_30px_rgba(249,115,22,0.12)] border-orange-500/30" : "shadow-sm border-transparent hover:border-orange-500/20 hover:shadow-md"}`}
      style={{ backgroundColor: "var(--faq-card-bg)", borderColor: isOpen ? "" : "var(--faq-border)" }}
    >
      <button className="flex w-full items-center justify-between p-6 text-left focus:outline-none group" onClick={onClick}>
        <h3 className={`text-lg font-medium transition-colors duration-300 group-hover:text-orange-500 ${isOpen ? "text-orange-500" : ""}`} style={!isOpen ? { color: "var(--text-muted)" } : {}}>
          {question}
        </h3>
        <div className={`shrink-0 ml-4 transition-transform duration-300 group-hover:text-orange-500 ${isOpen ? "text-orange-500 rotate-90" : ""}`} style={!isOpen ? { color: "var(--text-subtle)" } : {}}>
          {isOpen ? <X size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className="px-6 pb-6 text-sm leading-relaxed border-t pt-4" style={{ color: "var(--text-muted)", borderColor: "var(--faq-border)" }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SideBySideFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 px-8 lg:px-16 transition-colors duration-300" style={{ backgroundColor: "var(--section-alt-bg)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeInUp as any}
            className="lg:sticky lg:top-32"
          >
            <h2 className="text-6xl md:text-8xl font-sans font-medium leading-tight tracking-tighter" style={{ color: "var(--text-primary)" }}>
              FAQ Section
            </h2>
            <div className="w-24 h-2 mt-8 bg-orange-500 rounded-full" />
          </motion.div>
          
          <motion.div 
            variants={staggerContainer as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col"
          >
            {faqData.map((faq, index) => (
              <FAQCard
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SideBySideFAQ;
