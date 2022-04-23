import { z } from "zod"

const max = 50

const model = {
  language: z.string().min(1).max(max),
  code: z.string().min(1).max(max),
}

export const CreateLanguage = z.object(model)

export const UpdateLanguage = z.object(model).extend({
  id: z.number(),
})

export const DeleteLanguage = z.object({
  id: z.number(),
})
