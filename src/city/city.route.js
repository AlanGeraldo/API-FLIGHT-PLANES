import { Router } from "express";
import {
  createCity,
  findAllCities,
  findOneCity,
  updateCity,
  deleteCity,
} from "./city.controller.js";
import { validateExistCity } from "./city.middleware.js";

export const router = Router();

router.route("/")
.get(findAllCities)
.post(createCity);

router
.use('/:id', validateExistCity)
.route("/:id")
.get(findOneCity)
.patch(updateCity)
.delete(deleteCity);
