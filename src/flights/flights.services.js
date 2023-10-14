import Flight from "./flights.model.js";
import { Op } from "sequelize";

export class FlightService {
  async findAllFlights() {
    return await Flight.findAll({
      where: {
        status: {
          [Op.notIn]: ["done", "cancelled"],
        },
      },
    });
  }

  async createFlights(data) {
    return await Flight.create(data);
  }

  async findOneFlight(id, status) {
    let whereClause = {
      id: id,
      status: status,
    };

    if (!status) {
      whereClause.status = {
        [Op.in]: ["pending", "inProgress", "done"],
      };
    }

    return await Flight.findOne({
      where: whereClause,
    });
  }

  async updateFlight(flight, data) {
    return await flight.update(data);
  }

  async deleteFlight(flight) {
    return await flight.update({
      status: "cancelled",
    });
  }
}
