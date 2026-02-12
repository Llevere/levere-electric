import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://levere-electric.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Levere Electric | Licensed Electrician in London, ON",
    template: "%s | Levere Electric",
  },
  description:
    "ESA-licensed residential electrician serving London, St. Thomas, Dorchester & Komoka. EV charger installs, panel upgrades, lighting & repairs. ECRA/ESA #7017944.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Levere Electric",
    title: "Levere Electric | Licensed Electrician in London, ON",
    description:
      "ESA-licensed residential electrician serving London, St. Thomas, Dorchester & Komoka. EV charger installs, panel upgrades, lighting & repairs.",
  },
  twitter: {
    card: "summary",
    title: "Levere Electric | Licensed Electrician in London, ON",
    description:
      "ESA-licensed residential electrician serving London, St. Thomas, Dorchester & Komoka.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Levere Electric",
  url: SITE_URL,
  telephone: "+1-226-559-7897",
  email: "LevereElectric@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "London", addressRegion: "ON" },
    { "@type": "City", name: "St. Thomas", addressRegion: "ON" },
    { "@type": "City", name: "Dorchester", addressRegion: "ON" },
    { "@type": "City", name: "Komoka", addressRegion: "ON" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "ECRA/ESA License",
    recognizedBy: {
      "@type": "Organization",
      name: "Electrical Safety Authority",
    },
    identifier: "7017944",
  },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-brand-navy text-brand-cream`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSONLD),
          }}
        />
        <div className="min-h-dvh flex flex-col">
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
