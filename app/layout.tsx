import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Agentic AI & Automation Solutions | Binjwa IT Solutions",
    template: "%s | Binjwa IT Solutions",
  },
  description:
    "Custom Agentic AI solutions. We build AI assistants, CRM, WhatsApp & workflow automation for startups and SMEs. Get a free consultation today.",
  verification: {
    google: "vHBd8TQ4WsU3dp9m3VCiN5gySpIRFR3tWzDV7cCcJ98",
  },
  openGraph: {
    title: "Binjwa IT Solutions - Agentic AI Solutions & Web Development",
    description:
      "Discover innovative AI automation and web development solutions tailored for your business needs. Let us help you grow.",
    images: ["https://binjwaitsolutions.com/assets/focus-CfFVm_O6.png"],
    url: "https://binjwaitsolutions.com/ai-solutions",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "Binjwa IT Solutions",
  "url": "https://binjwaitsolutions.com/",
  "logo": "https://binjwaitsolutions.com/logo.png",
  "description": "Grow your business with AI automation, web development, CRM systems, SEO, digital marketing, and secure digital solutions built for global brands.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9826656189",
    "contactType": "customer service",
    "contactOption": "HearingImpairedSupported",
    "areaServed": "IN",
    "availableLanguage": ["en", "Hindi"]
  },
  "sameAs": [
    "https://www.instagram.com/binjwaitsolutions/",
    "https://www.linkedin.com/company/binjwa-it-solutions-pvt-ltd/posts/?feedView=all",
    "https://x.com/BinjwaITSolutio?t=RiZkuNAkfF1y2zY6hdegtQ&s=08",
    "https://www.youtube.com/@BinjwaITCompleteSolutions",
    "https://www.facebook.com/people/Binjwaitsolutions/61577198437265/?rdid=pV4ce5snhhLqxgMb&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16cSpGxWmS%2F"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZMJDDGQP4V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZMJDDGQP4V');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
