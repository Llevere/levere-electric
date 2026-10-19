export enum GalleryFolders {
  EVCharging = "ev-charging",
  Panel = "panel",
  Lighting = "lighting",
  ElectricalUpgrade = "electrical-upgrade",
  Pool = "pool",
}

export const FOLDER_LABELS: Record<GalleryFolders, string> = {
  [GalleryFolders.EVCharging]: "EV Charging",
  [GalleryFolders.Panel]: "Panel Upgrades",
  [GalleryFolders.Lighting]: "Lighting",
  [GalleryFolders.ElectricalUpgrade]: "Electrical Upgrades",
  [GalleryFolders.Pool]: "Pool & Hot Tub",
};

// Page intros and meta descriptions (keep under ~130 characters).
export const FOLDER_DESCRIPTIONS: Record<GalleryFolders, string> = {
  [GalleryFolders.EVCharging]:
    "Level 2 EV charger installs in London, Ontario: Tesla Wall Connectors, Wallbox and universal chargers in garages and driveways.",
  [GalleryFolders.Panel]:
    "Electrical panel replacements and 100A to 200A service upgrades, with clean, labelled finished work.",
  [GalleryFolders.Lighting]:
    "Interior and exterior lighting installations, including pot lights, fixtures and renovation lighting.",
  [GalleryFolders.ElectricalUpgrade]:
    "Service and wiring upgrades completed by Levere Electric in London, Ontario and nearby communities.",
  [GalleryFolders.Pool]:
    "Pool and hot-tub electrical: dedicated circuits, bonding and outdoor-rated equipment.",
};

export const FOLDER_ALT: Record<GalleryFolders, string> = {
  [GalleryFolders.EVCharging]:
    "EV charger installation by Levere Electric, London, Ontario",
  [GalleryFolders.Panel]:
    "Electrical panel upgrade by Levere Electric, London, Ontario",
  [GalleryFolders.Lighting]:
    "Lighting installation by Levere Electric, London, Ontario",
  [GalleryFolders.ElectricalUpgrade]:
    "Electrical upgrade by Levere Electric, London, Ontario",
  [GalleryFolders.Pool]:
    "Pool and hot-tub electrical work by Levere Electric, London, Ontario",
};

/** Service page linked from each gallery folder. */
export const FOLDER_SERVICE: Partial<Record<GalleryFolders, { label: string; href: string }>> = {
  [GalleryFolders.EVCharging]: { label: "EV charger installation", href: "/ev-charger-installation" },
  [GalleryFolders.Panel]: { label: "Panel & service upgrades", href: "/panel-service-upgrades" },
  [GalleryFolders.Lighting]: { label: "Smart homes & lighting", href: "/smart-home-lighting" },
};

const folderValues = new Set<string>(Object.values(GalleryFolders));

export function isValidFolder(value: string): value is GalleryFolders {
  return folderValues.has(value);
}
