import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});

export async function getRedisClient() {
  await redisClient.connect();

  return {
    instance: redisClient,
    [Symbol.asyncDispose]: async () => {
      await redisClient.disconnect();
    },
  };
}
