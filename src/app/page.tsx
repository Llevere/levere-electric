import type { Metadata } from "next";
import Hero from "./components/HeroSection/Hero";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import OurServicesSection from "./components/Services/OurServices";
import WhyChooseUsSection from "./components/WhyChooseUs/WhyChooseUsSectionClient";
import HomeGuides from "./components/HomeGuides";
import FAQSection from "./components/FAQ/FAQSection";
import CtaPanel from "./components/CtaPanel";
import { getImagesByFileName } from "./lib/homeImages";
import {
  ALL_AREAS_TEXT,
  BUSINESS,
  LICENCE_LABEL,
  type FAQ,
} from "./lib/site";

// Title and description come from the layout defaults.
export const metadata: Metadata = { alternates: { canonical: "/" } };

// Keep these consistent with the service pages; they are also FAQPage data.
const HOME_FAQS: readonly FAQ[] = [
  {
    q: "Which areas does Levere Electric serve?",
    a: `Levere Electric is based in London, Ontario and serves ${ALL_AREAS_TEXT} and surrounding communities. Send your location with your request so we can confirm availability.`,
  },
  {
    q: "What electrical services can I request?",
    a: "Residential work including Level 2 EV charger installation, panel and service upgrades, Lutron RadioRA 3 smart lighting, lighting and renovation wiring, troubleshooting and repairs, and pool and hot-tub circuits. We also take home networking and UniFi enquiries, with scope and availability confirmed before booking.",
  },
  {
    q: "Is Levere Electric licensed and insured?",
    a: `Yes. Levere Electric is a licensed electrical contractor (${LICENCE_LABEL}), fully insured, and Lutron RadioRA 3 certified for smart-lighting work. Every job that needs an ESA permit includes it.`,
  },
  {
    q: "How do I get a quote?",
    a: `Choose Request a Quote and pick your project to open our Jobber request form, or call ${BUSINESS.phone}. Include your location, a short description and helpful photos. We confirm the scope and next steps before any work is scheduled.`,
  },
];

export default async function Home() {
  const homeImagesByName = await getImagesByFileName("home/");
  const panel = homeImagesByName.get("panel.jpg") ?? "";

  return (
    <div className=" bg-[radial-gradient(ellipse_at_top,rgba(226,192,81,0.08),transparent_55%)]">
      <Hero images={homeImagesByName} />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent" />

      <OurServicesSection />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent " />
      <WhyChooseUsSection imageSrc={panel} />

      <ReviewsSection />
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold/25 to-transparent" />
      <HomeGuides />

      <FAQSection
        id="home-faq"
        title="A few things you might be wondering"
        intro="Quick answers before you get in touch."
        items={HOME_FAQS}
      />
      <CtaPanel href="/book" />
    </div>
  );
}
