import "server-only";
import { list } from "@vercel/blob";
import { BlobImage } from "@/types/images";
import { getRedis } from "./redis";

const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

export async function listFolderRaw(prefix: string): Promise<BlobImage[]> {
  const { blobs } = await list({ prefix });

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

export async function getIndexedFolderListing(
  prefix: string,
  limit: number,
  cursor?: string
): Promise<{
  folders: { pathname: string; name: string }[];
  images: BlobImage[];
  cursor: string | null;
  hasMore: boolean;
} | null> {
  const indexed = await getIndexedImages(prefix);
  if (indexed.length === 0) return null;

  const folderMap = new Map<string, { pathname: string; name: string }>();
  const immediateImages: BlobImage[] = [];

  for (const image of indexed) {
    const remainder = image.pathname.slice(prefix.length);
    if (!remainder) continue;

    const slashIndex = remainder.indexOf("/");
    if (slashIndex >= 0) {
      const folderName = remainder.slice(0, slashIndex);
      const pathname = `${prefix}${folderName}/`;
      if (!folderMap.has(pathname)) {
        folderMap.set(pathname, {
          pathname,
          name: folderName,
        });
      }
      continue;
    }

    immediateImages.push(image);
  }

  immediateImages.sort((a, b) => (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? ""));

  const offset = cursor ? Number.parseInt(cursor, 10) || 0 : 0;
  const pagedImages = immediateImages.slice(offset, offset + limit);
  const nextOffset = offset + limit;
  const hasMore = nextOffset < immediateImages.length;

  return {
    folders: [...folderMap.values()].sort((a, b) => a.pathname.localeCompare(b.pathname)),
    images: pagedImages,
    cursor: hasMore ? String(nextOffset) : null,
    hasMore,
  };
}

export async function syncPrefixToRedis(prefix: string): Promise<number> {
  const images = await listFolderRaw(prefix);
  const client = await getRedis();
  await client.set(prefixToKey(prefix), JSON.stringify(images));
  return images.length;
}
