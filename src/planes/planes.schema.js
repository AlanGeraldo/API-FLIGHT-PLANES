import z from "zod";
import { extractValidationData } from "../common/utils/extracErrorData.js";

const planeSchema = z.object({
  planeNumber: z.number(),
  model: z.string().min(3).max(30),
  maxCapacity: z.number(),
  airline: z.enum([
    "AeroGlobe",
    "AeroTronix",
    "AirQuest",
    "VelocityAir",
    "StartLink",
  ]),
});

export const validatePlane = (data) => {
  const result = planeSchema.safeParse(data);

  const {
    data: planeData,
    errorMessage,
    hasError,
  } = extractValidationData(result);

  return {
    errorMessage,
    hasError,
    planeData,
  };
};

export const validatePartialPlane = (data) => {
  const result = planeSchema.partial().safeParse(data);

  const {
    data: planeData,
    errorMessage,
    hasError,
  } = extractValidationData(result);

  return {
    errorMessage,
    hasError,
    planeData
  }
};
