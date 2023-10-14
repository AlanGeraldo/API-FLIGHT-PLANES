import { AppError, catchAsync } from "../errors/index.js";
import { TicketService } from "../tickets/tickets.services.js";
import { BookingService } from "./booking.services.js";
import {  validateBooking } from "./bookings.schema.js";
import { hasDuplicateSeatNumber, validateRepeatSeat } from "./utils/seat-availability.js";

const ticketService = new TicketService();
const bookingService = new BookingService()

export const createBooking = catchAsync( async (req, res, next) => {
    const { bookingData, errorMessage, hasError} = validateBooking(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessage
        })
    }

    const isRepeatSeat = validateRepeatSeat(bookingData.tickets)

    if (isRepeatSeat) {
        return next(new AppError('You connot sell two tickets with the same seat', 400))
    }

    const seatNumbersFlights = await ticketService.findAllTicketsByFlightId(bookingData.dataBooking.flightId)

    const hasAvailability = hasDuplicateSeatNumber(bookingData.tickets, seatNumbersFlights)

    if (hasAvailability) {
        return next(new AppError('One of the chosen seats already taken', 400))
    }

    bookingData.dataBooking.createdBy = req.sessionUser.id

    const booking = await bookingService.create(bookingData.dataBooking)

    bookingData.tickets.forEach((ticket) => {
        ticket.bookingId = booking.id
        ticket.createdBy = req.sessionUser.id
    })
    
    await ticketService.multipleCreation(bookingData.tickets)

    return res.status(201).json(booking)

})