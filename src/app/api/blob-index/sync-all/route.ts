import { NextRequest, NextResponse } from "next/server";
import { syncPrefixToRedis } from "@/lib/blob";

const KNOWN_PREFIXES = [
  "home/",
  "services/",
  "gallery/",
  "gallery/electrical-upgrade/",
  "gallery/lighting/",
  "gallery/panel/",
  "gallery/pool/",
];

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, number> = {};
  for (const prefix of KNOWN_PREFIXES) {
    results[prefix] = await syncPrefixToRedis(prefix);
  }

  return NextResponse.json({ ok: true, results });
}
