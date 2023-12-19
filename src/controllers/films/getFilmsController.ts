// getFlimsController.ts

import { Request, Response } from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";
import { connect } from "../../middlewares/redisClient";
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
  search?: string;
}

const getFlims = asyncHandler(
  async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
    const { page, sortBy, sortOrder, search } = req.query;
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

    if (search) {
      data.results = data.results.filter((film) =>
        film.title.toLowerCase().includes(search.toLowerCase())
      );
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
  films: Films[],
  sortBy: keyof Films,
  sortOrder: "asc" | "desc"
) => {
  if (sortBy === "title") {
    return films.sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  } else if (sortBy === "episode_id") {
    return films.sort((a, b) => {
      const episodeA = a.episode_id;
      const episodeB = b.episode_id;

      if (episodeA === "unknown") {
        return 1;
      }
      if (episodeB === "unknown") {
        return -1;
      }

      const numEpisodeA = parseInt(episodeA);
      const numEpisodeB = parseInt(episodeB);

      return sortOrder === "asc"
        ? numEpisodeA - numEpisodeB
        : numEpisodeB - numEpisodeA;
    });
  }
};

export { getFlims };
