import { Request, Response } from "express";
import axios from "axios";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

const SWAPI_BASE_URL = process.env.SWAPI_BASE_URL;

const getAllPeople = asyncHandler(async (req: Request, res: Response) => {
  const { page } = req.query;
  const response = await axios.get(`${SWAPI_BASE_URL}/people`, {
    params: { page },
  });
  res.json(response.data);
});

export { getAllPeople };
