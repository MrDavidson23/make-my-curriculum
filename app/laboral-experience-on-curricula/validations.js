import { z } from "zod"

const model = {
  laboralExperienceId: z.number(),
  curriculumId: z.number(),
}

export const CreateLaboralExperience = z.object(model)

export const UpdateLaboralExperience = z.object(model).extend({
  id: z.number(),
})

export const DeleteLaboralExperience = z.object({
  id: z.number(),
})
