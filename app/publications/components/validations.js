import { z } from "zod"

const max = 50;

const model = {
  name: z.string().min(1).max(max),
  location: z.string().min(1).max(max),
  date: z.instanceof(Date).or(z.string())
    .refine(date=>new Date(date) < new Date(Date.now()))
    .transform(date => new Date(date)),
  tag: z.string().min(1).max(max),
  institution: z.string().min(1).max(max),
  curriculumId: z.number(),
}

export const CreatePublication = z.object(model)

export const UpdatePublication = z.object(model).extend({
  id: z.number(),
})

export const DeletePublication = z.object({
  id: z.number(),
})