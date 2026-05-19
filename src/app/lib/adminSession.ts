import { cookies } from "next/headers";
import { getRedis } from "./redis";
import { verifyAdminToken } from "./auth";

export async function isLoggedInAdmin(): Promise<boolean> {
  const token = (await cookies()).get("admin-token")?.value;
  if (!token) return false;

  try {
    const { payload } = await verifyAdminToken(token);

    if (!payload.admin || !payload.jti) {
      return false;
    }

    const redis = await getRedis();
    const blacklisted = await redis.exists(`admin:blacklist:${payload.jti}`);

    return !blacklisted;
  } catch {
    return false;
  }
}
