import { z } from "zod"

const max = 50

const model = {
  studies: z.string().min(1).max(max),
  location: z.string().min(1).max(max),
  completionYear: z
    .instanceof(Date)
    .or(z.string())
    .refine((date) => new Date(date) < new Date(Date.now()))
    .transform((date) => new Date(date)),
  institution: z.string().min(1).max(max),
}

export const CreateTechnicalEducation = z.object(model)

export const UpdateTechnicalEducation = z.object(model).extend({
  id: z.number(),
})

export const DeleteTechnicalEducation = z.object({
  id: z.number(),
})
