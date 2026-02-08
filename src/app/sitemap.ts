import type { MetadataRoute } from "next";
import { GalleryFolders } from "./photo-gallery/galleryData";

const SITE_URL = "https://levere-electric.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const galleryFolders = Object.values(GalleryFolders).map((folder) => ({
    url: `${SITE_URL}/photo-gallery/${folder}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
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
  ];
}
