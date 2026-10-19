import Link from "next/link";
import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site";

type Crumb = { label: string; href: string };

/** Visible breadcrumb trail plus the matching BreadcrumbList structured data. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-brand-cream/65">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-brand-cream/35">
                    /
                  </span>
                )}
                {last ? (
                  <span aria-current="page" className="text-brand-cream/85">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition hover:text-brand-gold"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            item: item.href === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.href}`,
          })),
        }}
      />
    </>
  );
}
