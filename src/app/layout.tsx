import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/layout/Footer";
import JsonLd from "./components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import {
  AREAS_TEXT,
  AREA_SERVED,
  BUSINESS,
  BUSINESS_ID,
  LICENCE_LABEL,
  OG_IMAGE,
  SITE_URL,
  pageMetadata,
} from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const DEFAULT_TITLE = `Licensed Electrician in London, Ontario | ${BUSINESS.name}`;
const DEFAULT_DESCRIPTION = `Licensed electrician serving ${AREAS_TEXT}. EV chargers, panel upgrades, smart lighting and repairs. ${LICENCE_LABEL}.`;

// Site-wide defaults. The canonical is set per page (the home page sets "/"),
// never here, or every page without one would point at the home page.
const defaults = pageMetadata(DEFAULT_TITLE, DEFAULT_DESCRIPTION, "/", {
  absoluteTitle: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: "R1iKLziAYLQAvQLHLOYQj51E3QsIsuuKnVex6-BNjUc" },
  title: { default: DEFAULT_TITLE, template: `%s | ${BUSINESS.name}` },
  description: DEFAULT_DESCRIPTION,
  openGraph: defaults.openGraph,
  twitter: defaults.twitter,
};

// The one business entity; page-level JSON-LD references it by @id.
const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": BUSINESS_ID,
      name: BUSINESS.name,
      url: SITE_URL,
      logo: `${SITE_URL}/FullLogo.png`,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.email,
      foundingDate: BUSINESS.foundingDate,
      founder: { "@type": "Person", name: BUSINESS.owner },
      // Service-area business: no public street address yet.
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      areaServed: AREA_SERVED,
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "ECRA/ESA Licensed Electrical Contractor",
          recognizedBy: {
            "@type": "Organization",
            name: "Electrical Safety Authority",
          },
          identifier: BUSINESS.licence,
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Lutron RadioRA 3 Certification",
          recognizedBy: { "@type": "Organization", name: "Lutron Electronics" },
        },
      ],
      knowsAbout: [
        "EV charger installation",
        "Tesla Wall Connector installation",
        "EV energy management systems and load calculations",
        "Electrical panel and service upgrades",
        "Lutron RadioRA 3 smart lighting",
        "Home networking and UniFi installation",
        "Residential electrical troubleshooting and repairs",
        "Lighting installation",
        "Pool and hot tub electrical",
      ],
      openingHours: BUSINESS.openingHours,
      sameAs: [
        BUSINESS.googleUrl,
        BUSINESS.facebookUrl,
        BUSINESS.instagramUrl,
        BUSINESS.bbbUrl,
      ],
      priceRange: "$$",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS.name,
      inLanguage: "en-CA",
      publisher: { "@id": BUSINESS_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body
        className={`${geistSans.variable} antialiased min-h-dvh bg-brand-navy text-brand-cream`}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <JsonLd data={SITE_JSONLD} />
        <div className="min-h-dvh flex flex-col">
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
