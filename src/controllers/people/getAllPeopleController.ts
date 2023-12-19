// getAllPeople.ts

import { Request, Response } from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";
import { connect } from "../../middlewares/redisClient";
import { getBirthYear } from "../../utils/index";
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

interface RequestQuery {
  page?: string;
  sortBy?: keyof People;
  sortOrder?: "asc" | "desc";
}

const getAllPeople = asyncHandler(
  async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
    const { page, sortBy, sortOrder } = req.query;

    const key = req.originalUrl;

    const response = await axios.get<ApiResponse>(`${SWAPI_BASE_URL}/people`, {
      params: { page },
    });

    let data = response.data;

    if (sortBy && sortOrder) {
      data.results = sortPeople(data.results, sortBy, sortOrder);
    }

    // Cache and respond
    const redisClient = await connect();

    redisClient.set(key, JSON.stringify(data));
    redisClient.expire(key, 30 * 60);
    console.log("Data retrieved from API");
    res.json(data);
  }
);

const sortPeople = (
  people: People[],
  sortBy: keyof People,
  sortOrder: "asc" | "desc"
) => {
  if (sortBy === "name") {
    return people.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  } else if (sortBy === "height") {
    return people.sort((a, b) => {
      const heightA = a.height;
      const heightB = b.height;

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
  } else if (sortBy === "birth_year") {
    return people.sort((a, b) => {
      const birthYearA = getBirthYear(a.birth_year);
      const birthYearB = getBirthYear(b.birth_year);

      if (birthYearA === "unknown") {
        return 1;
      }
      if (birthYearB === "unknown") {
        return -1;
      }

      return sortOrder === "asc"
        ? birthYearA - birthYearB
        : birthYearB - birthYearA;
    });
  } else {
    // mass sorting
    return people.sort((a, b) => {
      const massA = a.mass;
      const massB = b.mass;

      if (massA === "unknown") {
        return 1;
      }
      if (massB === "unknown") {
        return -1;
      }

      const numMassA = parseInt(massA);
      const numMassB = parseInt(massB);

      return sortOrder === "asc" ? numMassA - numMassB : numMassB - numMassA;
    });
  }
};

export { getAllPeople };
