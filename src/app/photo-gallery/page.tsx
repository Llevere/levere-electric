import type { Metadata } from "next";
import Link from "next/link";
import SkeletonImage from "@/components/SkeletonImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaPanel from "@/components/CtaPanel";
import { getGalleryImages } from "@/lib/blob";
import { AREAS_TEXT, pageMetadata } from "@/lib/site";
import type { BlobImage } from "@/types/images";
import {
  GalleryFolders,
  FOLDER_LABELS,
  FOLDER_DESCRIPTIONS,
  FOLDER_ALT,
} from "./galleryData";

export const metadata: Metadata = pageMetadata(
  "Electrical Project Photos, London, Ontario",
  "Real photos of Levere Electric's work in London, ON: EV charger installations, panel upgrades, lighting, and pool and hot-tub electrical.",
  "/photo-gallery",
);

function groupByFolder(images: BlobImage[]) {
  const folders = Object.values(GalleryFolders);
  const grouped = Object.fromEntries(
    folders.map((f) => [f, [] as BlobImage[]]),
  ) as Record<GalleryFolders, BlobImage[]>;

  for (const img of images) {
    const subfolder = img.pathname.split("/")[1];
    if (subfolder && subfolder in grouped) {
      grouped[subfolder as GalleryFolders].push(img);
    }
  }
  return grouped;
}

export default async function PhotoGalleryPage() {
  const images = await getGalleryImages("gallery/");
  const grouped = groupByFolder(images);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pt-8 pb-12">
        <Breadcrumbs items={[{ label: "Photo gallery", href: "/photo-gallery" }]} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Electrical Project Photos
        </h1>
        <p className="mt-3 max-w-3xl text-brand-cream/80">
          Real jobs by Levere Electric in {AREAS_TEXT}.
          No stock photos. Pick a category to see the full set.
        </p>

        {/* One cover photo per folder keeps this page to a few downloads. */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {Object.values(GalleryFolders).map((folder, i) => {
            const list = grouped[folder];
            const cover = list[0];
            return (
              <Link
                key={folder}
                href={`/photo-gallery/${folder}`}
                className="group block rounded-xl border border-brand-gold/25 bg-brand-navy-2/40 p-3 transition hover:border-brand-gold/60"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-brand-navy-2">
                  {cover ? (
                    <SkeletonImage
                      src={cover.url}
                      alt={cover.alt ?? FOLDER_ALT[folder]}
                      fill
                      priority={i < 2}
                      sizes="(min-width: 768px) 536px, calc(100vw - 72px)"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-white">
                    {FOLDER_LABELS[folder]}
                  </h2>
                  <span className="text-sm text-brand-gold group-hover:text-brand-gold-3">
                    {list.length} photo{list.length === 1 ? "" : "s"} →
                  </span>
                </div>
                <p className="mt-1 text-sm text-brand-cream/70">
                  {FOLDER_DESCRIPTIONS[folder]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaPanel
        title="Like what you see?"
        text="Every photo here is our own work. Tell us about your project and we will give you a written quote."
      />
    </>
  );
}
