import asyncHandler from "express-async-handler";
import axios from "axios";
import { connect } from "../../middlewares/redisClient";
import dotenv from "dotenv";

dotenv.config();

const SWAPI_BASE_URL = process.env.SWAPI_BASE_URL;

interface Starships {
  name: string;
  model: string;
  crew: string;
}

interface ApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Starships[];
}

const getStarShipsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const key = req.originalUrl;

  const response = await axios.get<ApiResponse>(
    `${SWAPI_BASE_URL}/starships/${id}/`
  );

  const starships = response.data;

  // Cache and respond
  const redisClient = await connect();

  redisClient.set(key, JSON.stringify(starships));
  redisClient.expire(key, 30 * 60);
  console.log("Data retrieved from API");
  res.json(starships);
});

export { getStarShipsById };
