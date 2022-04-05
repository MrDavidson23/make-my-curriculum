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
  .min(5) //to much beign 10, reduced to 5
  .max(100)
  .transform((str) => str.trim())
export const Signup = z.object({
  name,
  lastName,
  phone,
  email,
  password,
})
export const Login = z.object({
  email,
  password: z.string(),
})
export const ForgotPassword = z.object({
  email,
})
export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })
export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
