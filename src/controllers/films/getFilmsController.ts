// getFlimsController.ts

import { Request, Response } from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";
import { connect } from "../../middlewares/redisClient";
import { getBirthYear } from "../../utils/index";
import dotenv from "dotenv";

dotenv.config();

const SWAPI_BASE_URL = process.env.SWAPI_BASE_URL;

interface Films {
  title: string;
  episode_id: string;
}

interface ApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Films[];
}

interface RequestQuery {
  page?: string;
  sortBy?: keyof Films;
  sortOrder?: "asc" | "desc";
}

const getFlims = asyncHandler(
  async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
    const { page, sortBy, sortOrder } = req.query;
    const key = req.originalUrl;

    const response = await axios.get<ApiResponse>(`${SWAPI_BASE_URL}/films`, {
      params: { page },
    });

    let data = response.data;

    if (sortBy && sortOrder) {
      const sorted = sortFlims(data.results, sortBy, sortOrder);
      if (sorted) {
        data.results = sorted;
      }
    }

    // Cache and respond
    const redisClient = await connect();

    redisClient.set(key, JSON.stringify(data));
    redisClient.expire(key, 30 * 60);
    console.log("Data retrieved from API");
    res.json(data);
  }
);

const sortFlims = (
  people: Films[],
  sortBy: keyof Films,
  sortOrder: "asc" | "desc"
) => {
  if (sortBy === "title") {
    return people.sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  } else if (sortBy === "episode_id") {
    return people.sort((a, b) => {
      const heightA = a.episode_id;
      const heightB = b.episode_id;

      if (heightA === "unknown") {
        return 1;
      }
      if (heightB === "unknown") {
        return -1;
      }

      const numHeightA = parseInt(heightA);
      const numHeightB = parseInt(heightB);

      return sortOrder === "asc"
        ? numHeightA - numHeightB
        : numHeightB - numHeightA;
    });
  }
};

export { getFlims };