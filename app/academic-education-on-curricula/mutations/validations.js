import { z } from "zod"

const model = {
  academicEducationId: z.number(),
  curriculumId: z.number(),
}

export const CreateAcademicEducation = z.object(model)

export const UpdateAcademicEducation = z.object(model).extend({
  id: z.number(),
})

export const DeleteAcademicEducation = z.object({
  id: z.number(),
})
