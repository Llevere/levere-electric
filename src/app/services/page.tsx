import type { Metadata } from "next";
import { getImagesByFileName } from "@/lib/homeImages";
import { SERVICES } from "./servicesData";
import ServiceCard from "./ServiceCard";

export const metadata: Metadata = {
  title: "Electrical Services",
  description:
    "Residential electrical services in London, ON — lighting installation, panel upgrades, and home electrical repairs. Clean installs, clear pricing. ECRA/ESA #7017944.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Electrical Services | Levere Electric",
    description:
      "Residential electrical services in London, ON — lighting installation, panel upgrades, and home electrical repairs.",
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
      provider: {
        "@type": "Electrician",
        name: "Levere Electric",
      },
      areaServed: {
        "@type": "City",
        name: "London",
        addressRegion: "ON",
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
          <h2 className="text-center text-3xl font-semibold tracking-tight text-white">
            Our Services
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-white/70 font-medium">
            Residential electrical work across London, St. Thomas, Dorchester &
            Komoka — clean installs, clear pricing.
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
