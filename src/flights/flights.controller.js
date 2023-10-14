import { FlightService } from "./flights.services.js";
import { AppError, catchAsync } from "../errors/index.js";
import { validateFlight, validatePartialFlight } from "./flights.schema.js";
import { CityService } from "../city/city.services.js";
import { httpClient } from "../config/plugins/http-client.plugin.js";
import { envs } from "../config/enviroments/enviroments.js";
import { TicketService } from "../tickets/tickets.services.js";

const flightService = new FlightService();
const cityService = new CityService();
const ticketService = new TicketService();

export const findAllFlights = catchAsync(async (req, res, next) => {
  const flight = await flightService.findAllFlights();
  return res.json(flight);
});

export const createFlights = catchAsync(async (req, res, next) => {
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
  const { status } = req.query;

  const flight = await flightService.findOneFlight(id, status);

  if (!flight) {
    return next(AppError(`Flight with id: ${id} not found`, 400));
  }
  return res.status(200).json(flight);
});

export const updateFlight = catchAsync(async (req, res, next) => {
  const { errorMessage, flightData, hasError } = validatePartialFlight(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const { id } = req.params;

  const flight = await flightService.findOneFlight(id);

  if (!flight) {
    return res.status(404).json({
      status: "error",
      message: `Flight with id: ${id} not found`,
    });
  }

  const updateFlight = await flightService.updateFlight(flight, flightData);

  return res.json(updateFlight);
});

export const deleteFlight = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const flight = await flightService.findOneFlight(id, "pending");

  if (!flight) {
    return res.status(404).json({
      status: "error",
      message: `Flight with id: ${id} not found`,
    });
  }

  const ticket = await ticketService.findOneTicketByFlightId(id);

  if (ticket) {
    return next(
      new AppError(
        `a flight cannot be deleted if tickets have been for it`,
        400
      )
    );
  }

  await flightService.deleteFlight(flight);
  res.status(204).json(null);
});

export const approveFlight = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const flight = await flightService.findOneFlight(id, "pending");

  if (!flight) {
    return next(new AppError(`Flight with id: ${id} not found`, 404));
  }

  const originCityPromise = cityService.findOneCity(flight.originId);

  const destinationCityPromise = cityService.findOneCity(flight.destinationId);

  const [originCity, destinationCity] = await Promise.all([
    originCityPromise,
    destinationCityPromise,
  ]);

  if (!originCity) {
    return next(new AppError("City of origin does not exist", 404));
  }

  if (!destinationCity) {
    return next(new AppError("City of destination does not exist", 404));
  }

  const weatherCondition = await httpClient.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${originCity.lat}&lon=${originCity.long}&appid=${envs.API_KEY_WEATHERMAP}`
  );

  if (weatherCondition.weather[0].main === "Rain") {
    return next(
      new AppError(
        "Weather conditions do not meet then requeriments for takeoff",
        400
      )
    );
  }

  const updateFlight = await flightService.updateFlight(flight, {
    status: "inProgress",
    checkIn: new Date(),
  });

  return res.status(200).json(updateFlight);
});
