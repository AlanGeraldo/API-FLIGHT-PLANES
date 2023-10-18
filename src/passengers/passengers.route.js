import { Router } from "express";
import {
  updatePassenger,
  findAllPassengers,
  createPassenger,
  findOnePassenger,
  deletePassenger,
} from "./passengers.controller.js";
import { restricTo } from "../auth/auth.middleware.js";
import { uploadSingle } from "../config/plugins/upload-files.plugin.js";

export const router = Router();

router
  .route("/")
  .get(restricTo("receptionist", "admin", "developer"), findAllPassengers)
  .post(uploadSingle('photo') ,restricTo("receptionist", "developer"), createPassenger);

router
  .route("/:id")
  .get(restricTo("receptionist", "admin", "developer"), findOnePassenger)
  .patch(restricTo("receptionist", "developer"), updatePassenger)
  .delete(restricTo("receptionist", "developer"), deletePassenger);
