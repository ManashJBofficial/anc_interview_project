// src/middlewares/redisClient.ts

import * as redis from "redis";
import dotenv from "dotenv";

dotenv.config();
const redisUrl = process.env.REDIS_URL;

export const connect = async () => {
  const redisClient = redis.createClient({
    url: redisUrl,
  });

  redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
  });

  await redisClient.connect();
  return redisClient;
};
