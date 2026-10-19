import "server-only";
import { getImagesByFileName } from "./homeImages";
import type { BlogPost, PostImage } from "./blog";

type ImageMaps = Record<"home/" | "services/", Map<string, string>>;

/** One Redis read per prefix, shared by every card on a page. */
export async function loadPostImageMaps(): Promise<ImageMaps> {
  const [home, services] = await Promise.all([
    getImagesByFileName("home/"),
    getImagesByFileName("services/"),
  ]);
  return { "home/": home, "services/": services };
}

export function resolvePostImage(
  image: PostImage,
  maps: ImageMaps,
): string | null {
  if ("src" in image) return image.src;
  return maps[image.blob].get(image.file) ?? null;
}

export type ResolvedPost = BlogPost & { imageUrl: string | null };

export async function withImages(posts: BlogPost[]): Promise<ResolvedPost[]> {
  const maps = await loadPostImageMaps();
  return posts.map((p) => ({ ...p, imageUrl: resolvePostImage(p.image, maps) }));
}
