//crear archivo de validaciones, y en los otros lugares donde esta createreferece, eliminamos el import, y apretamos control + espacio para importalro de nuevo

import { z } from "zod"
export const CreateReference = z.object({
  name: z.string(), //
  email: z.string().email(), //
  phone: z.string(),
  name: z.string(),
  institution: z.string(),
  institution_type: z.string(),
  institution_date: z.date(),
})

export const UpdateReference = CreateReference.extend({
  id: z.number(),
})
