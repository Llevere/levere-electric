export type NavItem = {
  label: string;
  href: string;
  match?: "exact" | "startsWith";
  /** Hidden from the desktop bar below `lg` (the logo already links home). */
  desktopFromLg?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", match: "exact", desktopFromLg: true },
  { label: "EV Chargers", href: "/ev-charger-installation", match: "startsWith" },
  { label: "Smart Homes", href: "/smart-home-lighting", match: "startsWith" },
  { label: "Services", href: "/services", match: "startsWith" },
  { label: "Gallery", href: "/photo-gallery", match: "startsWith" },
  { label: "Guides", href: "/blog", match: "startsWith" },
];

/** Extra destinations shown only in the phone menu. */
export const MOBILE_EXTRA_ITEMS: NavItem[] = [
  { label: "Panel & Service Upgrades", href: "/panel-service-upgrades", match: "startsWith" },
  { label: "Home Networking", href: "/home-networking", match: "startsWith" },
];

export function isActive(pathname: string, item: NavItem) {
  if (item.match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}
