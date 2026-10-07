import type { Metadata } from "next";
import Link from "next/link";
import { getImagesByFileName } from "@/lib/homeImages";
import { SITE_URL } from "@/lib/site";
import { SERVICES } from "./servicesData";
import ServiceCard from "./ServiceCard";

export const metadata: Metadata = {
  title: "Residential Electrical Services in London, Ontario",
  description:
    "Residential electrician in London, ON: lighting installation, panel upgrades, troubleshooting and home electrical repairs. ESA permits handled, clear pricing. ECRA/ESA #7017944.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Residential Electrical Services in London, Ontario | Levere Electric",
    description:
      "Lighting installation, panel upgrades, troubleshooting and home electrical repairs across London, St. Thomas, Dorchester, Komoka & Delaware.",
    url: "/services",
  },
};

const SERVICES_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title.replace("\n", " "),
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: {
        "@type": "City",
        name: "London, Ontario",
      },
    },
  })),
};

export default async function Services() {
  const images = await getImagesByFileName("services/");

  return (
    <section className="flex flex-1 items-center justify-center px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSONLD) }}
      />
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Residential Electrical Services in London, Ontario
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-white/75 font-medium sm:text-base">
            Levere Electric is an owner-operated, ESA-licensed electrical
            contractor (ECRA/ESA #7017944) serving homeowners in London, St.
            Thomas, Dorchester, Komoka and Delaware. Clean installs, proper
            permits and clear pricing on every job.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-white/70">
            Looking for something specific? See{" "}
            <Link
              href="/ev-charger-installation"
              className="text-brand-gold hover:text-brand-gold-3 underline underline-offset-4"
            >
              EV charger installation
            </Link>{" "}
            or{" "}
            <Link
              href="/panel-service-upgrades"
              className="text-brand-gold hover:text-brand-gold-3 underline underline-offset-4"
            >
              panel and service upgrades
            </Link>
            , or browse the{" "}
            <Link
              href="/photo-gallery"
              className="text-brand-gold hover:text-brand-gold-3 underline underline-offset-4"
            >
              project photo gallery
            </Link>
            .
          </p>
        </div>

        <div className="grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((item) => {
            const src = images.get(item.key);
            if (!src) return null;
            return <ServiceCard key={item.key} item={item} src={src} />;
          })}
        </div>
      </div>
    </section>
  );
}
