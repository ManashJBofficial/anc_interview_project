import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import peopleRoute from "./routes/people/peopleRoute";
import flimsRoute from "./routes/flims/filmsRoute";
import starshipsRoute from "./routes/starships/starShipsRoute";
import cors from "cors";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cors());
app.get("/api", (_req: express.Request, res: express.Response) => {
  res.status(200).json({
    films: "https://swapi.manash.dev/api/films",
    people: "https://swapi.manash.dev/api/people",
    starships: "https://swapi.manash.dev/api/starships",
  });
});

app.use("/api/people", peopleRoute);
app.use("/api/films", flimsRoute);
app.use("/api/starships", starshipsRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
