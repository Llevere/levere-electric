import { NextRequest, NextResponse } from "next/server";
import { syncPrefixToRedis } from "@/lib/blob";
import { hasValidAdminSecret } from "@/lib/adminSecret";
import { GalleryFolders } from "@/photo-gallery/galleryData";

const KNOWN_PREFIXES = [
  "home/",
  "services/",
  "gallery/",
  ...Object.values(GalleryFolders).map((folder) => `gallery/${folder}/`),
];

export async function POST(req: NextRequest) {
  if (!hasValidAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, number> = {};
  for (const prefix of KNOWN_PREFIXES) {
    results[prefix] = await syncPrefixToRedis(prefix);
  }

  return NextResponse.json({ ok: true, results });
}
