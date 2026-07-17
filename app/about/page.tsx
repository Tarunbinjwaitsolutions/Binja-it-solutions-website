import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import MissionValues from "@/components/sections/about/MissionValues";
import FoundersMessage from "@/components/sections/about/FoundersMessage";

export const metadata: Metadata = {
  title: "About Binjwa IT Solutions",
  description:
    "Learn more about Binjwa IT Solutions, our mission, values, and the team behind our success.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionValues />
      <FoundersMessage />
    </>
  );
}
