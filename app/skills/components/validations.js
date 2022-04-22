import { z } from "zod"

const max = 50

const model = {
  description: z.string().min(1).max(max),
}

export const CreateSkill = z.object(model)

export const UpdateSkill = z.object(model).extend({
  id: z.number(),
})

export const DeleteSkill = z.object({
  id: z.number(),
})
