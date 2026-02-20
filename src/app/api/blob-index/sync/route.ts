import { NextRequest, NextResponse } from "next/server";
import { syncPrefixToRedis } from "@/lib/blob";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { prefix } = body;
  if (!prefix || typeof prefix !== "string") {
    return NextResponse.json({ error: "Invalid prefix" }, { status: 400 });
  }

  const count = await syncPrefixToRedis(prefix);
  return NextResponse.json({ ok: true, count });
}
