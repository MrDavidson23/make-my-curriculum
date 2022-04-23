import { z } from "zod"

const model = {
  technicalEducationId: z.number(),
  curriculumId: z.number(),
}

export const CreateTechnicalEducation = z.object(model)

export const UpdateTechnicalEducation = z.object(model).extend({
  id: z.number(),
})

export const DeleteTechnicalEducation = z.object({
  id: z.number(),
})
