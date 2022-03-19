import { z } from "zod"
export const name = z.string().nonempty().min(3).max(50)
export const lastName = z.string().nonempty().min(3).max(50)
export const phone = z.string().nonempty().min(3).max(50)
export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())
export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())
export const UpdateUser = z.object({
  email,
  name,
  lastName,
  phone,
})
