import Image from "next/image";
import Link from "next/link";
import BookNowButton from "../BookNowButton";
import { ALL_AREAS_TEXT, BUSINESS, PHONE_HREF } from "@/lib/site";

const SERVICE_LINKS = [
  { label: "EV Charger Installation", href: "/ev-charger-installation" },
  { label: "Panel & Service Upgrades", href: "/panel-service-upgrades" },
  { label: "Smart Homes & Lutron Lighting", href: "/smart-home-lighting" },
  { label: "Home Networking & UniFi", href: "/home-networking" },
  { label: "All Electrical Services", href: "/services" },
] as const;

const SITE_LINKS = [
  { label: "Project Photos", href: "/photo-gallery" },
  { label: "Homeowner Guides", href: "/blog" },
  { label: "Request a Quote", href: "/book" },
] as const;

export default function Footer() {
  return (
    <footer className="w-full bg-brand-dark-navy">
      <div className="mx-auto w-full max-w-screen-2xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 border-t border-brand-cream/10 py-10 lg:flex-row">
          <div className="flex items-stretch gap-5">
            <div className="relative h-16 w-32 shrink-0">
              <Image
                src="/FullLogo-Dark.jpg"
                alt="Levere Electric"
                fill
                sizes="128px"
                className="object-contain"
                priority={false}
              />
            </div>

            <div className="flex flex-col justify-center text-sm text-brand-cream/80 leading-relaxed">
              <div className="text-base font-semibold text-brand-cream">
                Levere Electric
              </div>
              <div>Owner-operated by {BUSINESS.owner}</div>
              <div>ECRA/ESA License #{BUSINESS.licence}</div>
              <div>Lutron RadioRA 3 certified</div>
              <div>London, Ontario</div>
            </div>
          </div>

          <nav aria-label="Services" className="text-sm text-brand-cream/80">
            <div className="text-brand-gold">Services</div>
            <ul className="mt-1 space-y-1">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-brand-gold" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-brand-gold">Explore</div>
            <ul className="mt-1 space-y-1">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-brand-gold" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm text-brand-cream/80">
            <div>
              <span className="text-brand-gold">Phone:</span>{" "}
              <a className="hover:text-brand-gold" href={PHONE_HREF}>
                {BUSINESS.phone}
              </a>
            </div>
            <div className="mt-1">
              <span className="text-brand-gold">Email:</span>{" "}
              <a
                className="hover:text-brand-gold"
                href={`mailto:${BUSINESS.email}`}
              >
                {BUSINESS.email}
              </a>
            </div>
            <div className="mt-2">
              <div className="text-brand-gold">Serving</div>
              <div className="max-w-xs">
                {ALL_AREAS_TEXT} &amp; surrounding area
              </div>
            </div>
            <div className="mt-2">
              <div className="text-brand-gold">Find us on</div>
              <div className="flex gap-3">
                <a
                  className="hover:text-brand-gold"
                  href={BUSINESS.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google
                </a>
                <a
                  className="hover:text-brand-gold"
                  href={BUSINESS.bbbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BBB
                </a>
                <a
                  className="hover:text-brand-gold"
                  href={BUSINESS.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  className="hover:text-brand-gold"
                  href={BUSINESS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
              <div className="mt-2">
                <span className="text-brand-gold">Hours:</span>{" "}
                {BUSINESS.openingHoursLabel}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <BookNowButton />
          </div>
        </div>

        <div className="border-t border-brand-cream/10 py-6 text-xs text-brand-cream/50">
          © {new Date().getFullYear()} Levere Electric. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
