import type { Metadata } from "next";
import FullStackHero from "@/components/sections/FullStackDevelopment/FullStackHero";
import TechnicalGrid from "@/components/sections/FullStackDevelopment/TechnicalGrid";
import WebDevDetail from "@/components/sections/FullStackDevelopment/WebDevDetail";
import MobileDevDetail from "@/components/sections/FullStackDevelopment/MobileDevDetail";
import CRMDevDetail from "@/components/sections/FullStackDevelopment/CRMDevDetail";
import CloudDevDetail from "@/components/sections/FullStackDevelopment/CloudDevDetail";

export const metadata: Metadata = {
  title: "Custom Full-Stack Web & Mobile Development Services",
  description:
    "Expert full-stack development services, including web, mobile, CRM, and cloud solutions.",
};

export default function FullStackDevelopmentPage() {
  return (
    <>
      <FullStackHero />
      <TechnicalGrid />
      <WebDevDetail />
      <MobileDevDetail />
      <CRMDevDetail />
      <CloudDevDetail />
    </>
  );
}
