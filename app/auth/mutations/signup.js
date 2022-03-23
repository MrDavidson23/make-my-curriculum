import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
export default resolver.pipe(
  resolver.zod(Signup),
  async ({ name, lastName, email, password, phone }, ctx) => {
    console.log("signup", name, lastName, email, password, phone)
    const hashedPassword = await SecurePassword.hash(password.trim())
    console.log("hashedPassword", hashedPassword)
    const user = await db.user.create({
      data: {
        name,
        lastName,
        email: email.toLowerCase().trim(),
        hashedPassword,
        phone,
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    await ctx.session.$create({
      userId: user.id,
      role: user.role,
    })
    return user
  }
)
