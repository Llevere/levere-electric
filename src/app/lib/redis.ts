import { createClient } from "redis";

const url = process.env.REDIS_URL;
if (!url) throw new Error("Missing REDIS_URL");

export const redis = createClient({ url });

redis.on("error", (err) => console.error("Redis Client Error", err));

export async function getRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
  return redis;
}
