import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/blob";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, pageMetadata } from "@/lib/site";
import {
  GalleryFolders,
  FOLDER_LABELS,
  FOLDER_DESCRIPTIONS,
  FOLDER_ALT,
  FOLDER_SERVICE,
  isValidFolder,
} from "../galleryData";
import GalleryGrid from "./GalleryGrid";

type Props = {
  params: Promise<{ folder: string }>;
};

// Prerendered at build time; unknown folders 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.values(GalleryFolders).map((folder) => ({ folder }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { folder } = await params;
  if (!isValidFolder(folder)) notFound();
  const label = FOLDER_LABELS[folder];
  return pageMetadata(
    `${label} Photos, London, Ontario`,
    `${FOLDER_DESCRIPTIONS[folder]} Photos by Levere Electric.`,
    `/photo-gallery/${folder}`,
  );
}

export default async function FolderGalleryPage({ params }: Props) {
  const { folder } = await params;

  if (!isValidFolder(folder)) notFound();

  const label = FOLDER_LABELS[folder];
  const images = await getGalleryImages(`gallery/${folder}/`);
  const serialized = images.map((img) => ({
    url: img.url,
    fileName: img.fileName,
    alt: img.alt,
  }));
  const service = FOLDER_SERVICE[folder];

  return (
    // Fills the viewport under the navbar; only the photo grid scrolls.
    <section className="mx-auto flex h-[calc(100dvh-5rem)] w-full max-w-6xl flex-col px-6 pb-6 pt-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: `${label} photos by Levere Electric`,
          description: FOLDER_DESCRIPTIONS[folder],
          url: `${SITE_URL}/photo-gallery/${folder}`,
          image: images.map((img) => new URL(img.url, SITE_URL).href),
        }}
      />
      {/* Stacked on phones; back link floats left of the title from md up. */}
      <div className="mb-5 flex shrink-0 flex-col items-start gap-3 md:relative md:flex-row md:items-center md:justify-center">
        <Link
          href="/photo-gallery"
          className="cursor-pointer flex items-center gap-1.5 rounded-md border border-white/15
                     px-3 py-1.5 text-sm text-white/70 transition hover:border-brand-gold hover:text-brand-gold
                     md:absolute md:left-0"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Gallery
        </Link>
        <h1 className="self-center text-2xl font-semibold text-white">{label}</h1>
      </div>
      <p className="mx-auto mb-5 max-w-2xl shrink-0 text-center text-sm text-brand-cream/75">
        {FOLDER_DESCRIPTIONS[folder]}
        {service && (
          <>
            {" "}
            <Link href={service.href} className="link-gold">
              About {service.label.toLowerCase()} →
            </Link>
          </>
        )}
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-brand-navy-2/30 p-3 pr-2">
        <GalleryGrid images={serialized} altBase={FOLDER_ALT[folder]} />
      </div>
    </section>
  );
}
