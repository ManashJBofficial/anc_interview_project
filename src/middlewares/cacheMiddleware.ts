// src/middlewares/cacheMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { connect } from "./redisClient";

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.originalUrl;
  const redisClient = await connect();
  redisClient.on("error", (err: any) => {
    console.log(err);
  });

  const cachedData = await redisClient.get(key);

  if (cachedData) {
    const data = JSON.parse(cachedData);
    console.log("Data retrieved from cache");
    return res.json(data);
  }

  next();
};
