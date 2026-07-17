import type { Metadata } from "next";
import AllBlogsPageClient from "@/components/sections/Blog/AllBlogsPageClient";

export const metadata: Metadata = {
  title: "Our Blog | Binjwa IT Solutions",
  description:
    "Explore the latest insights, updates, and strategies from our experts at Binjwa IT Solutions. Stay informed on industry trends and best practices.",
};

export default function BlogsPage() {
  return <AllBlogsPageClient />;
}
