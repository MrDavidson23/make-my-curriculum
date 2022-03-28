import { z } from "zod"

const max = 50;

const model = {
  name: z.string().min(1).max(max),
  languageId: z.number(),
  templateId: z.number(),
  profession: z.string().min(0).max(max).optional(),
  description: z.string().min(0).max(max).optional(),
}

export const CreateCurriculum = z.object(model)

export const UpdateCurriculum = z.object(model).extend({
  id: z.number(),
})

export const DeleteCurriculum = z.object({
    id: z.number(),
})