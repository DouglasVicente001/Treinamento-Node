import { Router } from "express";
import { CreateMovieController } from "../modules/Movies/useCases/createMovie/CreateMovieController";
import { CreateMovieRentController } from "../modules/movies/useCases/createMovieRent/CreateMovieRentController";

const createMovieController = new CreateMovieController();
const createMovieRentController = new CreateMovieRentController();

const movieRoutes = Router();

movieRoutes.post("/", createMovieController.handle);
movieRoutes.post("/rent", createMovieRentController.handle);

export {movieRoutes};