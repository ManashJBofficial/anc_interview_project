// getFlimsController.ts

import { Request, Response } from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";
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

interface RequestQuery {
  page?: string;
  sortBy?: keyof Starships;
  sortOrder?: "asc" | "desc";
  search?: string;
}

const getStarShips = asyncHandler(
  async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
    const { page, sortBy, sortOrder, search } = req.query;
    const key = req.originalUrl;

    const response = await axios.get<ApiResponse>(
      `${SWAPI_BASE_URL}/starships`,
      {
        params: { page },
      }
    );

    let data = response.data;

    if (sortBy && sortOrder) {
      const sorted = sortFlims(data.results, sortBy, sortOrder);
      if (sorted) {
        data.results = sorted;
      }
    }

    if (search) {
      data.results = data.results.filter((starship) => {
        return (
          starship.name.toLowerCase().includes(search.toLowerCase()) ||
          starship.model.toLowerCase().includes(search.toLowerCase())
        );
      });
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
  starships: Starships[],
  sortBy: keyof Starships,
  sortOrder: "asc" | "desc"
) => {
  if (sortBy === "name") {
    return starships.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  } else if (sortBy === "crew") {
    return starships.sort((a, b) => {
      const crewA = a.crew;
      const crewB = b.crew;

      if (crewA === "unknown") {
        return 1;
      }
      if (crewB === "unknown") {
        return -1;
      }

      const numEpisodeA = parseInt(crewA);
      const numEpisodeB = parseInt(crewB);

      return sortOrder === "asc"
        ? numEpisodeA - numEpisodeB
        : numEpisodeB - numEpisodeA;
    });
  } else if (sortBy === "model") {
    return starships.sort((a, b) => {
      const modelA =
        a.model
          .match(/[A-Za-z]+/g)
          ?.join("")
          .toLowerCase() || "";
      const modelB =
        b.model
          .match(/[A-Za-z]+/g)
          ?.join("")
          .toLowerCase() || "";

      return sortOrder === "asc"
        ? modelA.localeCompare(modelB)
        : modelB.localeCompare(modelA);
    });
  }
};

export { getStarShips };
