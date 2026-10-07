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
    // The section fills the viewport below the fixed 5rem navbar. The heading
    // and description stay put and only the photo grid scrolls, inside its own
    // box; the page itself scrolls only to reach the footer.
    <section className="mx-auto flex h-[calc(100dvh-5rem)] w-full max-w-6xl flex-col px-6 pb-6 pt-8">
      {/* Stacked on phones (the absolute back link overlapped long titles);
          back link floats left of the centred title from md up. */}
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
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-brand-navy-2/30 p-3 pr-2">
        <GalleryGrid images={serialized} altBase={FOLDER_ALT[folder]} />
      </div>
    </section>
  );
}
