import z from "zod";
import { extractValidationData } from "../common/utils/extracErrorData.js";

export const bookingSchema = z.object({
  dataBooking: z.object({
    bookingDate: z.string().min(3).max(60),
    passengerId: z.number().int().positive(),
    flightId: z.number().int().positive(),
    nroTickets: z.number().int().positive(),
    totalPrice: z.number().positive(),
  }),

  tickets: z.array(
    z.object({
      passengerId: z.number().int().positive(),
      flightId: z.number().int().positive(),
      class: z.enum(["economic", "executive", "first"]),
      price: z.number().positive(),
      seatNumber: z.number().int().positive(),
    })
  ),
});

export const validateBooking = (data) => {
    const result = bookingSchema.safeParse(data)

    const {
        data: bookingData,
        errorMessage,
        hasError
    } = extractValidationData(result)

    return {
        bookingData,
        errorMessage,
        hasError
    }
}
