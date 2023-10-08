import { Router } from "express";
import {
  createFlights,
  deleteFlight,
  findAllFlights,
  findOneFlight,
  updateFlight,
} from "./flights.controller.js";

export const router = Router();

router.route("/")
.get(findAllFlights)
.post(createFlights);

router
  .route("/:id")
  .get(findOneFlight)
  .patch(updateFlight)
  .delete(deleteFlight);
