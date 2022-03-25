import { z } from "zod"

const max = 50

const model = {
  position: z.string().min(1).max(max),
  location: z.string().min(1).max(max),
  startYear: z
    .instanceof(Date)
    .or(z.string())
    .refine((date) => new Date(date) < new Date(Date.now()))
    .transform((date) => new Date(date)),
  finishYear: z
    .instanceof(Date)
    .or(z.string())
    .refine((date) => new Date(date) < new Date(Date.now()))
    .transform((date) => new Date(date)),
  institution: z.string().min(1).max(max),
  startMonth: z.string().min(1).max(max),
  finishMonth: z.string().min(1).max(max),
}

const dateErrorMsg = "La fecha de inicio debe ser anterior a la de finalización."

export const CreateLaboralExperience = z
  .object(model)
  .refine((data) => data.startYear < data.finishYear, { message: dateErrorMsg })

export const UpdateLaboralExperience = z
  .object(model)
  .extend({
    id: z.number(),
  })
  .refine((data) => data.startYear < data.finishYear, { message: dateErrorMsg })

export const DeleteLaboralExperience = z.object({
  id: z.number(),
})
