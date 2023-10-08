import { FlightService } from "./flights.services.js";
import { AppError, catchAsync } from "../errors/index.js";
import { validateFlight, validatePartialFlight } from "./flights.schema.js";

const flightService = new FlightService();

export const findAllFlights = catchAsync(async (req, res, next) => {
  const flight = await flightService.findAllFlights();
  return res.json(flight);
});

export const createFlights = catchAsync(async (req, res) => {
  const { errorMessage, flightData, hasError } = validateFlight(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const flight = await flightService.createFlights(flightData);
  return res.status(201).json(flight);
});

export const findOneFlight = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const flight = await flightService.findOneFlight(id);

  if (!flight) {
    return next(AppError(`Flight with id: ${id} not found`, 404));
  }
  return res.json(flight);
});

export const updateFlight = catchAsync(async (req, res) => {
  const { errorMessage, flightData, hasError } = validatePartialFlight(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const { id } = req.params

  const flight = await flightService.findOneFlight(id)

  if (!flight) {
    return res.status(404).json({
        status: 'error',
        message: `Flight with id: ${id} not found`
    })
  }

  const updateFlight = await flightService.updateFlight(flight, flightData)

  return res.json(updateFlight)

});

export const deleteFlight = catchAsync(async (req, res) => {
    const { id } = req.params

    const flight = await flightService.findOneFlight(id)

    if (!flight) {
        return res.status(404).json({
            status: 'error',
            message: `Flight with id: ${id} not found`,
        })
    }

    await flightService.deleteFlight(flight)
    res.status(204).json(null)
});
