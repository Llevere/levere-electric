import { SignJWT, jwtVerify } from "jose";
import { randomUUID } from "crypto";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(randomUUID())
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminToken(token: string) {
  return jwtVerify(token, secret);
}
