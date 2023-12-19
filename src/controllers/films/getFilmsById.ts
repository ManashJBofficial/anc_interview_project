import asyncHandler from "express-async-handler";
import axios from "axios";
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

const getFilmsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const response = await axios.get<ApiResponse>(
    `${SWAPI_BASE_URL}/films/${id}/`
  );

  const films = response.data;

  res.json(films);
});

export { getFilmsById };
