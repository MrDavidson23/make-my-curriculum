import { z } from "zod"

const max = 50

export const CreateReferenceValidation = z.object({
  name: z.string().min(1).max(max), //
  email: z.string().email(), //
  phone: z.string().min(1).max(max),
  institution: z.string().min(1).max(max),
})

export const UpdateReferenceValidation = CreateReferenceValidation.extend({
  id: z.number(),
})

export const DeleteReference = z.object({
  id: z.number(),
})
