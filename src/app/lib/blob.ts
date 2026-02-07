import "server-only";
import { list } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { BlobImage } from "@/types/images";

const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

async function listFolderRaw(prefix: string): Promise<BlobImage[]> {
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

export const listFolderCached = (prefix: string) =>
  unstable_cache(() => listFolderRaw(prefix), ["blob-folder", prefix], {
    revalidate: 300, // 5 minutes
  })();
