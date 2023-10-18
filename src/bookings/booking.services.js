import User from "../auth/user.model.js";
import Flight from "../flights/flights.model.js";
import Passenger from "../passengers/passengers.model.js";
import Plane from "../planes/planes.model.js";
import Booking from "./bookings.model.js";

export class BookingService {
  async create(data) {
    return await Booking.create(data);
  }

  async findAll(status) {
    return await Booking.findAll({
        attributes: {
            exclude: ['flightId', 'passengerId']
        },
      where: {
        status: status,
      },
      include: [
        {
          model: Flight,
          include: [
            {
              model: Plane,
            },
          ],
        },
        {
          model: Passenger,
          include: [
            {
              model: User,
              attributes: ['fullname', 'email']
            },
          ],
        },
      ],
    });
  }
}
