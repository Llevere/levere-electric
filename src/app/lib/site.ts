// Single source of truth for the public host. Vercel serves the site from www
// and redirects the apex there, so every canonical/sitemap/og URL must use www.
export const SITE_URL = "https://www.levere-electric.ca";

export const BUSINESS = {
  name: "Levere Electric",
  phone: "226-559-7897",
  phoneE164: "+1-226-559-7897",
  email: "info@levere-electric.ca",
  licence: "7017944",
  // BBB says 2025-02-05, Google Business Profile says January 2025; use the year only.
  foundingDate: "2025",
  owner: "Brandon Levere",
  // Mirrors the service-area list on the Google Business Profile.
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
  // Hours as published on the Google Business Profile.
  openingHours: "Mo-Su 08:00-20:00",
  bbbUrl:
    "https://www.bbb.org/ca/on/london/profile/electrical-contractors/levere-electric-0187-1089205",
  googleUrl: "https://g.page/r/Cbt0WwDrvyipEBM",
  facebookUrl: "https://www.facebook.com/p/Levere-Electric-61573067439632/",
  instagramUrl: "https://www.instagram.com/levere_electric",
} as const;

export const JOBBER = {
  general:
    "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207525/new",
  ev: "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207543/new",
  panel:
    "https://clienthub.getjobber.com/hubs/44f2974d-a806-4304-a72e-528f6432cdd0/public/requests/2207551/new",
  clientHub:
    "https://clienthub.getjobber.com/client_hubs/44f2974d-a806-4304-a72e-528f6432cdd0/login/new?source=share_login",
} as const;

// Last content update, used for sitemap <lastmod>. Bump when pages change.
export const CONTENT_UPDATED = new Date("2026-10-05T00:00:00Z");
