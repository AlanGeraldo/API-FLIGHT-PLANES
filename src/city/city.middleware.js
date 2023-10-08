import { AppError, catchAsync } from "../errors/index.js"
import { CityService } from "./city.services.js"

 

const cityService = new CityService()

export const validateExistCity = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const city = await cityService.findOneCity(id)

    if (!city) {
        return next(new AppError(`City with id: ${id} not found`, 404))
    }

    req.city = city

    next()
})