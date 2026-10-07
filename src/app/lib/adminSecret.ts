import "server-only";
import { timingSafeEqual } from "crypto";

/** Constant-time check of the x-admin-secret header against ADMIN_SECRET. */
export function hasValidAdminSecret(provided: string | null): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
