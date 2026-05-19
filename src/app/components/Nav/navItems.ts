export type NavItem = {
  label: string;
  href: string;
  match?: "exact" | "startsWith";
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", match: "exact" },
  {
    label: "EV Charger Installation",
    href: "/ev-charger-installation",
    match: "startsWith",
  },
  { label: "Services", href: "/services", match: "startsWith" },
  { label: "Blog", href: "/blog", match: "startsWith" },
  { label: "Photo Gallery", href: "/photo-gallery", match: "startsWith" },
];

export function isActive(pathname: string, item: NavItem) {
  if (item.match === "exact") return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}
