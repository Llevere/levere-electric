import { NextRequest, NextResponse } from "next/server";
import { syncPrefixToRedis } from "@/lib/blob";
import { hasValidAdminSecret } from "@/lib/adminSecret";

export async function POST(req: NextRequest) {
  if (!hasValidAdminSecret(req.headers.get("x-admin-secret"))) {
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
