// /src/routes/peopleRoutes.ts

import express from "express";
import { getAllPeople } from "../../controllers/people/getAllPeopleController";

const router = express.Router();

// This route will handle retrieving all people from SWAPI
router.route("/").get(getAllPeople);

export default router;
