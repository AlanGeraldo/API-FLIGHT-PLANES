import Booking from "./bookings.model.js";

export class BookingService {
    async create (data) {
        return await Booking.create(data)
    }
}