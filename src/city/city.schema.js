import z from "zod";
import { extractValidationData } from "../common/utils/extracErrorData.js";

const citySchema = z.object({
  name: z.string().min(3).max(60),
  country: z.string().min(3).max(60),
  lat: z.number(),
  long: z.number(),
});

export const validateCity = (data) => {
  const result = citySchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: cityData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    cityData,
  };
};

export const validatePartialCity = (data) => {
  const result = citySchema.partial().safeParse(data);

  const { 
    hasError, 
    errorMessage, 
    data: dataCity 
  } = extractValidationData(result);

  return {
    hasError,
    dataCity,
    errorMessage,
  };
};
