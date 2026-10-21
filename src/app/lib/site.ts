import type { Metadata } from "next";

// Vercel serves www and redirects the apex, so every absolute URL uses www.
export const SITE_URL = "https://www.levere-electric.ca";

export const BUSINESS = {
  name: "Levere Electric",
  phone: "226-559-7897",
  phoneE164: "+1-226-559-7897",
  email: "info@levere-electric.ca",
  licence: "7017944",
  // BBB says 2025-02-05, Google Business Profile says January 2025.
  foundingDate: "2025",
  owner: "Brandon Levere",
  // Mirrors the Google Business Profile service areas.
  serviceAreas: [
    "London",
    "St. Thomas",
    "Dorchester",
    "Komoka",
    "Delaware",
    "Strathroy",
    "Ilderton",
    "Mount Brydges",
  ],
  // The shorter list used in page copy.
  primaryAreas: ["London", "St. Thomas", "Dorchester", "Komoka", "Delaware"],
  openingHours: "Mo-Su 08:00-20:00",
  openingHoursLabel: "8:00 AM to 8:00 PM, every day",
  bbbUrl:
    "https://www.bbb.org/ca/on/london/profile/electrical-contractors/levere-electric-0187-1089205",
  googleUrl: "https://g.page/r/Cbt0WwDrvyipEBM",
  facebookUrl: "https://www.facebook.com/p/Levere-Electric-61573067439632/",
  instagramUrl: "https://www.instagram.com/levere_electric",
} as const;

export const PHONE_HREF = `tel:${BUSINESS.phoneE164.replace(/-/g, "")}`;
export const LICENCE_LABEL = `ECRA/ESA #${BUSINESS.licence}`;

/** "A, B, C and D" */
function listText(items: readonly string[]) {
  return items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}
export const AREAS_TEXT = listText(BUSINESS.primaryAreas);
export const ALL_AREAS_TEXT = listText(BUSINESS.serviceAreas);

export const JOBBER = {
  general:
    "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207525/new",
  ev: "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207543/new",
  panel:
    "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207551/new",
  clientHub:
    "https://clienthub.getjobber.com/client_hubs/44f2974d-a806-4304-a72e-528f6432cdd0/login/new?source=share_login",
} as const;

/** Published prices in CAD before HST. Change them here, not in page copy. */
export const PRICING = {
  ev: { min: 899 },
  evExtended: { min: 1200, max: 1600 },
  serviceUpgrade: { min: 2400, max: 3500 },
} as const;

type Price = { min: number; max?: number };
const cad = (n: number) => `$${n.toLocaleString("en-CA")}`;
const priceLabel = (p: Price) =>
  `${cad(p.min)}${p.max ? ` to ${cad(p.max)}` : ""} + HST`;

/** Ready-to-print labels, e.g. PRICE.ev = "$899 + HST". */
export const PRICE = {
  ev: priceLabel(PRICING.ev),
  evExtended: priceLabel(PRICING.evExtended),
  serviceUpgrade: priceLabel(PRICING.serviceUpgrade),
};

// Last content update, used for sitemap <lastmod>. Bump when pages change.
export const CONTENT_UPDATED = new Date("2026-10-19T00:00:00Z");

// The single business entity; other JSON-LD blocks reference it by @id.
export const BUSINESS_ID = `${SITE_URL}/#business`;

export type FAQ = { q: string; a: string };

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Levere Electric, licensed electrician in London, Ontario",
};

/**
 * Title, description, canonical, Open Graph and Twitter tags for a page.
 * Next does not deep-merge `openGraph` from the layout, so the image is
 * repeated here.
 */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  options: {
    /** Skip the " | Levere Electric" suffix (long article titles). */
    absoluteTitle?: boolean;
    type?: "website" | "article";
    image?: { url: string; alt: string };
    publishedTime?: string;
    modifiedTime?: string;
  } = {},
): Metadata {
  const shareTitle = options.absoluteTitle
    ? title
    : `${title} | ${BUSINESS.name}`;
  const image = options.image ?? OG_IMAGE;
  const article = options.type === "article";
  return {
    title: options.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: options.type ?? "website",
      locale: "en_CA",
      siteName: BUSINESS.name,
      url: path,
      title: shareTitle,
      description,
      images: [image],
      ...(article && {
        publishedTime: options.publishedTime,
        modifiedTime: options.modifiedTime,
        authors: [BUSINESS.owner],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image.url],
    },
  };
}

export const AREA_SERVED = BUSINESS.serviceAreas.map((name) => ({
  "@type": "City",
  name: `${name}, Ontario`,
}));

/** schema.org Service that points at the site-wide business. */
export function serviceJsonLd(service: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  price?: Price;
}) {
  const url = `${SITE_URL}${service.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: AREA_SERVED,
    ...(service.price && {
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "CAD",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "CAD",
          minPrice: service.price.min,
          ...(service.price.max && { maxPrice: service.price.max }),
          valueAddedTaxIncluded: false,
        },
      },
    }),
  };
}

export function faqJsonLd(items: readonly FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
