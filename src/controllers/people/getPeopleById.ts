import asyncHandler from "express-async-handler";
import axios from "axios";
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

  const response = await axios.get<ApiResponse>(
    `${SWAPI_BASE_URL}/people/${id}/`
  );

  const person = response.data;

  res.json(person);
});

export { getPeopleById };
