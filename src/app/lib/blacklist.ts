import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "./redis";
import { verifyAdminToken } from "./auth";

export async function blacklistToken(token: string): Promise<void> {
  const { payload } = await verifyAdminToken(token);
  if (!payload.jti || !payload.exp) return;

  const ttl = payload.exp - Math.floor(Date.now() / 1000);
  if (ttl <= 0) return;

  const redis = await getRedis();
  await redis.setEx(`admin:blacklist:${payload.jti}`, ttl, "1");
}

export async function sessionCheck(req: NextRequest): Promise<NextResponse | null> {
  const jti = req.headers.get("x-token-jti");
  if (!jti) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = await getRedis();
  const blacklisted = await redis.exists(`admin:blacklist:${jti}`);

  if (blacklisted) {
    return NextResponse.json({ error: "Session revoked" }, { status: 401 });
  }

  return null;
}
