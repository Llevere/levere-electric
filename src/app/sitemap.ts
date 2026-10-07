import type { MetadataRoute } from "next";
import { GalleryFolders } from "./photo-gallery/galleryData";
import { CONTENT_UPDATED, SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const galleryFolders = Object.values(GalleryFolders).map((folder) => ({
    url: `${SITE_URL}/photo-gallery/${folder}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ev-charger-installation`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/panel-service-upgrades`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/book`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/photo-gallery`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...galleryFolders,
  ];
}
