import Flight from "./flights.model.js";

export class FlightService {

  async findAllFlights() {
    return await Flight.findAll({
      where: {
        status: "pending",
      },
    });
  }

  async createFlights(data) {
    return await Flight.create(data);
  }

  async findOneFlight(id) {
    return await Flight.findOne({
      where: {
        id,
        status: "pending",
      },
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
