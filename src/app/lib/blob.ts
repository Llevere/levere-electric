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

//Cache every Monday
export const listFolderCached = (prefix: string) => {
  const d = new Date();
  const oneJan = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((d.getTime() - oneJan.getTime()) / 86400000 + oneJan.getUTCDay() + 1) / 7,
  );
  const weekKey = `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;

  return unstable_cache(
    () => listFolderRaw(prefix),
    ["blob-folder", prefix, weekKey],
    { revalidate: 60 * 60 * 24 * 7 },
  )();
};
