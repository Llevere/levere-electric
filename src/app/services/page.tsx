import { getImagesByFileName } from "@/lib/homeImages";
import { SERVICES } from "./servicesData";
import ServiceCard from "./ServiceCard";

export default async function Services() {
  const images = await getImagesByFileName("services/");

  return (
    <section className="relative overflow-hidden px-6 py-12 items-center flex h-full">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-0 right-0 h-130 bg-[radial-gradient(ellipse_at_top,rgba(226,192,81,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_45%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-white">
          Our Services
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/70">
          Residential electrical work across London, St. Thomas, Dorchester &
          Komoka — clean installs, clear pricing.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
