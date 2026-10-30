import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Innovative | Software Engineering House & Local SEO Growth Engine",
  description:
    "Custom software development, high-performance web applications, and automated Google Business Profile & Local SEO platform for modern businesses.",
  keywords: [
    "Innovative",
    "Software House",
    "Local SEO",
    "Google Maps 3-Pack",
    "Web Development",
    "GMB Automation",
    "SEO Audit",
    "Custom Engineering",
  ],
  authors: [{ name: "Innovative Engineering" }],
  openGraph: {
    title: "Innovative — Software Engineering House & Local SEO Growth Engine",
    description:
      "Custom software development, high-performance web applications, and automated Google Business Profile & Local SEO platform.",
    type: "website",
    url: "https://seo.itibusinesssuite.online",
    siteName: "Innovative Engineering",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovative — Software Engineering House & Local SEO Growth Engine",
    description:
      "Custom software development, high-performance web applications, and automated Google Business Profile & Local SEO platform.",
  },
};

import { AuthProvider } from "@/lib/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Innovative",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Full-stack software engineering services, high-performance web applications, and automated Google Maps SEO SaaS platform.",
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable} font-sans light`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-600 selection:text-white flex flex-col font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
