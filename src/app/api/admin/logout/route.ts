import { NextRequest, NextResponse } from "next/server";
import { blacklistToken } from "@/lib/blacklist";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  if (token) await blacklistToken(token).catch(() => {});

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return res;
}
