import { Router } from "express";
import { router as passengerRouter } from "../passengers/passengers.route.js";
import { router as cityRouter } from "../city/city.route.js";
import { router as authRouter } from "../auth/auth.route.js";
import { router as flightRouter } from "../flights/flights.route.js";
import { router as planeRouter } from "../planes/planes.route.js";
import { protect } from "../auth/auth.middleware.js";

export const router = Router();

router.use('/users', authRouter)

router.use(protect)

router.use("/passengers", passengerRouter);
router.use("/city", cityRouter);
router.use('/flights', flightRouter)
router.use('/planes', planeRouter)
