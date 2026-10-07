import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { BUSINESS, SITE_URL } from "./lib/site";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const DEFAULT_TITLE = "Licensed Electrician in London, Ontario | Levere Electric";
const DEFAULT_DESCRIPTION =
  "ESA-licensed, owner-operated residential electrician serving London, St. Thomas, Dorchester, Komoka & Delaware. EV charger installs, panel upgrades, lighting & repairs. ECRA/ESA #7017944.";

export const metadata: Metadata = {
  verification: {
    google: "R1iKLziAYLQAvQLHLOYQj51E3QsIsuuKnVex6-BNjUc",
  },
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Levere Electric",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Levere Electric",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Levere Electric, licensed electrician in London, Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// One business entity for the whole site. Page-level blocks reference it via
// { "@id": `${SITE_URL}/#business` } instead of declaring a second Electrician.
export const BUSINESS_ID = `${SITE_URL}/#business`;

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["Electrician", "LocalBusiness"],
  "@id": BUSINESS_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  logo: `${SITE_URL}/FullLogo.png`,
  image: `${SITE_URL}/og.png`,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  foundingDate: BUSINESS.foundingDate,
  founder: { "@type": "Person", name: BUSINESS.owner },
  // Service-area business: no street address is published until Brandon
  // confirms which address (if any) should be public.
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: BUSINESS.serviceAreas.map((name) => ({
    "@type": "City",
    name: `${name}, Ontario`,
  })),
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "ECRA/ESA Licensed Electrical Contractor",
    recognizedBy: {
      "@type": "Organization",
      name: "Electrical Safety Authority",
    },
    identifier: BUSINESS.licence,
  },
  knowsAbout: [
    "EV charger installation",
    "Tesla Wall Connector installation",
    "Electrical panel and service upgrades",
    "Residential electrical troubleshooting and repairs",
    "Lighting installation",
  ],
  openingHours: BUSINESS.openingHours,
  sameAs: [
    BUSINESS.googleUrl,
    BUSINESS.facebookUrl,
    BUSINESS.instagramUrl,
    BUSINESS.bbbUrl,
  ],
  priceRange: "$$",
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
