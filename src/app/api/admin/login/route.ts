import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken } from "@/lib/auth";
import { getRedis } from "@/lib/redis";

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 15 * 60;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

async function getAttempts(ip: string): Promise<number> {
  const redis = await getRedis();
  const val = await redis.get(`admin:login:attempts:${ip}`);
  return val ? parseInt(val, 10) : 0;
}

async function recordFailedAttempt(ip: string): Promise<number> {
  const redis = await getRedis();
  const key = `admin:login:attempts:${ip}`;
  const attempts = await redis.incr(key);
  if (attempts === 1) await redis.expire(key, LOCKOUT_SECONDS);
  return attempts;
}

async function clearAttempts(ip: string): Promise<void> {
  const redis = await getRedis();
  await redis.del(`admin:login:attempts:${ip}`);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const attempts = await getAttempts(ip);

  if (attempts >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many failed attempts. Try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": String(LOCKOUT_SECONDS) } }
    );
  }

  const { username, password } = await req.json();

  const storedHash = Buffer.from(
    process.env.ADMIN_PASSWORD_HASH ?? "",
    "base64"
  ).toString("utf8");

  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword = await bcrypt.compare(password, storedHash);

  if (!validUsername || !validPassword) {
    await recordFailedAttempt(ip);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await clearAttempts(ip);

  const token = await signAdminToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
