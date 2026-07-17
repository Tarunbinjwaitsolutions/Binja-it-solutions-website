import type { Metadata } from "next";
import ContactPage from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Binjwa IT Solutions",
  description:
    "Get in touch with Binjwa IT Solutions. We're here to answer your questions and help you with your IT needs. Contact us today!",
};

export default function Contact() {
  return <ContactPage />;
}
