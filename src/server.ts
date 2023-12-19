import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import getAllPeopleRoute from "./routes/people/getAllPeopleRoute";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.get("/api", (_req: express.Request, res: express.Response) => {
  res.status(200).json({
    films: "https://swapi.dev/api/films/",
    people: "https://swapi.dev/api/people/",
    planets: "https://swapi.dev/api/planets/",
    species: "https://swapi.dev/api/species/",
    starships: "https://swapi.dev/api/starships/",
    vehicles: "https://swapi.dev/api/vehicles/",
  });
});

app.use("/api/people", getAllPeopleRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
