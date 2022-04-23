import { z } from "zod"

const max = 50

const model = {
  description: z.string().min(1).max(max),
  rating: z
    .string()
    .min(1)
    .max(max)
    .or(z.number())
    .transform((rating) => parseInt(rating)),
}

export const CreateSkill = z.object(model)

export const UpdateSkill = z.object(model).extend({
  id: z.number(),
})

export const DeleteSkill = z.object({
  id: z.number(),
})
