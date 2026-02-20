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

export async function syncPrefixToRedis(prefix: string): Promise<number> {
  const images = await listFolderRaw(prefix);
  const client = await getRedis();
  await client.set(prefixToKey(prefix), JSON.stringify(images));
  return images.length;
}
