import { z } from "zod"

const model = {
  publicationId: z.number(),
  curriculumId: z.number(),
}

export const CreatePublication = z.object(model)

export const UpdatePublication = z.object(model).extend({
  id: z.number(),
})

export const DeletePublication = z.object({
  id: z.number(),
})
