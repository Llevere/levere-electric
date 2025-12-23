import "server-only";
import { listFolderCached } from "@/lib/blob";

export async function getHomeImagesByFileName(): Promise<Map<string, string>> {
  const images = await listFolderCached("home/");
  const byName = new Map(images.map((i) => [i.fileName, i.url]));

  return byName;
}

export async function getHomeImageUrl(
  fileName: string
): Promise<string | null> {
  const map = await getHomeImagesByFileName();
  return map.get(fileName) ?? null;
}
