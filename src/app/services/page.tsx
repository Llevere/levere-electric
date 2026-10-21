import type { Metadata } from "next";
import Link from "next/link";
import { getImagesByFileName } from "@/lib/homeImages";
import {
  AREAS_TEXT,
  BUSINESS_ID,
  LICENCE_LABEL,
  SITE_URL,
  pageMetadata,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaPanel from "@/components/CtaPanel";
import { SERVICES } from "./servicesData";
import ServiceCard from "./ServiceCard";

export const metadata: Metadata = pageMetadata(
  "Residential Electrical Services, London ON",
  `Residential electrician in London, ON: EV chargers, panel upgrades, Lutron smart lighting, home networking, lighting and repairs. ${LICENCE_LABEL}.`,
  "/services",
);

export default async function Services() {
  const [home, services] = await Promise.all([
    getImagesByFileName("home/"),
    getImagesByFileName("services/"),
  ]);
  const images = new Map([...home, ...services]);

  const cards = SERVICES.map((item) => ({
    item,
    src: item.src ?? (item.key ? images.get(item.key) : undefined),
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Residential electrical services in London, Ontario",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              url: `${SITE_URL}${s.href === "/book" ? "/services" : s.href}`,
              provider: { "@id": BUSINESS_ID },
            },
          })),
        }}
      />
      <section className="mx-auto w-full max-w-6xl px-6 pt-8 pb-12">
        <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
        <div className="mt-6 mb-12">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Residential Electrical Services in London, Ontario
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm font-medium text-white/75 sm:text-base">
            Levere Electric is an owner-operated, ESA-licensed electrical
            contractor ({LICENCE_LABEL}) serving homeowners in{" "}
            {AREAS_TEXT}. From an EV charger to a smarter
            home, start with the service that fits your project. Clean installs,
            proper permits and clear pricing on every job.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-white/70">
            Not sure which one you need?{" "}
            <Link href="/book" className="link-gold">
              Send a photo and a short note
            </Link>{" "}
            or browse the{" "}
            <Link href="/photo-gallery" className="link-gold">
              project photo gallery
            </Link>
            .
          </p>
        </div>

        <div className="grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ item, src }, i) => (
            <ServiceCard key={item.title} item={item} src={src} priority={i < 2} />
          ))}
        </div>
      </section>
      <CtaPanel />
    </>
  );
}
