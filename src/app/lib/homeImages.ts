import "server-only";
import { getIndexedImages } from "@/lib/blob";

export async function getImagesByFileName(
  location: string
): Promise<Map<string, string>> {
  const images = await getIndexedImages(location);
  const byName = new Map(images.map((i) => [i.fileName, i.url]));

  return byName;
}

export async function getHomeImageUrl(
  fileName: string
): Promise<string | null> {
  const map = await getImagesByFileName("home/");
  return map.get(fileName) ?? null;
}
