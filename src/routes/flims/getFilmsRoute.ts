import express from "express";
import { getFlims } from "../../controllers/films/getFilmsController";
import { cacheMiddleware } from "../../middlewares/cacheMiddleware";
const router = express.Router();

// This route will handle retrieving all people from SWAPI
router.route("/").get(cacheMiddleware, getFlims);

export default router;
