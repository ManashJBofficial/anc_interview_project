import { Request, Response } from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";
import { connect } from "../../middlewares/redisClient";
import dotenv from "dotenv";

dotenv.config();

const SWAPI_BASE_URL = process.env.SWAPI_BASE_URL;

const getAllPeople = asyncHandler(async (req: Request, res: Response) => {
  const { page } = req.query;
  const key = req.originalUrl;
  const response = await axios.get(`${SWAPI_BASE_URL}/people`, {
    params: { page },
  });

  //store response.data to redis cache
  const TTL_SECONDS = 30 * 60;

  const redisClient = await connect();

  redisClient.set(key, JSON.stringify(response.data));
  redisClient.expire(key, TTL_SECONDS);

  console.log("Data retrieved from API");

  res.json(response.data);
});

export { getAllPeople };
