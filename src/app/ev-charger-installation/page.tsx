import type { Metadata } from "next";
import Link from "next/link";
import { getHomeImageUrl } from "@/lib/homeImages";
import { getGalleryImages } from "@/lib/blob";
import {
  JOBBER,
  LICENCE_LABEL,
  PRICE,
  PRICING,
  pageMetadata,
  serviceJsonLd,
} from "@/lib/site";
import { FOLDER_ALT, GalleryFolders } from "@/photo-gallery/galleryData";
import JsonLd from "@/components/JsonLd";
import SkeletonImage from "@/components/SkeletonImage";
import FAQSection from "@/components/FAQ/FAQSection";
import CtaPanel from "@/components/CtaPanel";
import { RelatedLinks } from "@/components/service/ServiceSections";
import HeroSection from "./HeroSection";
import PackagesSection from "./package-tiers/PackagesSection";
import { FAQS, LOAD_MANAGEMENT_STEPS } from "./data";

export const metadata: Metadata = pageMetadata(
  "EV Charger Installation in London, Ontario",
  `Level 2 EV charger installation in London, ON from ${PRICE.ev}. Load calculation first, ESA permit included. Tesla and all brands. ${LICENCE_LABEL}.`,
  "/ev-charger-installation",
);

const HERO_BG = "ev-car.jpg";

export default async function EvChargerInstallationPage() {
  const [heroUrl, gallery] = await Promise.all([
    getHomeImageUrl(HERO_BG),
    getGalleryImages(`gallery/${GalleryFolders.EVCharging}/`),
  ]);
  const recentInstalls = gallery.slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Home EV charger installation",
          serviceType: "EV charger installation",
          description:
            `Level 2 home EV charger installation in London, Ontario and surrounding communities. Standard installs start at ${PRICE.ev}, with a load calculation and the ESA permit and inspection included. Tesla Wall Connector and all major charger brands.`,
          path: "/ev-charger-installation",
          price: PRICING.ev,
        })}
      />
      <HeroSection heroUrl={heroUrl ?? ""} />
      <PackagesSection />

      <section
        id="load-management"
        aria-labelledby="load-management-heading"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-14"
      >
        <p className="eyebrow">Capacity first. The right solution second.</p>
        <h2
          id="load-management-heading"
          className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl"
        >
          An EV charger does not always mean a panel upgrade.
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-white/75 md:text-base">
          We assess your home&apos;s electrical demand before recommending a
          charging setup. Depending on the installation, a suitable charging
          rate or an approved electric vehicle energy management system (EVEMS)
          can let you charge within the service capacity you already have.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {LOAD_MANAGEMENT_STEPS.map((s, i) => (
            <article
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <span
                aria-hidden="true"
                className="text-sm font-semibold tracking-[0.14em] text-brand-gold"
              >
                0{i + 1}
              </span>
              <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {s.text}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm">
          <Link href="/panel-service-upgrades" className="link-gold">
            Learn about panel and service upgrades →
          </Link>
        </p>
      </section>

      {recentInstalls.length > 0 && (
        <section
          aria-labelledby="recent-installs-heading"
          className="mx-auto w-full max-w-6xl px-4 pb-14"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              id="recent-installs-heading"
              className="text-2xl font-semibold tracking-tight md:text-4xl"
            >
              Recent EV charger installs
            </h2>
            <Link href="/photo-gallery/ev-charging" className="text-sm link-gold">
              See the EV charging gallery →
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recentInstalls.map((img) => (
              <li
                key={img.url}
                className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-2"
              >
                <SkeletonImage
                  src={img.url}
                  alt={img.alt ?? FOLDER_ALT[GalleryFolders.EVCharging]}
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 368px, (min-width: 640px) 33vw, calc(100vw - 32px)"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <FAQSection
        title="EV Charger Install – FAQ"
        intro="Quick answers to the most common questions we get in London and surrounding areas."
        items={FAQS}
        wide
      />

      <RelatedLinks
        links={[
          { label: "Panel and service upgrades", href: "/panel-service-upgrades" },
          { label: "Guide: what affects the cost of an EV charger install?", href: "/blog/ev-charger-installation-cost-london-ontario" },
          { label: "Request a quote", href: "/book" },
        ]}
      />

      <CtaPanel
        title="Ready to plan your home charger?"
        text="Send a photo of your panel, the spot you want the charger and your vehicle model. You get a written quote tied to your home, not a generic number."
        href={JOBBER.ev}
        label="Request an EV charger quote"
        secondary={{ label: "See EV install photos", href: "/photo-gallery/ev-charging" }}
      />
    </>
  );
}
