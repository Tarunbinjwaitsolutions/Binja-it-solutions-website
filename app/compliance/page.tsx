import type { Metadata } from "next";
import ComplianceHero from "@/components/sections/Compliance/ComplianceHero";
import { ComplianceGrid } from "@/components/sections/Compliance/ComplianceGrid";
import { TaxDetail, LegalAccountingDetail } from "@/components/sections/Compliance/TaxDetail&LegalAccountingDetail";
import LicensesDetail from "@/components/sections/Compliance/LicensesDetail";
import { AccountingDetail } from "@/components/sections/Compliance/AccountingDetail";

export const metadata: Metadata = {
  title: "Compliance Services",
  description:
    "Stay compliant with our expert services, including tax, legal, and accounting solutions.",
};

export default function CompliancePage() {
  return (
    <>
      <ComplianceHero />
      <ComplianceGrid />
      <TaxDetail />
      <LicensesDetail />
      <LegalAccountingDetail />
      <AccountingDetail />
    </>
  );
}
