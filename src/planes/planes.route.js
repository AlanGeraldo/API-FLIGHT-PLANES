import { Router } from "express";
import {
  createPlane,
  deletePlane,
  findAllPlanes,
  findOnePlane,
  updatePlane,
} from "./planes.controller.js";
import { validateExistPlane } from "./planes.middleware.js";
import { restricTo } from "../auth/auth.middleware.js";

export const router = Router();

router
  .route("/")
  .get(restricTo("receptionist", "admin", "developer"), findAllPlanes)
  .post(restricTo("admin", "developer"), createPlane);

router
  .use("/:id", validateExistPlane)
  .route("/:id")
  .get(restricTo("receptionist", "admin", "developer") ,findOnePlane)
  .patch(restricTo("admin", "developer") ,updatePlane)
  .delete(restricTo("admin", "developer") ,deletePlane);
