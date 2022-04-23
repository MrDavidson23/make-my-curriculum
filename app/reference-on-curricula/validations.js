import { z } from "zod"

const model = {
  referenceId: z.number(),
  curriculumId: z.number(),
}

export const CreateReference = z.object(model)

export const UpdateReference = z.object(model).extend({
  id: z.number(),
})

export const DeleteReference = z.object({
  id: z.number(),
})
