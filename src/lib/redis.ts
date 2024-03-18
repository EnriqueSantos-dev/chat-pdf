import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});
export async function getRedisClient() {
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();
  return redisClient;
}
