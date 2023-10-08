import { AppError, catchAsync } from "../errors/index.js";
import { PlaneService } from "./planes.services.js";

const planeService = new PlaneService()

export const validateExistPlane = catchAsync( async (req, res, next) => {
    const { id } = req.params

    const plane = await planeService.findOnePlane(id)

    if (!plane) {
        return next(new AppError(`Plane with id: ${id} not found`, 404))
    }

    req.plane = plane

    next()
})
