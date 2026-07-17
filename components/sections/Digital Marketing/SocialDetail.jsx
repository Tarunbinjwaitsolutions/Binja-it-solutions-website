"use client";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Zap, Target } from "lucide-react";
const sco = "/assets/images/sco.png";
const Engagement = "/assets/images/Engagement.png";

// 3.1 SEO Section
export function SEODetail() {
  return (
    <section
      id="seo-domain"
      className="py-12 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Be Found When It <br />
            <span className="text-orange-600">Matters Most.</span>
          </h2>
          <p className="text-lg mb-8 italic" style={{ color: "var(--text-muted)" }}>
            Generic content gets lost. We solve your visibility problems by
            aligning your site with search intent and technical excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
              <TrendingUp className="text-orange-600 mb-2" size={20} />
              <p className="text-xs font-bold uppercase mb-1">Visibility</p>
              <p className="text-sm leading-snug" style={{ color: "var(--text-muted)" }}>
                Keyword strategies that put you in front of ready-to-buy
                customers.
              </p>
            </div>
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
              <CheckCircle2 className="text-orange-600 mb-2" size={20} />
              <p className="text-xs font-bold uppercase mb-1">Performance</p>
              <p className="text-sm leading-snug" style={{ color: "var(--text-muted)" }}>
                Technical SEO audits to fix speed and indexing issues.
              </p>
            </div>
          </div>
        </div>
        <motion.div
          className="lg:w-1/2 lg:sticky lg:top-24 -mt-16"
          animate={{
            y: ["0%", "-2%", "0%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <img src={sco} className="rounded-[2.5rem] " alt="SEO Analysis" />
        </motion.div>
      </div>
    </section>
  );
}

// 3.2 Social Media Section
export function SocialDetail() {
  return (
    <section
      id="social-domain"
      className="py-12 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: "var(--bg-alt)", color: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center lg:items-start gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Engagement That <br />
            <span className="text-orange-600">Builds Loyalty.</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            Stop posting for the sake of posting. We solve the engagement gap by
            creating content that resonates with your specific audience.
          </p>
          <div className="space-y-4">
            {[
              "Strategic social media management across Meta & LinkedIn.",
              "Data-driven brand awareness campaigns.",
              "Consistent engagement & audience growth strategies.",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl shadow-sm border" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)" }}
              >
                <Target className="text-orange-500" size={18} />
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 lg:sticky lg:top-24">
          <div className="max-w-[420px] mr-auto -mt-12 overflow-hidden">
            <img
              src={Engagement}
              className="w-full h-auto object-cover"
              alt="Social App Mockup"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
