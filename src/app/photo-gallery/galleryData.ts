export enum GalleryFolders {
  ElectricalUpgrade = "electrical-upgrade",
  Lighting = "lighting",
  Panel = "panel",
  Pool = "pool",
}

export const FOLDER_LABELS: Record<GalleryFolders, string> = {
  [GalleryFolders.ElectricalUpgrade]: "Electrical Upgrades",
  [GalleryFolders.Lighting]: "Lighting",
  [GalleryFolders.Panel]: "Panel Upgrades",
  [GalleryFolders.Pool]: "Pool & Hot Tub",
};

// Short, honest descriptions used as page intros and image alt text.
// Brandon can replace these with per-photo captions later.
export const FOLDER_DESCRIPTIONS: Record<GalleryFolders, string> = {
  [GalleryFolders.ElectricalUpgrade]:
    "Service and wiring upgrades completed by Levere Electric in London, Ontario and nearby communities.",
  [GalleryFolders.Lighting]:
    "Interior and exterior lighting installations, including pot lights, fixtures and renovation lighting.",
  [GalleryFolders.Panel]:
    "Electrical panel replacements and 100A to 200A service upgrades, with clean, labelled finished work.",
  [GalleryFolders.Pool]:
    "Pool and hot-tub electrical: dedicated circuits, bonding and outdoor-rated equipment.",
};

export const FOLDER_ALT: Record<GalleryFolders, string> = {
  [GalleryFolders.ElectricalUpgrade]:
    "Electrical upgrade by Levere Electric, London, Ontario",
  [GalleryFolders.Lighting]:
    "Lighting installation by Levere Electric, London, Ontario",
  [GalleryFolders.Panel]:
    "Electrical panel upgrade by Levere Electric, London, Ontario",
  [GalleryFolders.Pool]:
    "Pool and hot-tub electrical work by Levere Electric, London, Ontario",
};

const folderValues = new Set<string>(Object.values(GalleryFolders));

export function isValidFolder(value: string): value is GalleryFolders {
  return folderValues.has(value);
}
