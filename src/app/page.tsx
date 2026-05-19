import type { Metadata } from "next";
import Hero from "./components/HeroSection/Hero";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import OurServicesSection from "./components/Services/OurServices";
import WhyChooseUsSection from "./components/WhyChooseUs/WhyChooseUsSectionClient";
import { getImagesByFileName } from "./lib/homeImages";

export const metadata: Metadata = {
  description:
    "ESA-licensed residential electrician serving London, St. Thomas, Dorchester & Komoka. EV charger installs, panel upgrades, lighting & repairs. ECRA/ESA #7017944.",
};

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Levere Electric",
  url: "https://levere-electric.ca",
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

export default async function Home() {
  //Key: image name 'ev-car.jpg'
  //Value: image blob url
  const homeImagesByName: Map<string, string> =
    await getImagesByFileName("home/");
  const panel = homeImagesByName.get("panel.jpg") ?? "";

  return (
    <div className=" bg-[radial-gradient(ellipse_at_top,rgba(226,192,81,0.08),transparent_55%)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSONLD) }}
      />
      <Hero images={homeImagesByName} />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent" />

      <OurServicesSection />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent " />
      <WhyChooseUsSection imageSrc={panel} />

      <ReviewsSection />
    </div>
  );
}
