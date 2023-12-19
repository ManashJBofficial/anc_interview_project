// /src/routes/peopleRoutes.ts

import express from "express";
import { getAllPeople } from "../../controllers/people/getAllPeopleController";
import { getPeopleById } from "../../controllers/people/getPeopleById";
import { cacheMiddleware } from "../../middlewares/cacheMiddleware";
const router = express.Router();

// This route will handle retrieving all people from SWAPI
router.route("/").get(cacheMiddleware, getAllPeople);
router.route("/:id").get(cacheMiddleware, getPeopleById);

export default router;
