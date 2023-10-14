import z from "zod";
import { extractValidationData } from "../common/utils/extracErrorData.js";

export const ticketSchema = z.object({
  passengerId: z.number().int().positive(),
  flightId: z.number().int().positive(),
  bookingId: z.number().int().positive(),
  class: z.enum(["economic", "executive", "first"]),
  price: z.number().positive(),
  seatNumber: z.number().int().positive(),
});

export const validateTicket = (data) => {
  const result = ticketSchema.safeParse(data);

  const {
    data: ticketData,
    errorMessage,
    hasError,
  } = extractValidationData(result);

  return {
    ticketData,
    errorMessage,
    hasError,
  };
};

export const validatePartialTicket = (data) => {
  const result = ticketSchema.partial().safeParse(data);

  const {
    data: ticketData,
    errorMessage,
    hasError,
  } = extractValidationData(result);

  return {
    ticketData,
    errorMessage,
    hasError,
  };
};
