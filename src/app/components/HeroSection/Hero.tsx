import Link from "next/link";
import HeroGallery from "./HeroGallery";
import HeroTrustList from "./HeroTrustList";
import { JOBBER } from "@/lib/site";

function Hero({ images }: { images: Map<string, string> }) {
  return (
    <section className="relative bg-brand-navy">
      <div className="pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 " />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold leading-tight text-brand-cream">
              Licensed Electrician in London, Ontario
            </h1>

            <p className="mt-4 max-w-lg text-lg text-brand-cream/90">
              Professional residential electrical work, done right the first
              time.
            </p>
            <p className="mt-3 max-w-lg text-brand-cream/80">
              Owner-operated and ESA-licensed. EV charger installation, panel
              and service upgrades, lighting, troubleshooting and repairs for
              homeowners in London, St. Thomas, Dorchester, Komoka and
              Delaware.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={JOBBER.general}
                className="cursor-pointer rounded-md bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-3 active:bg-brand-gold-2 transition"
              >
                Request a Quote
              </Link>

              <Link
                href="/ev-charger-installation"
                className="cursor-pointer rounded-md border border-brand-gold/50 px-5 py-2 text-sm text-brand-cream hover:bg-brand-gold/10 transition"
              >
                EV Charger Installation
              </Link>

              <Link
                href={"/services"}
                className="cursor-pointer rounded-md border border-brand-gold/50 px-5 py-2 text-sm text-brand-cream hover:bg-brand-gold/10 transition"
              >
                View Services
              </Link>
            </div>

            <HeroTrustList />
          </div>

          <div className="mt-5 lg:mt-0">
            <HeroGallery images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
