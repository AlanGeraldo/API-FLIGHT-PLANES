import { catchAsync } from "../errors/index.js";
import { validatePlane, validatePartialPlane } from "./planes.schema.js";
import { PlaneService } from "./planes.services.js";

const planeService = new PlaneService()

export const findAllPlanes = catchAsync( async (req, res) => {
    const planes = await planeService.findAllPlanes()
    return res.status(200).json(planes)
})

export const findOnePlane = catchAsync( async (req, res) => {
    const { plane } = req;

    return res.status(200).json(plane)
})

export const createPlane = catchAsync( async (req, res) => {
    const { errorMessage, hasError, planeData } = validatePlane(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessage,
        })
    }

    const plane = await planeService.createPlane(planeData)

    return res.status(201).json(plane)

})

export const updatePlane = catchAsync( async (req, res) => {
    const { plane } = req;

    const { 
        errorMessage, 
        hasError, 
        planeData 
    } = validatePartialPlane(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessage
        })
    }

    const updatePlane = await planeService.updatePlane(plane, planeData)

    return res.status(200).json(updatePlane)
})

export const deletePlane = catchAsync( async (req, res) => {
    const { plane } = req;

    await planeService.deletePlane(plane)

    return res.status(204).json(null)
})
