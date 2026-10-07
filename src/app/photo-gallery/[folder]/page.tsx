import type { Metadata } from "next";
import { getIndexedImages } from "@/lib/blob";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  GalleryFolders,
  FOLDER_LABELS,
  FOLDER_DESCRIPTIONS,
  FOLDER_ALT,
  isValidFolder,
} from "../galleryData";
import GalleryGrid from "./GalleryGrid";

type Props = {
  params: Promise<{ folder: string }>;
};

// Prerender the four folder pages at build time (one Redis read per build)
// instead of running a dynamic, uncacheable render on every visit.
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.values(GalleryFolders).map((folder) => ({ folder }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { folder } = await params;
  if (!isValidFolder(folder)) notFound();
  const label = FOLDER_LABELS[folder];
  return {
    title: `${label} Photos, London, Ontario`,
    description: `${FOLDER_DESCRIPTIONS[folder]} Photos of ${label.toLowerCase()} projects by Levere Electric in London, ON.`,
    alternates: { canonical: `/photo-gallery/${folder}` },
    openGraph: {
      title: `${label} Photos | Levere Electric`,
      description: FOLDER_DESCRIPTIONS[folder],
      url: `/photo-gallery/${folder}`,
    },
  };
}

export default async function FolderGalleryPage({ params }: Props) {
  const { folder } = await params;

  if (!isValidFolder(folder)) notFound();

  const label = FOLDER_LABELS[folder];
  const images = await getIndexedImages(`gallery/${folder}/`);
  const serialized = images.map((img) => ({
    url: img.url,
    fileName: img.fileName,
  }));

  return (
    <section className="max-w-6xl mx-auto w-full px-6 py-12">
      <div className="relative mb-6 flex items-center justify-center">
        <Link
          href="/photo-gallery"
          className="cursor-pointer absolute left-0 flex items-center gap-1.5 rounded-md border border-white/15
                     px-3 py-1.5 text-sm text-white/70 transition hover:border-brand-gold hover:text-brand-gold"
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
        <h1 className="text-2xl font-semibold text-white">{label}</h1>
      </div>
      <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-brand-cream/75">
        {FOLDER_DESCRIPTIONS[folder]}
      </p>

      <GalleryGrid images={serialized} altBase={FOLDER_ALT[folder]} />
    </section>
  );
}
