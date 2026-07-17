import type { Metadata } from "next";
import LegalNotice from "@/components/sections/LegalNotice";

export const metadata: Metadata = {
  title: "Privacy Policy | Binjwa IT Solutions",
  description:
    "Read the privacy policy of Binjwa IT Solutions to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return <LegalNotice />;
}
