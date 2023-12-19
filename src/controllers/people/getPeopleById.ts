import asyncHandler from "express-async-handler";
import axios from "axios";
import { connect } from "../../middlewares/redisClient";
import dotenv from "dotenv";

dotenv.config();

const SWAPI_BASE_URL = process.env.SWAPI_BASE_URL;

interface People {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

interface ApiResponse {
  count: number;
  next: string;
  previous: string;
  results: People[];
}

const getPeopleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const key = req.originalUrl;

  const response = await axios.get<ApiResponse>(
    `${SWAPI_BASE_URL}/people/${id}/`
  );

  const person = response.data;
  // Cache and respond
  const redisClient = await connect();

  redisClient.set(key, JSON.stringify(person));
  redisClient.expire(key, 30 * 60);
  console.log("Data retrieved from API");
  res.json(person);
});

export { getPeopleById };
