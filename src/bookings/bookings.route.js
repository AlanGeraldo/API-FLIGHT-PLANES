import { Router } from "express";
import {
    createBooking, findAllBooking,
} from './bookings.controller.js'
import { restricTo } from "../auth/auth.middleware.js";

export const router = Router();

router.route("/")
.get(findAllBooking)
.post(restricTo('developer', 'receptionist'), createBooking);
