import Link from "next/link";
import OurServiceCard from "./OurServicesCard";
import type { ServiceCardType } from "./types/ServiceCard";
import { Car, Lightbulb, Wrench, Zap } from "lucide-react";
import { JOBBER, PRICE } from "@/lib/site";

const SERVICES: ServiceCardType[] = [
  {
    title: "EV Charger Installation",
    description:
      `Professional Level 2 charger installation from ${PRICE.ev}, with a load calculation, ESA permit and inspection, and load-management options.`,
    learnHref: "/ev-charger-installation",
    href: JOBBER.ev,
    Icon: Car,
  },
  {
    title: "Panel & Service Upgrades",
    description:
      "100A–200A upgrades, meter base repairs, grounding, bonding, and full electrical service upgrades. Load calculation first.",
    learnHref: "/panel-service-upgrades",
    href: JOBBER.panel,
    Icon: Zap,
  },
  {
    title: "Smart Homes & Lutron Lighting",
    description:
      "Lutron RadioRA 3 certified lighting scenes, keypads and schedules that fit the way your household lives.",
    learnHref: "/smart-home-lighting",
    href: JOBBER.general,
    Icon: Lightbulb,
  },
  {
    title: "Electrical Services",
    description:
      "Lighting, receptacles, troubleshooting, renovations, aluminum wiring pigtails, and general residential electrical work.",
    learnHref: "/services",
    href: JOBBER.general,
    Icon: Wrench,
  },
];

export default function OurServicesSection() {
  return (
    <section className="relative bg-brand-navy">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 ">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-brand-gold">
            Our Services
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-brand-gold/70" />
          <p className="mt-3 text-sm text-brand-cream/80">
            Expert residential electrical work serving London &amp; area.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((s) => (
            <OurServiceCard key={s.title} {...s} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-brand-cream/75">
          Planning better Wi-Fi alongside a renovation or smart-home project?{" "}
          <Link href="/home-networking" className="link-gold">
            Ask about home networking and UniFi
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
