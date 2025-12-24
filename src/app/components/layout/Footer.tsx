import Link from "next/link";
import Image from "next/image";
export default async function Footer() {
  return (
    <footer className="w-full bg-brand-dark-navy">
      <div className="mx-auto w-full max-w-screen-2xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 border-t border-brand-cream/10 py-10 md:flex-row md:items-center">
          <div className="flex items-stretch gap-5">
            <div className="relative h-16 w-32 shrink-0">
              <Image
                src="/FullLogo-Dark.jpg"
                alt="Levere Electric"
                fill
                sizes="12"
                className="object-contain"
                priority={false}
              />
            </div>

            <div className="flex flex-col justify-center text-sm text-brand-cream/80 leading-relaxed">
              <div className="text-base font-semibold text-brand-cream">
                Levere Electric
              </div>
              <div>ECRA/ESA License #7017944</div>
              <div>London, Ontario</div>
            </div>
          </div>

          <div className="text-sm text-brand-cream/80">
            <div>
              <span className="text-brand-gold">Phone:</span>{" "}
              <a className="hover:text-brand-gold" href="tel:2265597897">
                226-559-7897
              </a>
            </div>
            <div className="mt-1">
              <span className="text-brand-gold">Email:</span>{" "}
              <a
                className="hover:text-brand-gold"
                href="mailto:LevereElectric@gmail.com"
              >
                LevereElectric@gmail.com
              </a>
            </div>
            <div className="mt-2">
              <div className="text-brand-gold">Serving</div>
              <div>London, St. Thomas,</div>
              <div>Dorchester, Komoka & Area</div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Link
              href="/book"
              className="inline-flex w-full items-center justify-center rounded-md bg-brand-gold px-6 py-3
                                        text-sm font-semibold text-brand-navy hover:bg-brand-gold-3 active:bg-brand-gold-2 transition-colors md:w-auto"
            >
              Book Now
            </Link>
          </div>
        </div>

        <div className="border-t border-brand-cream/10 py-6 text-xs text-brand-cream/50">
          © {new Date().getFullYear()} Levere Electric. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
