import OurServiceCard from "./OurServicesCard";
import type { ServiceCardType } from "./types/ServiceCard";
import { Car, Lightbulb, Zap } from "lucide-react";

const SERVICES: ServiceCardType[] = [
  {
    title: "EV Charger Installation",
    description:
      "Professional Level 2 charger installation with panel assessment, load calculation, and ESA-compliant setup.",
    href: "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207543/new",
    Icon: Car,
  },
  {
    title: "Electrical Services",
    description:
      "Lighting, receptacles, troubleshooting, renovations, aluminum wiring pigtails, and general residential electrical work.",
    href: "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207525/new",
    Icon: Lightbulb,
  },
  {
    title: "Panel & Service Upgrades",
    description:
      "100A–200A upgrades, meter base repairs, grounding, bonding, and full electrical service upgrades.",
    href: "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207551/new",
    Icon: Zap,
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

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <OurServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
