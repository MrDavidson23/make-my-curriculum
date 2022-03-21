import { z } from "zod"

const max = 50;

const model = {
  id: z.number(),
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

const zvalidator = z.object(model).refine(data=>{
  return data.startYear < data.finishYear
})

export const CreateAcademicEducation = zvalidator

export const UpdateAcademicEducation = zvalidator

export const DeleteAcademicEducation = z.object({
    id: z.number(),
})