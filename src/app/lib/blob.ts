import "server-only";
import { list } from "@vercel/blob";
import { BlobImage } from "@/types/images";
import { getRedis } from "./redis";
import { LOCAL_GALLERY_IMAGES } from "@/photo-gallery/localGalleryImages";

const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

export async function listFolderRaw(prefix: string): Promise<BlobImage[]> {
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return blobs
    .filter((b) => !b.pathname.endsWith("/") && b.size > 0)
    .filter((b) => IMAGE_EXT.test(b.pathname))
    .map((b) => ({
      url: b.url,
      pathname: b.pathname,
      fileName: decodeURIComponent(b.pathname.split("/").pop()!),
      size: b.size,
      uploadedAt: b.uploadedAt
        ? new Date(b.uploadedAt).toISOString()
        : undefined,
    }))
    .sort((a, b) => a.pathname.localeCompare(b.pathname));
}

function prefixToKey(prefix: string): string {
  return `blobindex:${prefix.replace(/\//g, "__")}`;
}

export async function getIndexedImages(prefix: string): Promise<BlobImage[]> {
  const client = await getRedis();
  const raw = await client.get(prefixToKey(prefix));
  if (!raw) return [];
  return JSON.parse(raw) as BlobImage[];
}

/** Blob-indexed photos for a prefix plus bundled ones not yet uploaded. */
export async function getGalleryImages(prefix: string): Promise<BlobImage[]> {
  const indexed = await getIndexedImages(prefix);
  const seen = new Set(indexed.map((i) => i.fileName));
  const local = LOCAL_GALLERY_IMAGES.filter(
    (i) => i.pathname.startsWith(prefix) && !seen.has(i.fileName),
  );
  return [...local, ...indexed];
}

export async function syncPrefixToRedis(prefix: string): Promise<number> {
  const images = await listFolderRaw(prefix);
  const client = await getRedis();
  await client.set(prefixToKey(prefix), JSON.stringify(images));
  return images.length;
}
