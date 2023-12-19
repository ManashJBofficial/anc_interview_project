import express from "express";
import { getStarShips } from "../../controllers/starships/getStarshipsController";
import { cacheMiddleware } from "../../middlewares/cacheMiddleware";
const router = express.Router();

// This route will handle retrieving all people from SWAPI
router.route("/").get(cacheMiddleware, getStarShips);
// router.route("/:id").get(cacheMiddleware, );

export default router;
