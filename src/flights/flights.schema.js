import z from "zod";
import { extractValidationData } from "../common/utils/extracErrorData.js";

export const flightSchema = z.object({
  originId: z.number(),

  destinationId: z.number(),

  planeId: z.number(),

  departureTime: z.string(),

  checkIn: z.date().optional(),
});

export function validateFlight (data) {
    const result = flightSchema.safeParse(data)

    const { 
        data: flightData, 
        errorMessage, 
        hasError 
    } = extractValidationData(result)

    return {
        hasError,
        errorMessage,
        flightData
    }
}

export function validatePartialFlight (data) {
    const result = flightSchema.partial().safeParse(data)

    const { 
        data: flightData, 
        errorMessage, 
        hasError 
    } = extractValidationData(result)

    return {
        errorMessage,
        flightData,
        hasError
    }
}
