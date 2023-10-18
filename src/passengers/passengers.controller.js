import { UploadFileService } from '../common/services/upload-files-cloud.services.js';
import { generateUUID } from '../config/plugins/uuid.plugin.js';
import { AppError, catchAsync} from '../errors/index.js'
import {
  validatePartialPassenger,
  validatePassenger,
} from "./passengers.schema.js";
import { PassengerService } from "./passengers.services.js";

const passengerService = new PassengerService();

const findAllPassengers = catchAsync(async (req, res, next) => {
    const passengers = await passengerService.findAllPassengers();
    return res.json(passengers);
})

const createPassenger = catchAsync( async (req, res) => {
  const { passengerData, errorMessage, hasError } = validatePassenger(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const path = `passenger/${generateUUID()}-${req.file.originalname}`

  const photoURL = await UploadFileService.uploadToFirebase(
    path,
    req.file.buffer
  )

  passengerData.photo = photoURL
  passengerData.createBy = req.sessionUser.id

  const passenger = await passengerService.createPassenger(passengerData);
  return res.status(201).json(passenger);
})

const findOnePassenger = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const passenger = await passengerService.findOnePassenger(id);

  if (!passenger) {
    return next(new AppError(`Passenger with id: ${id} not found`, 404))
  }
  return res.json(passenger);
})

const updatePassenger = catchAsync(async (req, res) => {
  const { hasError, errorMessage, passengerData } = validatePartialPassenger(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const { id } = req.params;

  const passenger = await passengerService.findOnePassenger(id);

  if (!passenger) {
    return res.status(404).json({
      status: "error",
      message: `Passenger with id ${id} not found`,
    });
  }

  const updatedPassenger = await passengerService.updatePassenger(
    passenger,
    passengerData
  );

  return res.json(updatedPassenger);

})

const deletePassenger = catchAsync(async (req, res) => {
  const { id } = req.params;

  const passenger = await passengerService.findOnePassenger(id);

  if (!passenger) {
    return res.status(404).json({
      status: "error",
      message: `Passenger with id ${id} not found`,
    });
  }
  await passengerService.deletePassenger(passenger);
  return res.status(204).json(null);

})

export {
  findAllPassengers,
  findOnePassenger,
  deletePassenger,
  createPassenger,
  updatePassenger,
};
