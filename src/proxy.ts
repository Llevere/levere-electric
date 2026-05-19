import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const authExempt = new Set(["/admin/login", "/api/admin/login"]);

async function getVerifiedPayload(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();
  res.headers.set("x-pathname", pathname);

  if (!authExempt.has(pathname)) {
    const token = req.cookies.get("admin-token")?.value;
    const payload = await getVerifiedPayload(token);

    if (!payload) {
      return pathname.startsWith("/api/")
        ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        : NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (payload.jti) {
      res.headers.set("x-token-jti", payload.jti);
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
