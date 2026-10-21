import type { ServiceItem } from "@/types/services";
import { JOBBER, PRICE } from "@/lib/site";

export const SERVICES: ServiceItem[] = [
  {
    src: "/projects/tesla-wall-connector.webp",
    title: "EV Charger Installation",
    description:
      `Level 2 home charging from ${PRICE.ev}, with a load calculation, ESA permit and inspection, and load-management options when capacity is tight.`,
    href: "/ev-charger-installation",
    quote: JOBBER.ev,
    duration: "2–4 hr",
    estimate: `From ${PRICE.ev}`,
  },
  {
    key: "panel.jpg",
    title: "Panel & Service Upgrades",
    description:
      "Panel replacements and 100A to 200A service upgrades for EV charging, renovations and new equipment. Utility coordination and ESA permit included.",
    href: "/panel-service-upgrades",
    quote: JOBBER.panel,
    duration: "8 hr",
    estimate: PRICE.serviceUpgrade,
  },
  {
    key: "residential-lighting.jpeg",
    title: "Smart Homes & Lutron Lighting",
    description:
      "Lutron RadioRA 3 certified design and installation: lighting scenes, keypads and schedules that fit the way your household lives.",
    href: "/smart-home-lighting",
    quote: JOBBER.general,
    estimate: "Quoted per project",
  },
  {
    key: "kitchen.jpg",
    title: "Lighting & Renovation Wiring",
    description:
      "Pot lights, fixtures, receptacles and the wiring behind your renovation. Plan the electrical work before the walls are closed.",
    href: "/book",
    quote: JOBBER.general,
    duration: "1 hr+",
    estimate: "Call for estimate",
  },
  {
    key: "residential-repair.jpg",
    title: "Home Electrical Repairs",
    description:
      "Troubleshooting, tripping breakers, receptacle repairs, aluminum-wiring pigtails and the everyday electrical work that keeps a home safe.",
    href: "/book",
    quote: JOBBER.general,
    duration: "1 hr",
    estimate: "Call for estimate",
  },
  {
    title: "Home Networking & UniFi",
    description:
      "Wi-Fi coverage, data cabling and UniFi projects, usually alongside smart-lighting or renovation work. Scope and availability confirmed before booking.",
    href: "/home-networking",
    quote: JOBBER.general,
    estimate: "By enquiry",
  },
];
