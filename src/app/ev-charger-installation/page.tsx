import type { Metadata } from "next";
import { getHomeImageUrl } from "@/lib/homeImages";
import HeroSection from "./HeroSection";
import PackagesSection from "./package-tiers/PackagesSection";
import FAQSection from "./FAQ/FAQSection";
import { FAQS } from "./data";

export const metadata: Metadata = {
  title: "EV Charger Installation in London, Ontario",
  description:
    "Level 2 EV charger installation in London, ON from $899 + HST. Load calculation first, ESA permit and inspection included. Tesla, Ford, Hyundai & all brands. ECRA/ESA #7017944.",
  alternates: { canonical: "/ev-charger-installation" },
  openGraph: {
    title: "EV Charger Installation in London, Ontario | Levere Electric",
    description:
      "Level 2 EV charger installation in London, ON from $899 + HST. Load calculation first, ESA permit and inspection included.",
    url: "/ev-charger-installation",
  },
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const HERO_BG = "ev-car.jpg";

export default async function EvChargerInstallationPage() {
  const heroUrl = (await getHomeImageUrl(HERO_BG)) ?? "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <HeroSection heroUrl={heroUrl} />
      <PackagesSection />
      <FAQSection />
    </>
  );
}
