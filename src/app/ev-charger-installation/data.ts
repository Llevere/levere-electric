import { PRICE, type FAQ } from "@/lib/site";

export const PACKAGES = [
  {
    key: "standard",
    tab: "Standard",
    title: "Standard Level 2 Charger Install",
    price: `Starting at ${PRICE.ev}`,
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
    price: PRICE.evExtended,
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
    price: `100A → 200A service upgrade: ${PRICE.serviceUpgrade}`,
    note: "If your home needs more service capacity, we can plan an upgrade. We assess capacity and load-management options first.",
    bullets: [
      "Utility coordination",
      "New panel, breakers, grounding & bonding",
      "ESA permit & inspection included",
    ],
    cta: "Ask about upgrades",
  },
] as const;

export const FAQS: readonly FAQ[] = [
  {
    q: "How much does an EV charger installation cost in London, Ontario?",
    a: `Levere Electric's standard Level 2 installation starts at ${PRICE.ev} when the panel is on the same level as the garage and within about 20 feet. Longer cable routes, finished walls, extra equipment or a service upgrade change the price; most extended installs run ${PRICE.evExtended}. Your written quote confirms the full scope and whether the charger is supplied before booking.`,
  },
  {
    q: "Do I need a 200A panel for an EV charger?",
    a: "Not always. We do a load calculation first. Many homes can support a 40A charger even with a 100A service. Depending on your home and charger, a suitable charging rate or an approved EV energy management system can be an alternative to a service upgrade.",
  },
  {
    q: "What is an EV energy management system (EVEMS)?",
    a: "An EVEMS manages EV charging in relation to the home's electrical demand. Depending on the approved equipment and installation, it can reduce or pause charging to stay within available capacity. We assess whether load management suits your home before recommending it.",
  },
  {
    q: "How long does installation take?",
    a: "Most installs take 2–4 hours. More complex jobs with long runs or finished walls can take half a day.",
  },
  {
    q: "Can you install Tesla chargers?",
    a: "Yes. We install Tesla Wall Connectors regularly, as well as universal chargers from Wallbox, ChargePoint, Grizzl-E, FLO and others.",
  },
  {
    q: "Do you handle the ESA permit?",
    a: "Yes. The ESA permit (notification) and inspection are included with every EV charger install, and you keep the certificate of acceptance for your records.",
  },
  {
    q: "Can I use a NEMA 14-50 outlet instead of hardwiring?",
    a: "Yes. Many chargers work well on a 14-50 receptacle. Tesla recommends hardwiring the Wall Connector for maximum reliability, and some chargers require it, so we confirm the right connection for your equipment.",
  },
  {
    q: "What should I send for an EV charger quote?",
    a: "Send your location, your vehicle or charger model, a photo of the closed electrical panel and its label, and a photo of where you want the charger. An idea of the cable route is helpful. Do not remove any electrical covers to take photos.",
  },
  {
    q: "Is your work under warranty?",
    a: "Yes. We include a 1-year workmanship warranty on all EV charger installations.",
  },
];

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

export const LOAD_MANAGEMENT_STEPS = [
  {
    title: "Assess the home",
    text: "We start with your electrical service, existing loads, the charger you want and where the car parks.",
  },
  {
    title: "Compare suitable options",
    text: "We explain charging rates, whether load management makes sense and whether a service upgrade is actually needed.",
  },
  {
    title: "Confirm the full scope",
    text: "Your quote names the equipment, cable route and work included before installation is booked.",
  },
] as const;


export type PackageKey = (typeof PACKAGES)[number]["key"];
