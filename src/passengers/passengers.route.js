import { Router } from "express";
import {
  updatePassenger,
  findAllPassengers,
  createPassenger,
  findOnePassenger,
  deletePassenger,
} from "./passengers.controller.js";

export const router = Router();

router
.route('/')
.get(findAllPassengers)
.post(createPassenger)

router
.route('/:id')
.get(findOnePassenger)
.patch(updatePassenger)
.delete(deletePassenger)
