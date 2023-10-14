import { Router } from "express";
import {
  createFlights,
  deleteFlight,
  findAllFlights,
  findOneFlight,
  updateFlight,
  approveFlight,
} from "./flights.controller.js";
import { restricTo } from "../auth/auth.middleware.js";

export const router = Router();

router
  .route("/")
  .get(findAllFlights)
  .post(restricTo("admin", "developer"), createFlights);

router.patch(
  "/approve-takeoff/:id",
  restricTo("admin", "developer"),
  approveFlight
);

router
  .route("/:id")
  .get(findOneFlight)
  .patch(restricTo("admin", "developer"), updateFlight)
  .delete(restricTo("admin", "developer"), deleteFlight);
