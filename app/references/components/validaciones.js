//crear archivo de validaciones, y en los otros lugares donde esta createreferece, eliminamos el import, y apretamos control + espacio para importalro de nuevo

import { z } from "zod"
export const CreateReference = z.object({
  name: z.string(), //
  email: z.string().email(), //
  phone: z.string(),
  name: z.string(),
  institution: z.string(),
  curriculumId: z.number(),
})

export const UpdateReference = CreateReference.extend({
  id: z.number(),
})

export const DeleteReference = z.object({
  id: z.number(),
})
