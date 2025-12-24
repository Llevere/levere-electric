export const PACKAGES = [
  {
    key: "standard",
    tab: "Standard",
    title: "Standard Level 2 Charger Install",
    price: "Starting at $899 + HST",
    note: "Ideal when your panel is on the same level as the garage and within about 20 ft.",
    bullets: [
      "240V 40–50A circuit installed",
      "NEMA 14-50 outlet or hardwired connection",
      "ESA permit & inspection",
      "All materials (breaker, wire, clamps, staples)",
      "Professional mounting & testing",
      "Load calculation to check capacity",
    ],
    cta: "Request this package",
  },
  {
    key: "extended",
    tab: "Extended",
    title: "Extended Install (Most Common)",
    price: "$1,200–$1,600 + HST",
    note: "For longer wire runs, finished basements, or panels far from the garage.",
    bullets: [
      "Typically includes 30–60 ft of 8/3 or 6/3 wire",
      "Conduit where required",
      "Wall penetrations & patching where necessary",
      "Load calculation",
      "ESA permit & inspection",
    ],
    cta: "Request this package",
  },
  {
    key: "upgrades",
    tab: "Upgrades",
    title: "Panel & Service Upgrades",
    price: "100A → 200A Service Upgrade: $2,400–$3,500 + HST",
    note: "If your panel is maxed out, we can upgrade your service so it safely supports EV charging.",
    bullets: [
      "Utility coordination",
      "New panel, breakers, grounding & bonding",
      "ESA permit & inspection included",
    ],
    cta: "Ask about upgrades",
  },
] as const;

export const FAQS = [
  {
    q: "Do I need a 200A panel for an EV charger?",
    a: "Not always. We do a load calculation first. Many homes can support a 40A charger even with a 100A service.",
  },
  {
    q: "How long does installation take?",
    a: "Most installs take 2–4 hours. More complex jobs can take half a day.",
  },
  {
    q: "Can you install Tesla chargers?",
    a: "Yes — we install Tesla Wall Connectors regularly as well as universal chargers.",
  },
  {
    q: "Do you handle the ESA permit?",
    a: "Yes, permits and inspections are included with every EV charger install.",
  },
  {
    q: "Can I use a NEMA 14-50 outlet instead of hardwiring?",
    a: "Yes. Many chargers work great on a 14-50. Tesla recommends hardwiring for maximum reliability.",
  },
  {
    q: "Is your work under warranty?",
    a: "Yes. We include a 1-year workmanship warranty on all EV charger installations.",
  },
] as const;

export const FEATURES = [
  {
    title: "ESA-Licensed Electrical Contractor",
    desc: "Safe, code-compliant installs that pass inspection the first time.",
  },
  {
    title: "Experience With All EV Brands",
    desc: "Tesla, Ford, Hyundai/Kia, GM, VW, Polestar, Rivian — we install all major chargers.",
  },
  {
    title: "Clean, Professional, Premium Work",
    desc: "Neat cable runs, proper bonding & grounding. No sloppy handyman installs.",
  },
  {
    title: "Local & Trusted in London, ON",
    desc: "Owner-operated, fully insured, upfront pricing. Serving London & surrounding area.",
  },
] as const;

export type PackageKey = (typeof PACKAGES)[number]["key"];
