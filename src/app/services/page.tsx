import { getImagesByFileName } from "@/lib/homeImages";
import { SERVICES } from "./servicesData";
import ServiceCard from "./ServiceCard";

export default async function Services() {
  const images = await getImagesByFileName("services/");

  return (
    <section className="flex flex-1 items-center justify-center px-6 py-12">
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
