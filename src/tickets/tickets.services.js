import Ticket from "./tickets.model.js";

export class TicketService {
  async findAll() {
    return await Ticket.findAll({
      status: true,
    });
  }

  async findOne(id) {
    return await Ticket.findOne({
      id,
      status: true,
    });
  }

  async create(data) {
    return await Ticket.create(data);
  }

  async update(ticket, data) {
    return await ticket.update(data);
  }

  async delete(ticket) {
    return await ticket.update({ status: false });
  }

  async findOneTicketByFlightId(flightId) {
    return await Ticket.findOne({
      where: {
        flightId,
        status: true,
      },
    });
  }

  async findAllTicketsByFlightId(flightId) {
    return await Ticket.findAll({
        attributes: ['seat_number'],
      where: {
        flightId,
        status: true,
      },
      raw: true
    });
  }

  async multipleCreation (tickets) {
    return await Ticket.bulkCreate(tickets)
  }
}
