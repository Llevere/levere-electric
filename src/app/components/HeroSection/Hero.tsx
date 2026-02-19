import Link from "next/link";
import HeroGallery from "./HeroGallery";
import HeroTrustList from "./HeroTrustList";

function Hero({ images }: { images: Map<string, string> }) {
  return (
    <section className="relative bg-brand-navy">
      <div className="pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 " />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold leading-tight text-brand-cream">
              Professional residential electrical work — done right the first
              time.
            </h1>

            <p className="mt-4 max-w-lg text-brand-cream/80">
              EV chargers, lighting, service upgrades, troubleshooting, and
              more.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                target="_"
                href="https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207525/new"
                className="cursor-pointer rounded-md bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-gold-3 active:bg-brand-gold-2 transition"
              >
                Book Now
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
