// /src/routes/peopleRoutes.ts

import express from "express";
import { getAllPeople } from "../../controllers/people/getAllPeopleController";
import { cacheMiddleware } from "../../middlewares/cacheMiddleware";
const router = express.Router();

// This route will handle retrieving all people from SWAPI
router.route("/").get(cacheMiddleware, getAllPeople);

export default router;
