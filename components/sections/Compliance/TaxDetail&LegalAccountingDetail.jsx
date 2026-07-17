import { CheckCircle, Briefcase, FileText } from "lucide-react";
const taax = "/assets/images/taax.jpg";
const Ironclad = "/assets/images/legal.jpg";

export function TaxDetail() {
  const taxServices = [
    {
      title: "GST Registration & Filing",
      desc: "Monthly/Quarterly filing for flawless input tax credits.",
    },
    {
      title: "Income Tax (ITR) Filing",
      desc: "Accurate corporate & personal tax filing to avoid notices.",
    },
    {
      title: "TDS Return Filing",
      desc: "Timely quarterly processing to prevent late fee penalties.",
    },
    {
      title: "Professional Tax & IEC",
      desc: "State tax compliance and mandatory import-export codes.",
    },
    {
      title: "ESI & PF Registration",
      desc: "Employee benefit setups to keep your workforce compliant.",
    },
    {
      title: "Annual Company Compliance",
      desc: "End-to-end ROC filings for Companies and LLPs.",
    },
    {
      title: "DIN & DSC Services",
      desc: "Secure digital signatures and Director Identification Numbers.",
    },
    {
      title: "Startup India Registration",
      desc: "Unlock 3-year tax holidays and government schemes.",
    },
  ];

  return (
    <section
      id="tax-compliance"
      className="py-12 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Seamless <span className="text-amber-600">Tax Management.</span>
          </h2>
          <p className="text-lg mb-8 italic" style={{ color: "var(--text-muted)" }}>
            We solve the stress of deadlines. From monthly GST filings to
            complex ITR and TDS returns, we handle the paperwork while you
            handle the profit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {taxServices.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border flex items-start gap-2.5" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <CheckCircle
                  className="text-amber-600 shrink-0 mt-0.5"
                  size={16}
                />
                <div>
                  <h4 className="font-bold text-xs md:text-sm leading-tight mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] leading-tight" style={{ color: "var(--text-muted)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 lg:sticky lg:top-24">
          <img
            src={taax}
            className="rounded-[2.5rem] shadow-2xl border-4" style={{ borderColor: "var(--border)" }}
            alt="Tax Services"
          />
        </div>
      </div>
    </section>
  );
}

// 3.2 Legal & Accounting Section
export function LegalAccountingDetail() {
  return (
    <section id="legal-doc" className="py-12 px-8 lg:px-16  scroll-mt-20" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center lg:items-start gap-16">
        <div className="lg:w-1/2 lg:sticky lg:top-24">
          <img
            src={Ironclad}
            className="rounded-[2.5rem] shadow-2xl border-4" style={{ borderColor: "var(--border)" }}
            alt="Legal Consultation"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Ironclad <span className="text-amber-600">Documentation.</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            We solve the risk of legal exposure. Our team drafts robust
            agreements, deeds, and corporate frameworks that protect your
            interests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl shadow-sm border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
              <FileText className="text-amber-600 mb-3" size={20} />
              <h4 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                Corporate Architecture
              </h4>
              <ul className="text-xs space-y-2 list-none pl-0" style={{ color: "var(--text-muted)" }}>
                <li>
                  <strong style={{ color: "var(--text-primary)" }}>
                    Business Agreements:
                  </strong>{" "}
                  Custom contracts tailored to your industry.
                </li>
                <li>
                  <strong style={{ color: "var(--text-primary)" }}>MOA & AOA Drafting:</strong>{" "}
                  Constitutional blueprints for incorporation.
                </li>
                <li>
                  <strong style={{ color: "var(--text-primary)" }}>Partnership Deeds:</strong>{" "}
                  Clear terms to safeguard partner equity.
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl shadow-sm border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
              <Briefcase className="text-amber-600 mb-3" size={20} />
              <h4 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                Operational & Notices
              </h4>
              <ul className="text-xs space-y-2 list-none pl-0" style={{ color: "var(--text-muted)" }}>
                <li>
                  <strong style={{ color: "var(--text-primary)" }}>Rent Agreements:</strong>{" "}
                  Legally verified commercial property leases.
                </li>
                <li>
                  <strong style={{ color: "var(--text-primary)" }}>Affidavit & Notary:</strong>{" "}
                  Attestation services for corporate declarations.
                </li>
                <li>
                  <strong style={{ color: "var(--text-primary)" }}>
                    Legal Notices & NOCs:
                  </strong>{" "}
                  Prompt dispute dispatch and clear permissions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
