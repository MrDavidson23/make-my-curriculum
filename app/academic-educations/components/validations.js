import { z } from "zod"

const max = 50;

const model = {
  studies: z.string().min(1).max(max),
  location: z.string().min(1).max(max),
  startYear: z.instanceof(Date).or(z.string())
    .refine(date => new Date(date) < new Date(Date.now()))
    .transform(date => new Date(date)),
  finishYear: z.instanceof(Date).or(z.string())
    .refine(date => new Date(date) < new Date(Date.now()))
    .transform(date => new Date(date)),
  institution: z.string().min(1).max(max),
}

const dateErrorMsg = "La fecha de inicio debe ser anterior a la de finalización."

export const CreateAcademicEducation = z.object(model).refine(data=> data.startYear < data.finishYear,{message:dateErrorMsg})

export const UpdateAcademicEducation = z.object(model).extend({
  id: z.number(),
}).refine(data=> data.startYear < data.finishYear,{message:dateErrorMsg})

export const DeleteAcademicEducation = z.object({
    id: z.number(),
})