import { z } from "zod"

const model = {
  skillId: z.number(),
  curriculumId: z.number(),
}

export const CreateSkill = z.object(model)

export const UpdateSkill = z.object(model).extend({
  id: z.number(),
})

export const DeleteSkill = z.object({
  id: z.number(),
})
