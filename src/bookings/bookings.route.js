import { Router } from "express";
import {
    createBooking,
} from './bookings.controller.js'
import { restricTo } from "../auth/auth.middleware.js";

export const router = Router();

router.route("/").post(restricTo('developer', 'receptionist'), createBooking);
