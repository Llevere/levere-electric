export enum GalleryFolders {
  ElectricalUpgrade = "electrical-upgrade",
  Lighting = "lighting",
  Panel = "panel",
  Pool = "pool",
}

export const FOLDER_LABELS: Record<GalleryFolders, string> = {
  [GalleryFolders.ElectricalUpgrade]: "Electrical Upgrades",
  [GalleryFolders.Lighting]: "Lighting",
  [GalleryFolders.Panel]: "Panel",
  [GalleryFolders.Pool]: "Pool",
};

const folderValues = new Set<string>(Object.values(GalleryFolders));

export function isValidFolder(value: string): value is GalleryFolders {
  return folderValues.has(value);
}
