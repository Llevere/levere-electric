import type { BlobImage } from "@/types/images";

/**
 * Photos bundled under /public/projects, shown alongside the Blob gallery.
 * Remove an entry once the same photo is uploaded to Blob.
 */
export const LOCAL_GALLERY_IMAGES: BlobImage[] = [
  {
    url: "/projects/tesla-wall-connector.webp",
    pathname: "gallery/ev-charging/tesla-wall-connector.webp",
    fileName: "tesla-wall-connector.webp",
    size: 35_000,
    alt: "Tesla Wall Connector installed on a garage wall by Levere Electric in London, Ontario",
  },
  {
    url: "/projects/wallbox-home-charging.webp",
    pathname: "gallery/ev-charging/wallbox-home-charging.webp",
    fileName: "wallbox-home-charging.webp",
    size: 200_000,
    alt: "Wallbox EV charger charging an electric SUV in a driveway, installed by Levere Electric",
  },
  {
    url: "/projects/tesla-garage-installation.webp",
    pathname: "gallery/ev-charging/tesla-garage-installation.webp",
    fileName: "tesla-garage-installation.webp",
    size: 278_000,
    alt: "Tesla charger with surface conduit in a garage, installed by Levere Electric",
  },
];
