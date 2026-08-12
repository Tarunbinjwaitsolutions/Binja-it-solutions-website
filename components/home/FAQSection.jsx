"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";

const faqData = [
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

const FAQCard = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      variants={fadeInUp}
      layout
      animate={{ scale: isOpen ? 1.01 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-300 bg-white ${isOpen ? "shadow-md border-orange-500" : "shadow-sm border-gray-200 hover:border-orange-500/50 hover:shadow-md"
        }`}
    >
      <button className="flex w-full items-center justify-between p-6 text-left focus:outline-none group" onClick={onClick}>
        <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 `}>
          {question}
        </h3>
        <div className={`shrink-0 ml-4 transition-transform duration-300 group-hover:text-orange-500 ${isOpen ? "text-orange-500 rotate-180" : "text-gray-400 rotate-0"}`}>
          <ChevronDown size={24} strokeWidth={2.5} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className="px-6 pb-6 text-base leading-relaxed border-t pt-4 text-gray-                    500 border-gray-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 px-6 lg:px-20 transition-colors duration-300 bg-gray-50">
      <div className="mx-auto max-w-4xl">
        {/* Centered Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1.5 mx-auto bg-orange-500 rounded-full" />
        </motion.div>

        {/* FAQ Items Stack */}
        <motion.div
          variants={staggerContainer}
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
    </section>
  );
};

export default FAQSection;
