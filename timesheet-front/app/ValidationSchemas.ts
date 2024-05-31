import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  type: z.string().min(1, "Type is required").max(255),
});

export const weekSchema = z.object({
  hours: z.number().min(1, "Hours are required.").max(255),
  week: z.string().min(1, "Week Number is required").max(255),
});
