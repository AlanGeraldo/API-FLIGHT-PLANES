import { Router } from "express";
import {
  findAllTickets,
  createTicket,
  findOneTicket,
  updateTicket,
  deleteTicket,
} from "./tickets.controller.js";
import { restricTo } from "../auth/auth.middleware.js";

export const router = Router();

router
  .route("/")
  .get(restricTo("receptionist", "developer", "admin"), findAllTickets)
  .post(restricTo("receptionist", "developer"), createTicket);

router
  .route("/:id")
  .get(restricTo("receptionist", "developer", "admin"), findOneTicket)
  .patch(restricTo("receptionist", "developer"), updateTicket)
  .delete(restricTo("receptionist", "developer"), deleteTicket);
