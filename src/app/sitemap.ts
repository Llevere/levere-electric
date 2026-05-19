import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { db } from "./lib/db";
import { blogPosts } from "./lib/schema";
import { GalleryFolders } from "./photo-gallery/galleryData";

const SITE_URL = "https://levere-electric.ca";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const galleryFolders = Object.values(GalleryFolders).map((folder) => ({
    url: `${SITE_URL}/photo-gallery/${folder}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const posts = await db
    .select({
      slug: blogPosts.slug,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.published, true));

  const blogEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ev-charger-installation`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/panel-service-upgrades`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/photo-gallery`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...galleryFolders,
    {
      url: `${SITE_URL}/book`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...blogEntries,
  ];
}
