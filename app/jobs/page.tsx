import type { Metadata } from "next";
import JobPageClient from "@/components/sections/JobPage";

export const metadata: Metadata = {
  title: "Job Openings | Binjwa IT Solutions",
  description:
    "Find your next career opportunity at Binjwa IT Solutions. Browse our open positions and apply today.",
};

export default function JobsPage() {
  return <JobPageClient />;
}
